import { NextRequest, NextResponse } from 'next/server';
import { recordRequestMetric } from '../../../lib/monitoring'
import { safelyAppendUsageLog } from '../../../lib/usage-logs'
import { supabase } from '../../../lib/supabase'
import { getGeminiEmbedding } from '../../../lib/embeddings'

const BASE_INSTRUCTIONS = [
  'You are Vayka, a concise travel assistant.',
  'Keep answers short, practical, and easy to scan.',
  'Default to 2 to 4 sentences unless the user asks for more detail.',
  'Do not add filler, long introductions, or unnecessary disclaimers.',
  'Use bullets only when they make the answer clearer.',
  'If you are unsure, say so briefly.',
].join(' ')

export async function POST(req: NextRequest) {
  const startedAt = Date.now()

  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const chatModel = process.env.GEMINI_CHAT_MODEL || 'gemini-2.5-flash';

    if (!apiKey || !supabase) {
      const err = !apiKey ? 'Missing Gemini API key' : 'Missing Supabase Config'
      recordRequestMetric({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: false, statusCode: 500, errorMessage: err })
      await safelyAppendUsageLog({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: false, statusCode: 500, errorMessage: err })
      return NextResponse.json({ error: err }, { status: 500 });
    }

    // 1. Semantic Search
    let contextDocuments: { content: string, source: string, similarity: number }[] = [];
    try {
      const queryEmbedding = await getGeminiEmbedding(message);
      const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.4,
        match_count: 5
      });
      if (!error && data) {
         contextDocuments = data;
      }
    } catch (e) {
      console.warn("Vector search failed, proceeding without context. Ensure match_documents RPC is installed.", e);
    }

    // 2. Dynamic Prompt Construction
    // Classify intent programmatically (a simple heuristic for Sprint 1)
    let dynamicPrompt = "You are Vayka, an intelligent, conversational travel assistant. You will be provided with some context from a database. If the context answers the user's question, use it! If the context is empty or doesn't have the exact answer, just provide a friendly, helpful answer using your general knowledge. Never apologize for missing data, just do your best to help the user plan their travels.";

    let promptContext = '';
    const uniqueSources = new Set<string>();
    
    if (contextDocuments.length > 0) {
      promptContext = '\n\nRelevant Information:\n';
      contextDocuments.forEach((doc, idx) => {
         promptContext += `[Source ${idx + 1}]: ${doc.content}\n`;
         if (doc.source) uniqueSources.add(doc.source);
      });
      dynamicPrompt += '\n\nYou must base your answer ONLY on the Relevant Information provided below. If the information does not answer the question, state that you do not know based on your current knowledge base.';
    }

    const finalPromptText = `${dynamicPrompt}${promptContext}\n\nUser question: ${message}`;

    // 3. Query Gemini
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${chatModel}:generateContent`;

    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 250,
        },
        contents: [
          {
            parts: [
              {
                text: finalPromptText,
              },
            ],
          },
        ],
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      recordRequestMetric({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: false, statusCode: 500, errorMessage: err })
      await safelyAppendUsageLog({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: false, statusCode: 500, errorMessage: err })
      return NextResponse.json({ error: err }, { status: 500 });
    }
    const data = await res.json();
    let response = 'No response.';
    if (data && Array.isArray(data.candidates) && data.candidates[0]?.content?.parts?.[0]?.text) {
      response = data.candidates[0].content.parts[0].text;
    }

    recordRequestMetric({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: true, statusCode: 200 })
    await safelyAppendUsageLog({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: true, statusCode: 200 })

    return NextResponse.json({ 
      response,
      sources: Array.from(uniqueSources)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown chat error'
    recordRequestMetric({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: false, statusCode: 500, errorMessage: message })
    await safelyAppendUsageLog({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: false, statusCode: 500, errorMessage: message })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

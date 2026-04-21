import { NextRequest, NextResponse } from 'next/server';
import { recordRequestMetric } from '../../../lib/monitoring'
import { safelyAppendUsageLog } from '../../../lib/usage-logs'
import { supabase } from '../../../lib/supabase'
import { getGeminiEmbedding } from '../../../lib/embeddings'

const BASE_INSTRUCTIONS = [
  'You are Vayka, a travel assistant.',
  'Give complete answers that fully address the user request.',
  'Keep answers practical and easy to scan.',
  'Use as much detail as needed to finish the answer clearly.',
  'Do not add filler, long introductions, or unnecessary disclaimers.',
  'Use bullets only when they make the answer clearer.',
  'Do not use Markdown formatting.',
  'Do not wrap words or phrases in asterisks.',
  'If you are unsure, say so briefly.',
].join(' ')

type ChatIntent = 'factual' | 'recommendation' | 'itinerary' | 'comparison'

// story 8
function detectIntent(message: string): ChatIntent {
  const normalized = message.toLowerCase()

  if (
    normalized.includes('itinerary') ||
    normalized.includes('plan me') ||
    normalized.includes('plan a trip') ||
    normalized.includes('weekend in') ||
    normalized.includes('day trip') ||
    normalized.includes('3-day') ||
    normalized.includes('7-day')
  ) {
    return 'itinerary'
  }

  if (
    normalized.includes('compare') ||
    normalized.includes('versus') ||
    normalized.includes('vs') ||
    normalized.includes('better than') ||
    normalized.includes('difference between')
  ) {
    return 'comparison'
  }

  if (
    normalized.includes('recommend') ||
    normalized.includes('suggest') ||
    normalized.includes('where should i go') ||
    normalized.includes('best place') ||
    normalized.includes('affordable') ||
    normalized.includes('budget')
  ) {
    return 'recommendation'
  }

  return 'factual'
}

function buildIntentInstructions(intent: ChatIntent) {
  switch (intent) {
    case 'itinerary':
      return 'The user wants an itinerary or plan. Structure the answer as a practical sequence of steps, days, or time blocks.'
    case 'comparison':
      return 'The user wants a comparison. Compare the options directly across the most relevant criteria and end with a concise takeaway.'
    case 'recommendation':
      return 'The user wants recommendations. Suggest the strongest options first and explain why they fit the request.'
    case 'factual':
    default:
      return 'The user wants factual information. Answer directly and lead with the most relevant facts.'
  }
}

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
    const intent = detectIntent(message)
    const intentInstructions = buildIntentInstructions(intent)
    let dynamicPrompt = `${BASE_INSTRUCTIONS} ${intentInstructions} You will be provided with some context from a database. If the context answers the user's question, use it. If the context is empty or doesn't have the exact answer, provide a helpful answer using your general knowledge. Do not stop early or leave the answer incomplete.`;

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
          maxOutputTokens: 512,
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
      intent,
      sources: Array.from(uniqueSources)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown chat error'
    recordRequestMetric({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: false, statusCode: 500, errorMessage: message })
    await safelyAppendUsageLog({ endpoint: '/api/chat', method: 'POST', durationMs: Date.now() - startedAt, ok: false, statusCode: 500, errorMessage: message })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

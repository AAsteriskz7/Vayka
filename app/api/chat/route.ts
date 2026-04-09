import { NextRequest, NextResponse } from 'next/server';
import { recordRequestMetric } from '../../../lib/monitoring'
import { safelyAppendUsageLog } from '../../../lib/usage-logs'

const CHAT_STYLE_INSTRUCTIONS = [
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

    if (!apiKey) {
      recordRequestMetric({
        endpoint: '/api/chat',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 500,
        errorMessage: 'Missing Gemini API key',
      })
      await safelyAppendUsageLog({
        endpoint: '/api/chat',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 500,
        errorMessage: 'Missing Gemini API key',
      })
      return NextResponse.json({ error: 'Missing Gemini API key' }, { status: 500 });
    }

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${chatModel}:generateContent`;

    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 180,
        },
        contents: [
          {
            parts: [
              {
                text: `${CHAT_STYLE_INSTRUCTIONS}\n\nUser question: ${message}`,
              },
            ],
          },
        ],
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      recordRequestMetric({
        endpoint: '/api/chat',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 500,
        errorMessage: err,
      })
      await safelyAppendUsageLog({
        endpoint: '/api/chat',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 500,
        errorMessage: err,
      })
      return NextResponse.json({ error: err }, { status: 500 });
    }
    const data = await res.json();
    // Gemini returns { candidates: [{ content: { parts: [{ text: ... }] } }] }
    let response = 'No response.';
    if (data && Array.isArray(data.candidates) && data.candidates[0]?.content?.parts?.[0]?.text) {
      response = data.candidates[0].content.parts[0].text;
    }

    recordRequestMetric({
      endpoint: '/api/chat',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/chat',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })

    return NextResponse.json({ response });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown chat error'
    recordRequestMetric({
      endpoint: '/api/chat',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/chat',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

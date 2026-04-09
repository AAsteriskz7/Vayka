
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  const chatModel = process.env.GEMINI_CHAT_MODEL || 'gemini-2.5-flash';

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing Gemini API key' }, { status: 500 });
  }

  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${chatModel}:generateContent`;

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }
  const data = await res.json();
  // Gemini returns { candidates: [{ content: { parts: [{ text: ... }] } }] }
  let response = 'No response.';
  if (data && Array.isArray(data.candidates) && data.candidates[0]?.content?.parts?.[0]?.text) {
    response = data.candidates[0].content.parts[0].text;
  }
  return NextResponse.json({ response });
}

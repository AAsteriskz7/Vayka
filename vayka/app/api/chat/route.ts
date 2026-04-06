
import { NextRequest, NextResponse } from 'next/server';
const HF_API_URL = 'https://router.huggingface.co/v1/inference/google/gemma-2b-it';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing Hugging Face API key' }, { status: 500 });
  }
  const res = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      inputs: message,
      parameters: { max_new_tokens: 256, return_full_text: false },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }
  const data = await res.json();
  // Hugging Face router returns { results: [{ generated_text: ... }] }
  let response = 'No response.';
  if (data && Array.isArray(data.results) && data.results[0]?.generated_text) {
    response = data.results[0].generated_text;
  }
  return NextResponse.json({ response });
}

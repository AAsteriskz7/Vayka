import { NextRequest } from 'next/server';

// Example: Simple intent detection based on keywords
function detectIntent(question: string): 'factual' | 'explanation' | 'creative' | 'default' {
  const q = question.toLowerCase();
  if (q.includes('who') || q.includes('what') || q.includes('when') || q.includes('where')) {
    return 'factual';
  }
  if (q.includes('explain') || q.includes('why') || q.includes('how')) {
    return 'explanation';
  }
  if (q.includes('write') || q.includes('story') || q.includes('imagine') || q.includes('creative')) {
    return 'creative';
  }
  return 'default';
}

// Example prompt templates
const PROMPT_TEMPLATES = {
  factual: (q: string) => `Answer factually: ${q}`,
  explanation: (q: string) => `Explain in detail: ${q}`,
  creative: (q: string) => `Respond creatively: ${q}`,
  default: (q: string) => `Answer: ${q}`,
};

export async function POST(req: NextRequest) {
  const { question } = await req.json();
  if (!question) {
    return new Response(JSON.stringify({ error: 'Missing question' }), { status: 400 });
  }

  // Detect intent
  const intent = detectIntent(question);
  // Construct prompt
  const prompt = PROMPT_TEMPLATES[intent](question);

  // TODO: Call your LLM/chatbot backend here with the constructed prompt
  // For now, just echo the prompt and intent
  return new Response(
    JSON.stringify({
      intent,
      prompt,
      message: `This is where you would call your LLM backend with the constructed prompt.`
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

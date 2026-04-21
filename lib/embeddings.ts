const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2-preview:embedContent'

export function chunkText(text: string, chunkSize = 800, chunkOverlap = 100) {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (!cleaned) return []

  const chunks: string[] = []
  let start = 0

  while (start < cleaned.length) {
    let end = Math.min(start + chunkSize, cleaned.length)

    if (end < cleaned.length) {
      const lastSpace = cleaned.lastIndexOf(' ', end)
      if (lastSpace > start) {
        end = lastSpace
      }
    }

    const chunk = cleaned.slice(start, end).trim()
    if (chunk) {
      chunks.push(chunk)
    }

    if (end >= cleaned.length) break
    start = Math.max(0, end - chunkOverlap)
  }

  return chunks
}

export async function getGeminiEmbedding(text: string) {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY environment variable')
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'models/gemini-embedding-2-preview',
        content: {
          parts: [{ text }],
        },
        outputDimensionality: 768
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`Gemini embedding request failed: ${response.status} ${body}`)
    }

    const data = await response.json()
    const embedding = data.embedding?.values

    if (!Array.isArray(embedding) || embedding.length !== 768) {
      throw new Error(`Unexpected embedding response structure or dimensions from Gemini API. Expected 768, got ${embedding?.length}`)
    }

    return embedding
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Gemini embedding failed: ${message}`)
  }
}

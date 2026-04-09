const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN
const HUGGINGFACE_MODEL =
  process.env.HUGGINGFACE_MODEL || 'thenlper/gte-base'
const HUGGINGFACE_API_URL =
  `https://router.huggingface.co/hf-inference/models/${HUGGINGFACE_MODEL}/pipeline/feature-extraction`

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

async function fetchEmbedding(text: string) {
  if (!HUGGINGFACE_API_TOKEN) {
    throw new Error('Missing HUGGINGFACE_API_TOKEN environment variable')
  }

  const response = await fetch(HUGGINGFACE_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: text,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`HuggingFace embedding request failed: ${response.status} ${body}`)
  }

  return response.json()
}

function extractEmbedding(data: unknown) {
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return data[0]
  }

  if (Array.isArray(data) && typeof data[0] === 'number') {
    return data
  }

  if (
    data &&
    typeof data === 'object' &&
    'embeddings' in data &&
    Array.isArray(data.embeddings)
  ) {
    const embeddings = data.embeddings
    if (Array.isArray(embeddings[0])) {
      return embeddings[0]
    }
    if (typeof embeddings[0] === 'number') {
      return embeddings
    }
  }

  return null
}

export async function getHuggingFaceEmbedding(text: string) {
  try {
    const data = await fetchEmbedding(text)
    const embedding = extractEmbedding(data)

    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error('Unexpected embedding response structure from HuggingFace')
    }

    return embedding
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`HuggingFace embedding failed: ${message}`)
  }
}

export const getGeminiEmbedding = getHuggingFaceEmbedding

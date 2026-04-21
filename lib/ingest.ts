import { supabase } from './supabase'
import { chunkText, getGeminiEmbedding } from './embeddings'
import { cleanTextForIngestion } from './preprocess'

export interface IngestDocumentPayload {
  source: string
  content: string
  metadata?: Record<string, unknown>
}

export async function ingestDocument(payload: IngestDocumentPayload) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your environment variables.')
  }

  const source = payload.source?.trim()
  const content = cleanTextForIngestion(payload.content ?? '')

  if (!source) {
    throw new Error('Source name is required.')
  }
  if (!content) {
    throw new Error('Content is required.')
  }

  const chunks = chunkText(content)
  if (chunks.length === 0) {
    throw new Error('No valid text chunks were generated from the provided content.')
  }

  const createdChunks = []

  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index]
    const embedding = await getGeminiEmbedding(chunk)

    const { data: documentData, error: documentError } = await supabase
      .from('documents')
      .insert([
        {
          content: chunk,
          metadata: {
            ...payload.metadata,
            originalContentLength: content.length,
            chunkIndex: index,
          },
          source,
        },
      ])
      .select('id')
      .single()

    if (documentError || !documentData?.id) {
      throw new Error(documentError?.message || 'Failed to insert document chunk.')
    }

    const { error: embeddingError } = await supabase.from('embeddings').insert([
      {
        document_id: documentData.id,
        embedding,
      },
    ])

    if (embeddingError) {
      throw new Error(embeddingError.message)
    }

    createdChunks.push({ chunkIndex: index, chunkLength: chunk.length })
  }

  return {
    success: true,
    source,
    chunkCount: createdChunks.length,
    chunks: createdChunks,
  }
}

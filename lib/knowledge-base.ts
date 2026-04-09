import { getHuggingFaceEmbedding } from './embeddings'
import { supabase } from './supabase'

interface DocumentRow {
  id: string
  content: string
  source: string
}

export interface KnowledgeBaseSummary {
  documentCount: number
  embeddingCount: number
  sourceCount: number
}

export async function getKnowledgeBaseSummary(): Promise<KnowledgeBaseSummary> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your environment variables.')
  }

  const [{ count: documentCount, error: documentError }, { count: embeddingCount, error: embeddingError }, { data: sources, error: sourceError }] =
    await Promise.all([
      supabase.from('documents').select('*', { count: 'exact', head: true }),
      supabase.from('embeddings').select('*', { count: 'exact', head: true }),
      supabase.from('documents').select('source'),
    ])

  if (documentError) {
    throw new Error(documentError.message)
  }
  if (embeddingError) {
    throw new Error(embeddingError.message)
  }
  if (sourceError) {
    throw new Error(sourceError.message)
  }

  const sourceCount = new Set((sources || []).map((row) => row.source)).size

  return {
    documentCount: documentCount ?? 0,
    embeddingCount: embeddingCount ?? 0,
    sourceCount,
  }
}

export async function clearKnowledgeBase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your environment variables.')
  }

  const summary = await getKnowledgeBaseSummary()

  const { error: embeddingError } = await supabase
    .from('embeddings')
    .delete()
    .not('document_id', 'is', null)

  if (embeddingError) {
    throw new Error(embeddingError.message)
  }

  const { error: documentError } = await supabase
    .from('documents')
    .delete()
    .not('id', 'is', null)

  if (documentError) {
    throw new Error(documentError.message)
  }

  return {
    success: true,
    clearedDocuments: summary.documentCount,
    clearedEmbeddings: summary.embeddingCount,
  }
}

export async function reloadKnowledgeBase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your environment variables.')
  }

  const { data: documents, error: documentsError } = await supabase
    .from('documents')
    .select('id, content, source')
    .order('id', { ascending: true })

  if (documentsError) {
    throw new Error(documentsError.message)
  }

  const typedDocuments = (documents || []) as DocumentRow[]

  const { error: deleteEmbeddingsError } = await supabase
    .from('embeddings')
    .delete()
    .not('document_id', 'is', null)

  if (deleteEmbeddingsError) {
    throw new Error(deleteEmbeddingsError.message)
  }

  for (const document of typedDocuments) {
    const embedding = await getHuggingFaceEmbedding(document.content)

    const { error: insertEmbeddingError } = await supabase.from('embeddings').insert([
      {
        document_id: document.id,
        embedding,
      },
    ])

    if (insertEmbeddingError) {
      throw new Error(
        `Failed to rebuild embeddings for source "${document.source}": ${insertEmbeddingError.message}`
      )
    }
  }

  return {
    success: true,
    reloadedDocuments: typedDocuments.length,
    rebuiltEmbeddings: typedDocuments.length,
  }
}

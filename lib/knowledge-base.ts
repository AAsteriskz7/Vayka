import { getGeminiEmbedding } from './embeddings'
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

export interface KnowledgeBaseSource {
  source: string;
  documentCount: number;
  lastUpdated: string;
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

  const sourceCount = new Set((sources || []).map((row: { source: string }) => row.source)).size

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
    const embedding = await getGeminiEmbedding(document.content)

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

export async function getKnowledgeBaseSources(): Promise<KnowledgeBaseSource[]> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your environment variables.');
  }

  let { data, error } = await supabase.from('documents').select('id, source, created_at')
  if (error && error.code === 'PGRST116') {
     // Fallback if created_at doesn't exist
     const fallback = await supabase.from('documents').select('id, source')
     data = fallback.data as any
     error = fallback.error
  }

  if (error) {
    throw new Error(error.message);
  }

  const sourceMap = new Map<string, { count: number, lastUpdated: string }>();
  for (const doc of data || []) {
    const defaultDate = new Date().toISOString()
    const existing = sourceMap.get(doc.source) || { count: 0, lastUpdated: doc.created_at || defaultDate };
    existing.count += 1;
    if (doc.created_at && new Date(doc.created_at) > new Date(existing.lastUpdated)) {
      existing.lastUpdated = doc.created_at;
    }
    sourceMap.set(doc.source, existing);
  }

  return Array.from(sourceMap.entries()).map(([source, stats]) => ({
    source,
    documentCount: stats.count,
    lastUpdated: stats.lastUpdated
  }));
}

export async function deleteKnowledgeBaseSource(sourceName: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const { data: docs, error: fetchError } = await supabase.from('documents').select('id').eq('source', sourceName)
  if (fetchError) throw new Error(fetchError.message)

  const docIds = (docs || []).map((d: { id: string }) => d.id)
  if (docIds.length === 0) return { success: true, clearedDocuments: 0, clearedEmbeddings: 0 }

  const chunkSize = 1000;
  for (let i = 0; i < docIds.length; i += chunkSize) {
    const chunk = docIds.slice(i, i + chunkSize);
    const { error: embError } = await supabase.from('embeddings').delete().in('document_id', chunk)
    if (embError) throw new Error(embError.message)

    const { error: docError } = await supabase.from('documents').delete().in('id', chunk)
    if (docError) throw new Error(docError.message)
  }

  return {
    success: true,
    clearedDocuments: docIds.length,
    clearedEmbeddings: docIds.length,
  }
}

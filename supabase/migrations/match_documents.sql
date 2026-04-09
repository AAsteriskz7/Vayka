-- Run this in your Supabase SQL Editor
create or replace function match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  source text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    documents.source,
    1 - (embeddings.embedding <=> query_embedding) as similarity
  from documents
  join embeddings on documents.id = embeddings.document_id
  where 1 - (embeddings.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

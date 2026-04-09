-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create the sequence and table for documents
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  content text,
  metadata jsonb,
  source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the table for embeddings
create table if not exists embeddings (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete cascade,
  embedding vector(768), -- Gemini uses 768 dimensions
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a function to search for documents
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

-- Disable Row Level Security temporarily so our ingestion script can insert data via the anon key
alter table documents disable row level security;
alter table embeddings disable row level security;

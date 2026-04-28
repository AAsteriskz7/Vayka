-- Step 1: Add embedding column to pois (run once)
alter table pois add column if not exists embedding vector(768);

-- Step 2: Vector search function for POIs
create or replace function match_pois (
  query_embedding vector(768),
  match_count int
)
returns table (
  place_name text,
  city       text,
  type       text,
  famous_for text,
  similarity float
)
language sql stable
as $$
  select
    place_name,
    city,
    type,
    famous_for,
    1 - (embedding <=> query_embedding) as similarity
  from pois
  where embedding is not null
  order by embedding <=> query_embedding
  limit match_count;
$$;

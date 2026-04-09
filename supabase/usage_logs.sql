create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null,
  method text not null,
  status_code integer not null,
  duration_ms integer not null,
  ok boolean not null default true,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists usage_logs_created_at_idx
  on public.usage_logs (created_at desc);

alter table public.usage_logs enable row level security;

create policy "Allow anonymous read usage logs"
  on public.usage_logs
  for select
  to anon
  using (true);

create policy "Allow anonymous insert usage logs"
  on public.usage_logs
  for insert
  to anon
  with check (true);

create policy "Allow anonymous delete usage logs"
  on public.usage_logs
  for delete
  to anon
  using (true);

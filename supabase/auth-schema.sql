-- User profiles (created automatically on signup via trigger)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User-owned itineraries (replaces localStorage)
create table if not exists itineraries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  destination text not null,
  duration text not null,
  notes text default '',
  days jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;
alter table itineraries enable row level security;

-- Profile policies
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Itinerary policies
create policy "Users can select own itineraries" on itineraries
  for select using (auth.uid() = user_id);
create policy "Users can insert own itineraries" on itineraries
  for insert with check (auth.uid() = user_id);
create policy "Users can update own itineraries" on itineraries
  for update using (auth.uid() = user_id);
create policy "Users can delete own itineraries" on itineraries
  for delete using (auth.uid() = user_id);

-- Auto-create profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'role', 'user')
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

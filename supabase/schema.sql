-- D-MATE works_overrides table
-- Run this in Supabase SQL Editor

create table if not exists works_overrides (
  id           uuid primary key default gen_random_uuid(),
  payload      jsonb not null default '{"overrides":{},"additions":[],"deletions":[]}',
  updated_at   timestamptz not null default now()
);

-- Seed one empty row so upsert logic works from day one
insert into works_overrides (payload)
values ('{"overrides":{},"additions":[],"deletions":[]}')
on conflict do nothing;

-- Allow anon reads (public site reads overrides)
alter table works_overrides enable row level security;

create policy "public read"
  on works_overrides for select
  using (true);

-- Only service role can write (Server Actions use service key)
create policy "service write"
  on works_overrides for all
  using (auth.role() = 'service_role');

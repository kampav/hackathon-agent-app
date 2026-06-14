-- Sessions table: groups messages into a conversation
create table if not exists sessions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  metadata    jsonb default '{}'
);

-- Messages table: stores every chat turn
create table if not exists messages (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid references sessions(id) on delete cascade,
  role        text not null check (role in ('user', 'assistant')),
  agent_name  text,
  content     text not null,
  created_at  timestamptz default now()
);

-- Enable realtime on messages
alter publication supabase_realtime add table messages;

-- Scriptura — review schedule (Leitner boxes) per user.
-- Run once in Supabase → SQL Editor. Safe to re-run.
-- The app backs up each learner's schedule here so it survives sign-out
-- (sign-out wipes the device) and follows them across devices.

create table if not exists scriptura_app_srs (
  user_id     text   not null,
  language_id text   not null,
  char_index  int    not null,
  box         int    not null default 0,   -- Leitner box 0-5
  due         bigint not null default 0,   -- next review, ms since epoch
  correct     int    not null default 0,
  wrong       int    not null default 0,
  last        text,                        -- 'ok' | 'miss'
  best        int    not null default 0,   -- best trace score 0-100
  t           bigint not null default 0,   -- last graded, ms since epoch (merge key)
  updated_at  timestamptz default now(),
  primary key (user_id, language_id, char_index)
);

alter table scriptura_app_srs enable row level security;

-- Each signed-in user can only see and write their own rows.
drop policy if exists "srs select own" on scriptura_app_srs;
create policy "srs select own" on scriptura_app_srs for select using (auth.uid()::text = user_id);
drop policy if exists "srs insert own" on scriptura_app_srs;
create policy "srs insert own" on scriptura_app_srs for insert with check (auth.uid()::text = user_id);
drop policy if exists "srs update own" on scriptura_app_srs;
create policy "srs update own" on scriptura_app_srs for update using (auth.uid()::text = user_id) with check (auth.uid()::text = user_id);
drop policy if exists "srs delete own" on scriptura_app_srs;
create policy "srs delete own" on scriptura_app_srs for delete using (auth.uid()::text = user_id);

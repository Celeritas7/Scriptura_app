-- ============================================================
-- Scriptura — per-user progress (Phase 5). Run once in Supabase → SQL editor.
-- Safe to re-run.
--
-- Before: one open policy — anyone with the public anon key could read,
-- change or wipe every progress row.
-- After:  a signed-in user can only see and write rows where
--         user_id = their auth.uid(). Signed-out visitors get nothing.
--         Lesson content stays public read-only.
-- ============================================================

begin;

-- remove the open demo policy
drop policy if exists "all stats" on scriptura_app_sheet_stats;
drop policy if exists "anon all"  on scriptura_app_sheet_stats;

alter table scriptura_app_sheet_stats enable row level security;

drop policy if exists "own stats: read"   on scriptura_app_sheet_stats;
drop policy if exists "own stats: insert" on scriptura_app_sheet_stats;
drop policy if exists "own stats: update" on scriptura_app_sheet_stats;
drop policy if exists "own stats: delete" on scriptura_app_sheet_stats;

create policy "own stats: read"   on scriptura_app_sheet_stats for select to authenticated
  using (user_id = auth.uid()::text);
create policy "own stats: insert" on scriptura_app_sheet_stats for insert to authenticated
  with check (user_id = auth.uid()::text);
create policy "own stats: update" on scriptura_app_sheet_stats for update to authenticated
  using (user_id = auth.uid()::text) with check (user_id = auth.uid()::text);
create policy "own stats: delete" on scriptura_app_sheet_stats for delete to authenticated
  using (user_id = auth.uid()::text);

-- Old anonymous rows (user_id like 'dev-xxxx') can no longer be reached by
-- anyone. The app re-uploads each device's progress on first sign-in, so they
-- are safe to remove:
delete from scriptura_app_sheet_stats where user_id like 'dev-%';

commit;

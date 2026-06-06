-- HogarFlow schema
-- Run this once in the Supabase SQL editor before seed.sql.

-- ───────────────────────────────────────────────────────────────────────────
-- Tables
-- ───────────────────────────────────────────────────────────────────────────

create table if not exists members (
  id         text    primary key,
  name       text    not null,
  color      text    not null,
  streak     int     not null default 0,
  sort_order int     not null default 0
);

create table if not exists tasks (
  id   text    primary key,
  who  text    not null references members (id),
  text text    not null,
  time text    not null,
  done boolean not null default false
);

create table if not exists events (
  id    text primary key,
  day   text not null,
  mon   text not null,
  dow   text not null,
  title text not null,
  time  text not null,
  place text not null,
  who   text not null references members (id)
);

create table if not exists expenses (
  id         text    primary key,
  title      text    not null,
  cat        text    not null,
  who        text    not null references members (id),
  amount     integer not null,
  -- "when" is a SQL reserved word; mapped to Expense.when in the adapter
  when_label text    not null
);

-- Single-row family config (enforced via check constraint)
create table if not exists family (
  id             int     primary key default 1 check (id = 1),
  name           text    not null,
  you            text    not null references members (id),
  split_members  text[]  not null default '{}',
  monthly_budget integer not null default 0
);

-- ───────────────────────────────────────────────────────────────────────────
-- Indexes
-- ───────────────────────────────────────────────────────────────────────────

create index if not exists tasks_who_idx     on tasks     (who);
create index if not exists events_who_idx    on events    (who);
create index if not exists expenses_who_idx  on expenses  (who);
create index if not exists members_order_idx on members   (sort_order);

-- ───────────────────────────────────────────────────────────────────────────
-- Row-Level Security
-- ───────────────────────────────────────────────────────────────────────────

alter table members  enable row level security;
alter table tasks    enable row level security;
alter table events   enable row level security;
alter table expenses enable row level security;
alter table family   enable row level security;

-- DEV ONLY: replace with auth.uid()/family-membership policies when real auth lands
create policy "members_select_all" on members  for select using (true);

-- DEV ONLY: replace with auth.uid()/family-membership policies when real auth lands
create policy "tasks_select_all"   on tasks    for select using (true);
-- DEV ONLY: replace with auth.uid()/family-membership policies when real auth lands
create policy "tasks_update_all"   on tasks    for update using (true) with check (true);

-- DEV ONLY: replace with auth.uid()/family-membership policies when real auth lands
create policy "events_select_all"  on events   for select using (true);

-- DEV ONLY: replace with auth.uid()/family-membership policies when real auth lands
create policy "expenses_select_all" on expenses for select using (true);

-- DEV ONLY: replace with auth.uid()/family-membership policies when real auth lands
create policy "family_select_all"  on family   for select using (true);

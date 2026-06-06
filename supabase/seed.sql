-- HogarFlow seed data — mirrors src/lib/data-source/seed.ts exactly.
-- Run AFTER schema.sql. Safe to re-run: on conflict (id) do nothing.

-- ───────────────────────────────────────────────────────────────────────────
-- Members (insert first — all other tables have FK → members)
-- sort_order reflects display order in seed.ts: nata=0, toni=1, emi=2, jero=3
-- hex colors from src/constants/theme.ts MemberColors
-- ───────────────────────────────────────────────────────────────────────────

insert into members (id, name, color, streak, sort_order) values
  ('nata', 'Nata', '#36A9BE', 5, 0),
  ('toni', 'Toni', '#E58A6A', 8, 1),
  ('emi',  'Emi',  '#B189D6', 3, 2),
  ('jero', 'Jero', '#4DAF7C', 2, 3)
on conflict (id) do nothing;

-- ───────────────────────────────────────────────────────────────────────────
-- Tasks (7 rows)
-- ───────────────────────────────────────────────────────────────────────────

insert into tasks (id, who, text, time, done) values
  ('t1', 'nata', 'Limpiar piedras',  'Mañana', false),
  ('t2', 'nata', 'Cocinar cena',     '20:00',  false),
  ('t3', 'nata', 'Dormir a Jero',    '21:30',  false),
  ('t4', 'toni', 'Cocinar almuerzo', '13:00',  false),
  ('t5', 'toni', 'Limpiar comedor',  'Tarde',  true),
  ('t6', 'toni', 'Colgar ropa',      '11:00',  false),
  ('t7', 'emi',  'Sacar la basura',  '19:00',  false)
on conflict (id) do nothing;

-- ───────────────────────────────────────────────────────────────────────────
-- Events (3 rows)
-- ───────────────────────────────────────────────────────────────────────────

insert into events (id, day, mon, dow, title, time, place, who) values
  ('e1', '18', 'JUN', 'Jue', 'Cumple de Jero',     '17:00', 'Casa',       'jero'),
  ('e2', '21', 'JUN', 'Dom', 'Asado familiar',     '12:30', 'Patio',      'toni'),
  ('e3', '24', 'JUN', 'Mié', 'Reunión de colegio', '09:00', 'Escuela N°4','nata')
on conflict (id) do nothing;

-- ───────────────────────────────────────────────────────────────────────────
-- Expenses (5 rows) — "when" field mapped to when_label (SQL reserved word)
-- ───────────────────────────────────────────────────────────────────────────

insert into expenses (id, title, cat, who, amount, when_label) values
  ('g1', 'Supermercado', 'Mercado',    'nata', 84300, 'Hoy'),
  ('g2', 'Luz y gas',    'Servicios',  'toni', 52100, 'Ayer'),
  ('g3', 'Nafta',        'Transporte', 'toni', 38000, '1 jun'),
  ('g4', 'Farmacia',     'Salud',      'emi',  14750, '31 may'),
  ('g5', 'Verdulería',   'Mercado',    'nata', 21600, '30 may')
on conflict (id) do nothing;

-- ───────────────────────────────────────────────────────────────────────────
-- Family (single row, id=1 enforced by check constraint)
-- ───────────────────────────────────────────────────────────────────────────

insert into family (id, name, you, split_members, monthly_budget) values
  (1, 'Familia 1', 'toni', '{nata,toni,emi}', 320000)
on conflict (id) do nothing;

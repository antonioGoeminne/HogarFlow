# Supabase setup

The app runs on in-memory seed data until the env vars below are set; then
`getDataSource()` (`src/lib/data-source/index.ts`) auto-switches to the real
`SupabaseDataSource` — **no screen or hook changes**.

## Steps

1. **Create a project** at https://supabase.com. Copy the Project URL and the
   `anon` public key from *Settings → API*.
2. **Run the SQL** in the Supabase SQL editor — `schema.sql` first, then
   `seed.sql` (seed is idempotent: `on conflict (id) do nothing`).
3. **Configure env** — copy `.env.example` to `.env` at the repo root:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. **Run** `pnpm start`. The factory detects the env and uses Supabase.

## Notes

- **RLS** is enabled with **dev-permissive** policies (read-all + task update so
  the optimistic toggle works with the anon key). Replace them with
  `auth.uid()` / family-membership rules when real auth lands — see the
  `-- DEV ONLY` markers in `schema.sql`.
- **Auth** (`src/auth/`) is still the stub session. Wiring `signIn`/`validate`
  to Supabase Auth (plus AsyncStorage for session persistence, and switching the
  client to `persistSession: true` in `src/lib/supabase/client.ts`) is the next step.
- `react-native-url-polyfill` may be needed on older runtimes if Supabase URL
  parsing fails — modern Hermes (SDK 56) handles it, so it's omitted for now.

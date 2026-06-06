import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase/client';

import { InMemoryDataSource } from './in-memory.data-source';
import { SEED } from './seed';
import { SupabaseDataSource } from './supabase.data-source';
import type { DataSource } from './data-source';

let instance: DataSource | null = null;

export function getDataSource(): DataSource {
  if (instance) return instance;
  instance = isSupabaseConfigured()
    ? new SupabaseDataSource(getSupabaseClient())
    : new InMemoryDataSource(SEED);
  return instance;
}

export function setDataSource(ds: DataSource): void {
  instance = ds;
}

export type { DataSource } from './data-source';

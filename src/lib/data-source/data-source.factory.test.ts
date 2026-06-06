import type { DataSource } from './data-source';

// El SDK real de Supabase es ESM y solo se carga porque index.ts importa
// SupabaseDataSource. Lo mockeamos para no arrastrar ese peso ni su transform.
jest.mock('@supabase/supabase-js', () => ({ createClient: jest.fn() }));

describe('getDataSource (factory)', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    // El factory memoiza en un singleton de módulo: reseteamos el registro de
    // módulos en cada test para arrancar siempre con `instance` en null.
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
    delete process.env.EXPO_PUBLIC_SUPABASE_URL;
    delete process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('sin envs de Supabase, cae al adaptador en memoria', () => {
    const { getDataSource } = require('./index');
    const { InMemoryDataSource } = require('./in-memory.data-source');

    expect(getDataSource()).toBeInstanceOf(InMemoryDataSource);
  });

  it('memoiza: dos llamadas devuelven la misma instancia', () => {
    const { getDataSource } = require('./index');

    expect(getDataSource()).toBe(getDataSource());
  });

  it('setDataSource inyecta un doble de test que getDataSource devuelve', () => {
    const { getDataSource, setDataSource } = require('./index');
    const fake = { listTasks: async () => [] } as unknown as DataSource;

    setDataSource(fake);

    expect(getDataSource()).toBe(fake);
  });
});

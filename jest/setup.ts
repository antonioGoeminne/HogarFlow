export {};

// React 19 sólo reconoce las actualizaciones de estado como "dentro de act()" si
// este flag global está activo. Sin él, RNTL y React Query disparan warnings de act.
declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Mock global del SDK de Supabase (ESM). Se importa por la cadena
// data-source/index.ts → supabase.data-source.ts, pero en tests nunca se usa
// (el factory cae a InMemory). Evita cargar y transformar el paquete real.
jest.mock('@supabase/supabase-js', () => ({ createClient: jest.fn() }));

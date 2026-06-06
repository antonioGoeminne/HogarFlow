import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/auth';

// QueryClient nuevo por test: retry false (los fallos son inmediatos, no esperan
// reintentos). gcTime Infinity evita que, al desmontar, React Query programe un GC
// async que re-renderiza fuera de act(). La caché ya está aislada porque cada test
// usa su propio client; NO reusamos el singleton de la app.
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
}

// Devuelve el wrapper Y el client. Exponer el client permite que un test espere a
// que la actividad async (mutaciones, refetches) se drene antes de terminar.
// El AuthProvider arranca con su DEFAULT_USER (memberId 'toni').
export function createWrapper() {
  const client = createTestQueryClient();
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    );
  }
  return { client, Wrapper };
}

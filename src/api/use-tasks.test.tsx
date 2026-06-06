import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useTasks } from './use-tasks';
import { setDataSource } from '@/lib/data-source';
import { InMemoryDataSource } from '@/lib/data-source/in-memory.data-source';
import { createWrapper } from '@/test/render-hook';
import { makeTestSeed } from '@/test/seed';

beforeEach(() => {
  // Cada test arranca con un data source fresco e inyectado (test double natural).
  setDataSource(new InMemoryDataSource(makeTestSeed()));
});

describe('useTasks', () => {
  it('arranca cargando y luego entrega las tareas del data source', async () => {
    const { result } = await renderHook(() => useTasks(), {
      wrapper: createWrapper().Wrapper,
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.tasks.map((t) => t.id)).toEqual(['t1', 't2']);
  });

  it('toggle marca la tarea a través de la mutación', async () => {
    const { result } = await renderHook(() => useTasks(), {
      wrapper: createWrapper().Wrapper,
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.tasks.find((t) => t.id === 't1')?.done).toBe(false);

    // Envolvemos toda la cadena en un único act() async: el optimistic update, la
    // mutación y el refetch de onSettled corren acá adentro, sin dejar notificaciones
    // async colgando que warneen fuera del test.
    await act(async () => {
      result.current.toggle('t1');
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.tasks.find((t) => t.id === 't1')?.done).toBe(true);
  });
});

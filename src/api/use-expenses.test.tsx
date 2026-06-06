import { renderHook, waitFor } from '@testing-library/react-native';
import { useExpenses } from './use-expenses';
import { setDataSource } from '@/lib/data-source';
import { InMemoryDataSource } from '@/lib/data-source/in-memory.data-source';
import { createWrapper } from '@/test/render-hook';
import { makeTestSeed } from '@/test/seed';
import type { Expense } from '@/lib/domain';

// Dos personas pagan, para que perPerson tenga más de una entrada y haya balance.
const twoExpenses: Expense[] = [
  { id: 'g1', title: 'Súper', cat: 'Mercado', who: 'toni', amount: 1000, when: 'Hoy' },
  { id: 'g2', title: 'Luz', cat: 'Servicios', who: 'nata', amount: 600, when: 'Ayer' },
];

describe('useExpenses', () => {
  beforeEach(() => {
    setDataSource(new InMemoryDataSource(makeTestSeed({ expenses: twoExpenses })));
  });

  it('calcula el resumen integrando summarizeExpenses', async () => {
    const { result } = await renderHook(() => useExpenses(), { wrapper: createWrapper().Wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    // total 1600, fairShare 800; vos (toni) pusiste 1000 → balance +200, acreedor
    expect(result.current.summary.total).toBe(1600);
    expect(result.current.summary.fairShare).toBe(800);
    expect(result.current.summary.yourBalance).toBe(200);
    expect(result.current.summary.owed).toBe(true);
  });

  it('enriquece cada perPerson con el color de su miembro', async () => {
    const { result } = await renderHook(() => useExpenses(), { wrapper: createWrapper().Wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    const toni = result.current.summary.perPerson.find((p) => p.who === 'toni');
    const nata = result.current.summary.perPerson.find((p) => p.who === 'nata');
    expect(toni).toMatchObject({ value: 1000, color: '#000' });
    expect(nata).toMatchObject({ value: 600, color: '#111' });
  });

  it('prioriza el memberId del usuario autenticado sobre family.you', async () => {
    // family.you = 'nata', pero el AuthProvider real es 'toni'. El balance debe
    // calcularse desde la óptica de toni (acreedor, +200), no de nata (−200).
    setDataSource(
      new InMemoryDataSource(
        makeTestSeed({
          expenses: twoExpenses,
          family: { name: 'Test', you: 'nata', splitMembers: ['toni', 'nata'] },
        }),
      ),
    );

    const { result } = await renderHook(() => useExpenses(), { wrapper: createWrapper().Wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.summary.yourBalance).toBe(200);
    expect(result.current.summary.owed).toBe(true);
  });
});

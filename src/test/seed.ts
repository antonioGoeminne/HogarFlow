import type { Seed } from '@/lib/data-source/seed';

// Seed base para tests: datos chicos, conocidos y estables. Acepta overrides para
// casos que necesitan otra forma (p. ej. más gastos para ejercitar el summary).
export function makeTestSeed(overrides: Partial<Seed> = {}): Seed {
  return {
    members: [
      { id: 'toni', name: 'Toni', color: '#000', streak: 1 },
      { id: 'nata', name: 'Nata', color: '#111', streak: 2 },
    ],
    tasks: [
      { id: 't1', who: 'toni', text: 'Lavar', time: '10:00', done: false },
      { id: 't2', who: 'nata', text: 'Cocinar', time: '13:00', done: true },
    ],
    events: [
      { id: 'e1', day: '18', mon: 'JUN', dow: 'Jue', title: 'Cumple', time: '17:00', place: 'Casa', who: 'toni' },
    ],
    expenses: [{ id: 'g1', title: 'Súper', cat: 'Mercado', who: 'toni', amount: 1000, when: 'Hoy' }],
    family: { name: 'Test', you: 'toni', splitMembers: ['toni', 'nata'] },
    monthlyBudget: 50000,
    ...overrides,
  };
}

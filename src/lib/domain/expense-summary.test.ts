import { summarizeExpenses } from '@/lib/domain';
import type { Expense, MemberId } from '@/lib/domain';

// Builder: solo `who` y `amount` afectan el cálculo; el resto es relleno válido.
const expense = (who: MemberId, amount: number): Expense => ({
  id: `${who}-${amount}`,
  title: 'x',
  cat: 'Otros',
  who,
  amount,
  when: '2026-06-01',
});

describe('summarizeExpenses', () => {
  it('devuelve todo en cero cuando no hay miembros con quién dividir', () => {
    const result = summarizeExpenses([expense('toni', 1000)], [], 'toni');

    expect(result).toEqual({
      total: 0,
      perPerson: [],
      fairShare: 0,
      yourBalance: 0,
      owed: false,
    });
  });

  it('suma el total y reparte el fair share entre los miembros', () => {
    const expenses = [expense('toni', 1000), expense('nata', 500)];

    const result = summarizeExpenses(expenses, ['toni', 'nata'], 'toni');

    expect(result.total).toBe(1500);
    expect(result.fairShare).toBe(750);
  });

  it('agrupa lo pagado por persona y excluye a quien no puso nada', () => {
    const expenses = [expense('toni', 1000), expense('toni', 200), expense('nata', 500)];

    const result = summarizeExpenses(expenses, ['toni', 'nata', 'jero'], 'toni');

    // jero está en splitMembers pero no pagó → el filtro value > 0 lo saca.
    expect(result.perPerson).toEqual([
      { who: 'toni', value: 1200 },
      { who: 'nata', value: 500 },
    ]);
  });

  it('te marca como acreedor (owed) cuando pagaste de más', () => {
    // total 1500, fairShare 750, vos pagaste 1000 → balance +250
    const expenses = [expense('toni', 1000), expense('nata', 500)];

    const result = summarizeExpenses(expenses, ['toni', 'nata'], 'toni');

    expect(result.yourBalance).toBe(250);
    expect(result.owed).toBe(true);
  });

  it('te marca como deudor cuando pagaste de menos', () => {
    // mismo gasto, pero "vos" sos nata, que solo puso 500 → balance -250
    const expenses = [expense('toni', 1000), expense('nata', 500)];

    const result = summarizeExpenses(expenses, ['toni', 'nata'], 'nata');

    expect(result.yourBalance).toBe(-250);
    expect(result.owed).toBe(false);
  });

  it('considera saldado (owed) cuando el balance es exactamente cero', () => {
    // cada uno pone 750 y el fairShare es 750 → balance 0, y 0 >= 0 ⇒ owed
    const expenses = [expense('toni', 750), expense('nata', 750)];

    const result = summarizeExpenses(expenses, ['toni', 'nata'], 'toni');

    expect(result.yourBalance).toBe(0);
    expect(result.owed).toBe(true);
  });

  it('redondea el balance al entero más cercano', () => {
    // total 1000 entre 3 → fairShare 333.33…; vos pusiste 1000 → 666.66… ⇒ 667
    const result = summarizeExpenses([expense('toni', 1000)], ['toni', 'nata', 'jero'], 'toni');

    expect(result.fairShare).toBeCloseTo(333.333, 2);
    expect(result.yourBalance).toBe(667);
  });
});

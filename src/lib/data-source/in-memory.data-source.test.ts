import { InMemoryDataSource } from './in-memory.data-source';
import { makeTestSeed } from '@/test/seed';
import type { MemberId } from '@/lib/domain';

describe('InMemoryDataSource', () => {
  describe('contrato de lectura del puerto', () => {
    it('devuelve las tareas del seed en orden', async () => {
      const ds = new InMemoryDataSource(makeTestSeed());

      const tasks = await ds.listTasks();

      expect(tasks.map((t) => t.id)).toEqual(['t1', 't2']);
    });

    it('expone gastos, miembros, eventos, familia y presupuesto', async () => {
      const ds = new InMemoryDataSource(makeTestSeed());

      expect(await ds.listExpenses()).toHaveLength(1);
      expect(await ds.listMembers()).toHaveLength(2);
      expect(await ds.listEvents()).toHaveLength(1);
      expect(await ds.getFamily()).toMatchObject({ name: 'Test', you: 'toni' });
      expect(await ds.getMonthlyBudget()).toBe(50000);
    });
  });

  describe('inmutabilidad defensiva', () => {
    it('mutar el array devuelto no afecta el estado interno', async () => {
      const ds = new InMemoryDataSource(makeTestSeed());

      (await ds.listTasks()).pop();

      expect(await ds.listTasks()).toHaveLength(2);
    });

    it('mutar el seed original después no se filtra al data source', async () => {
      const seed = makeTestSeed();
      const ds = new InMemoryDataSource(seed);

      seed.tasks.push({ id: 't9', who: 'toni', text: 'Inyectada', time: '0', done: false });

      expect(await ds.listTasks()).toHaveLength(2);
    });

    it('getFamily devuelve copia profunda de splitMembers', async () => {
      const ds = new InMemoryDataSource(makeTestSeed());

      (await ds.getFamily()).splitMembers.push('emi' as MemberId);

      expect((await ds.getFamily()).splitMembers).toEqual(['toni', 'nata']);
    });
  });

  describe('toggleTask', () => {
    it('alterna done de false a true', async () => {
      const ds = new InMemoryDataSource(makeTestSeed());

      const tasks = await ds.toggleTask('t1');

      expect(tasks.find((t) => t.id === 't1')?.done).toBe(true);
    });

    it('es reversible: dos toggles vuelven al estado original', async () => {
      const ds = new InMemoryDataSource(makeTestSeed());

      await ds.toggleTask('t1');
      const tasks = await ds.toggleTask('t1');

      expect(tasks.find((t) => t.id === 't1')?.done).toBe(false);
    });

    it('no toca las demás tareas', async () => {
      const ds = new InMemoryDataSource(makeTestSeed());

      const tasks = await ds.toggleTask('t1');

      expect(tasks.find((t) => t.id === 't2')?.done).toBe(true);
    });

    it('con un id inexistente deja todo igual', async () => {
      const ds = new InMemoryDataSource(makeTestSeed());

      const tasks = await ds.toggleTask('no-existe');

      expect(tasks.map((t) => t.done)).toEqual([false, true]);
    });

    it('persiste el cambio: lo refleja una lectura posterior', async () => {
      const ds = new InMemoryDataSource(makeTestSeed());

      await ds.toggleTask('t1');

      expect((await ds.listTasks()).find((t) => t.id === 't1')?.done).toBe(true);
    });
  });
});

import type { Expense, Family, FamilyEvent, Member, Task } from '@/lib/domain';
import type { DataSource } from './data-source';
import type { Seed } from './seed';

export class InMemoryDataSource implements DataSource {
  private tasks: Task[];
  private readonly expenses: Expense[];
  private readonly members: Member[];
  private readonly events: FamilyEvent[];
  private readonly family: Family;
  private readonly monthlyBudget: number;

  constructor(seed: Seed) {
    this.tasks = [...seed.tasks];
    this.expenses = [...seed.expenses];
    this.members = [...seed.members];
    this.events = [...seed.events];
    this.family = { ...seed.family, splitMembers: [...seed.family.splitMembers] };
    this.monthlyBudget = seed.monthlyBudget;
  }

  async listTasks(): Promise<Task[]> {
    return [...this.tasks];
  }

  async toggleTask(id: string): Promise<Task[]> {
    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t,
    );
    return [...this.tasks];
  }

  async listExpenses(): Promise<Expense[]> {
    return [...this.expenses];
  }

  async listMembers(): Promise<Member[]> {
    return [...this.members];
  }

  async listEvents(): Promise<FamilyEvent[]> {
    return [...this.events];
  }

  async getFamily(): Promise<Family> {
    return { ...this.family, splitMembers: [...this.family.splitMembers] };
  }

  async getMonthlyBudget(): Promise<number> {
    return this.monthlyBudget;
  }
}

import type { Expense, Family, FamilyEvent, Member, Task } from '@/lib/domain';

export interface DataSource {
  listTasks(): Promise<Task[]>;
  toggleTask(id: string): Promise<Task[]>;
  listExpenses(): Promise<Expense[]>;
  listMembers(): Promise<Member[]>;
  listEvents(): Promise<FamilyEvent[]>;
  getFamily(): Promise<Family>;
  getMonthlyBudget(): Promise<number>;
}

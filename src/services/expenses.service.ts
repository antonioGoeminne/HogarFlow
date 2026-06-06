import { getDataSource } from '@/lib/data-source';
import type { Expense } from '@/lib/domain';

export const fetchExpenses = (): Promise<Expense[]> => getDataSource().listExpenses();

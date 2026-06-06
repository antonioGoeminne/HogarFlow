import { getDataSource } from '@/lib/data-source';
import type { Family } from '@/lib/domain';

export const fetchFamily = (): Promise<Family> => getDataSource().getFamily();

export const fetchMonthlyBudget = (): Promise<number> => getDataSource().getMonthlyBudget();

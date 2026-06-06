import type { MemberId } from './member';

export type Category = 'Mercado' | 'Servicios' | 'Transporte' | 'Salud' | 'Otros';

export interface Expense {
  id: string;
  title: string;
  cat: Category;
  who: MemberId;
  amount: number;
  when: string;
}

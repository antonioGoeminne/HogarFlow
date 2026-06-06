/**
 * Family seed data for HogarFlow, ported from the prototype `hf-data.jsx`.
 * This is static placeholder data so the scaffolded screens render real-looking
 * content — swap it for a real store / API later.
 */

import { CategoryColors, MemberColors } from '@/constants/theme';

export type MemberId = 'nata' | 'toni' | 'jero' | 'emi';

export interface Member {
  id: MemberId;
  name: string;
  color: string;
  /** Consecutive days completing chores. */
  streak: number;
}

export const FAMILY = { name: 'Familia 1', you: 'toni' as MemberId };

export const MEMBERS: Record<MemberId, Member> = {
  nata: { id: 'nata', name: 'Nata', color: MemberColors.teal, streak: 5 },
  toni: { id: 'toni', name: 'Toni', color: MemberColors.coral, streak: 8 },
  jero: { id: 'jero', name: 'Jero', color: MemberColors.green, streak: 2 },
  emi: { id: 'emi', name: 'Emi', color: MemberColors.violet, streak: 3 },
};

/** Display order for member-grouped views. */
export const MEMBER_ORDER: MemberId[] = ['nata', 'toni', 'emi', 'jero'];

export interface Task {
  id: string;
  who: MemberId;
  text: string;
  time: string;
  done: boolean;
}

export const SEED_TASKS: Task[] = [
  { id: 't1', who: 'nata', text: 'Limpiar piedras', time: 'Mañana', done: false },
  { id: 't2', who: 'nata', text: 'Cocinar cena', time: '20:00', done: false },
  { id: 't3', who: 'nata', text: 'Dormir a Jero', time: '21:30', done: false },
  { id: 't4', who: 'toni', text: 'Cocinar almuerzo', time: '13:00', done: false },
  { id: 't5', who: 'toni', text: 'Limpiar comedor', time: 'Tarde', done: true },
  { id: 't6', who: 'toni', text: 'Colgar ropa', time: '11:00', done: false },
  { id: 't7', who: 'emi', text: 'Sacar la basura', time: '19:00', done: false },
];

export interface FamilyEvent {
  id: string;
  day: string;
  mon: string;
  dow: string;
  title: string;
  time: string;
  place: string;
  who: MemberId;
}

export const EVENTS: FamilyEvent[] = [
  { id: 'e1', day: '18', mon: 'JUN', dow: 'Jue', title: 'Cumple de Jero', time: '17:00', place: 'Casa', who: 'jero' },
  { id: 'e2', day: '21', mon: 'JUN', dow: 'Dom', title: 'Asado familiar', time: '12:30', place: 'Patio', who: 'toni' },
  { id: 'e3', day: '24', mon: 'JUN', dow: 'Mié', title: 'Reunión de colegio', time: '09:00', place: 'Escuela N°4', who: 'nata' },
];

export type Category = keyof typeof CategoryColors;

export interface Expense {
  id: string;
  title: string;
  cat: Category;
  who: MemberId;
  amount: number;
  when: string;
}

export const SEED_EXPENSES: Expense[] = [
  { id: 'g1', title: 'Supermercado', cat: 'Mercado', who: 'nata', amount: 84300, when: 'Hoy' },
  { id: 'g2', title: 'Luz y gas', cat: 'Servicios', who: 'toni', amount: 52100, when: 'Ayer' },
  { id: 'g3', title: 'Nafta', cat: 'Transporte', who: 'toni', amount: 38000, when: '1 jun' },
  { id: 'g4', title: 'Farmacia', cat: 'Salud', who: 'emi', amount: 14750, when: '31 may' },
  { id: 'g5', title: 'Verdulería', cat: 'Mercado', who: 'nata', amount: 21600, when: '30 may' },
];

export const MONTHLY_BUDGET = 320000;

export const money = (n: number) => '$' + n.toLocaleString('es-AR');

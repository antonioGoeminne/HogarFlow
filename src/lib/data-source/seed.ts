import { MemberColors } from '@/constants/theme';
import type { Expense, Family, FamilyEvent, Member, Task } from '@/lib/domain';

export interface Seed {
  members: Member[];
  tasks: Task[];
  events: FamilyEvent[];
  expenses: Expense[];
  family: Family;
  monthlyBudget: number;
}

export const SEED: Seed = {
  members: [
    { id: 'nata', name: 'Nata', color: MemberColors.teal, streak: 5 },
    { id: 'toni', name: 'Toni', color: MemberColors.coral, streak: 8 },
    { id: 'emi', name: 'Emi', color: MemberColors.violet, streak: 3 },
    { id: 'jero', name: 'Jero', color: MemberColors.green, streak: 2 },
  ],
  tasks: [
    { id: 't1', who: 'nata', text: 'Limpiar piedras', time: 'Mañana', done: false },
    { id: 't2', who: 'nata', text: 'Cocinar cena', time: '20:00', done: false },
    { id: 't3', who: 'nata', text: 'Dormir a Jero', time: '21:30', done: false },
    { id: 't4', who: 'toni', text: 'Cocinar almuerzo', time: '13:00', done: false },
    { id: 't5', who: 'toni', text: 'Limpiar comedor', time: 'Tarde', done: true },
    { id: 't6', who: 'toni', text: 'Colgar ropa', time: '11:00', done: false },
    { id: 't7', who: 'emi', text: 'Sacar la basura', time: '19:00', done: false },
  ],
  events: [
    { id: 'e1', day: '18', mon: 'JUN', dow: 'Jue', title: 'Cumple de Jero', time: '17:00', place: 'Casa', who: 'jero' },
    { id: 'e2', day: '21', mon: 'JUN', dow: 'Dom', title: 'Asado familiar', time: '12:30', place: 'Patio', who: 'toni' },
    { id: 'e3', day: '24', mon: 'JUN', dow: 'Mié', title: 'Reunión de colegio', time: '09:00', place: 'Escuela N°4', who: 'nata' },
  ],
  expenses: [
    { id: 'g1', title: 'Supermercado', cat: 'Mercado', who: 'nata', amount: 84300, when: 'Hoy' },
    { id: 'g2', title: 'Luz y gas', cat: 'Servicios', who: 'toni', amount: 52100, when: 'Ayer' },
    { id: 'g3', title: 'Nafta', cat: 'Transporte', who: 'toni', amount: 38000, when: '1 jun' },
    { id: 'g4', title: 'Farmacia', cat: 'Salud', who: 'emi', amount: 14750, when: '31 may' },
    { id: 'g5', title: 'Verdulería', cat: 'Mercado', who: 'nata', amount: 21600, when: '30 may' },
  ],
  family: { name: 'Familia 1', you: 'toni', splitMembers: ['nata', 'toni', 'emi'] },
  monthlyBudget: 320000,
};

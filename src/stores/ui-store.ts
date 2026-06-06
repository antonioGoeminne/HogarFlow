import { create } from 'zustand';

export type TasksFilter = 'todos' | 'mias';
export type ExpensesTab = 'movimientos' | 'categorias';

interface UIState {
  tasksFilter: TasksFilter;
  setTasksFilter: (f: TasksFilter) => void;
  expensesTab: ExpensesTab;
  setExpensesTab: (t: ExpensesTab) => void;
}

export const useUIStore = create<UIState>((set) => ({
  tasksFilter: 'todos',
  setTasksFilter: (tasksFilter) => set({ tasksFilter }),
  expensesTab: 'movimientos',
  setExpensesTab: (expensesTab) => set({ expensesTab }),
}));

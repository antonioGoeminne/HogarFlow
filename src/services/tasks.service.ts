import { getDataSource } from '@/lib/data-source';
import type { Task } from '@/lib/domain';

export const fetchTasks = (): Promise<Task[]> => getDataSource().listTasks();

export const toggleTask = (id: string): Promise<Task[]> => getDataSource().toggleTask(id);

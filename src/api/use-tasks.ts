import { useQuery, useMutation, useQueryClient, keys } from '@/api/query';
import { fetchTasks, toggleTask } from '@/services';
import type { Task } from '@/lib/domain';

export function useTasks(): { tasks: Task[]; toggle: (id: string) => void; loading: boolean } {
  const qc = useQueryClient();
  const { data: tasks = [], isLoading } = useQuery({ queryKey: keys.tasks, queryFn: fetchTasks });
  const m = useMutation({
    mutationFn: toggleTask,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: keys.tasks });
      const prev = qc.getQueryData<Task[]>(keys.tasks);
      qc.setQueryData<Task[]>(keys.tasks, (old) =>
        old?.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      );
      return { prev };
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(keys.tasks, ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: keys.tasks });
    },
  });

  return { tasks, toggle: m.mutate, loading: isLoading };
}

import { useQuery, keys } from '@/api/query';
import { fetchFamily, fetchMonthlyBudget } from '@/services';
import type { Family } from '@/lib/domain';

export function useFamily(): { family: Family; monthlyBudget: number; loading: boolean } {
  const { data: family = { name: '', you: 'toni', splitMembers: [] }, isLoading: isLoading1 } =
    useQuery({ queryKey: keys.family, queryFn: fetchFamily });

  const { data: monthlyBudget = 0, isLoading: isLoading2 } = useQuery({
    queryKey: keys.monthlyBudget,
    queryFn: fetchMonthlyBudget,
  });

  return { family, monthlyBudget, loading: isLoading1 || isLoading2 };
}

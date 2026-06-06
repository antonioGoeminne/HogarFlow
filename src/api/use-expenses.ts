import { useQuery, keys } from '@/api/query';
import { fetchExpenses, fetchFamily, fetchMembers } from '@/services';
import { summarizeExpenses } from '@/lib/domain';
import { useAuth } from '@/auth';
import type { ExpenseSummary, MemberId, Member } from '@/lib/domain';

interface EnrichedPerPerson {
  who: MemberId;
  color: string;
  value: number;
}

interface UseExpensesResult {
  expenses: Awaited<ReturnType<typeof fetchExpenses>>;
  summary: Omit<ExpenseSummary, 'perPerson'> & { perPerson: EnrichedPerPerson[] };
  loading: boolean;
}

export function useExpenses(): UseExpensesResult {
  const { user } = useAuth();

  const { data: expenses = [], isLoading: isLoadingExpenses } = useQuery({
    queryKey: keys.expenses,
    queryFn: fetchExpenses,
  });

  const { data: family = { name: '', you: 'toni', splitMembers: [] }, isLoading: isLoadingFamily } =
    useQuery({ queryKey: keys.family, queryFn: fetchFamily });

  const { data: members = [], isLoading: isLoadingMembers } = useQuery({
    queryKey: keys.members,
    queryFn: fetchMembers,
  });

  const loading = isLoadingExpenses || isLoadingFamily || isLoadingMembers;

  const byId = members.reduce(
    (acc, m) => {
      acc[m.id] = m;
      return acc;
    },
    {} as Record<MemberId, Member>,
  );

  const you: MemberId = user?.memberId ?? family.you;
  const base = summarizeExpenses(expenses, family.splitMembers, you);

  const perPerson: EnrichedPerPerson[] = base.perPerson.map((p) => ({
    ...p,
    color: byId[p.who]?.color ?? '',
  }));

  return {
    expenses,
    summary: { ...base, perPerson },
    loading,
  };
}

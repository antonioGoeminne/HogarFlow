import { useQuery, keys } from '@/api/query';
import { fetchMembers } from '@/services';
import type { Member, MemberId } from '@/lib/domain';

export function useMembers(): {
  members: Member[];
  byId: Record<MemberId, Member>;
  loading: boolean;
} {
  const { data: members = [], isLoading } = useQuery({
    queryKey: keys.members,
    queryFn: fetchMembers,
  });

  const byId = members.reduce(
    (acc, m) => {
      acc[m.id] = m;
      return acc;
    },
    {} as Record<MemberId, Member>,
  );

  return { members, byId, loading: isLoading };
}

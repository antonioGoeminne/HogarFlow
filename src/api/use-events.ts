import { useQuery, keys } from '@/api/query';
import { fetchEvents } from '@/services';
import type { FamilyEvent } from '@/lib/domain';

export function useEvents(): { events: FamilyEvent[]; loading: boolean } {
  const { data: events = [], isLoading } = useQuery({
    queryKey: keys.events,
    queryFn: fetchEvents,
  });

  return { events, loading: isLoading };
}

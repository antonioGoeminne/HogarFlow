import { getDataSource } from '@/lib/data-source';
import type { FamilyEvent } from '@/lib/domain';

export const fetchEvents = (): Promise<FamilyEvent[]> => getDataSource().listEvents();

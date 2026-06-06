import { getDataSource } from '@/lib/data-source';
import type { Member } from '@/lib/domain';

export const fetchMembers = (): Promise<Member[]> => getDataSource().listMembers();

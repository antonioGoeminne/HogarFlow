import type { MemberId } from './member';

export interface FamilyEvent {
  id: string;
  day: string;
  mon: string;
  dow: string;
  title: string;
  time: string;
  place: string;
  who: MemberId;
}

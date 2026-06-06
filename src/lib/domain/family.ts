import type { MemberId } from './member';

export interface Family {
  name: string;
  you: MemberId;
  splitMembers: MemberId[];
}

import type { MemberId } from './member';

export interface Task {
  id: string;
  who: MemberId;
  text: string;
  time: string;
  done: boolean;
}

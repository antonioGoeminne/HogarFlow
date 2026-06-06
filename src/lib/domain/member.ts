export type MemberId = 'nata' | 'toni' | 'jero' | 'emi';

export interface Member {
  id: MemberId;
  name: string;
  color: string;
  streak: number;
}

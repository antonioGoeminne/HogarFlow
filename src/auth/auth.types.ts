import type { MemberId } from '@/lib/domain';

export interface AuthUser {
  uid: string;
  token: string;
  memberId: MemberId;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => void;
  validate: () => Promise<boolean>;
}

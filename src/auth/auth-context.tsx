import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser, AuthState } from './auth.types';

const DEFAULT_USER: AuthUser = {
  uid: 'dev-uid',
  token: 'dev-token',
  memberId: 'toni',
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(DEFAULT_USER);

  const signIn = async (token: string): Promise<void> => {
    // TODO(supabase): exchange/validate token server-side
    setUser({ ...DEFAULT_USER, token });
  };

  const signOut = (): void => {
    setUser(null);
  };

  const validate = async (): Promise<boolean> => {
    // TODO(supabase): verify token/uid against backend
    return user != null;
  };

  const value: AuthState = {
    user,
    isAuthenticated: user != null,
    loading: false,
    signIn,
    signOut,
    validate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

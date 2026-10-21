'use client';

import React, { createContext, useMemo, useSyncExternalStore, useCallback } from 'react';
import { RegistrationSnapshot } from '@/types';
import { loginAccount, registerAccount, verifyOtp as verifyOtpRequest } from '@/services/api';
import {
  clearSession,
  getServerSnapshot,
  getSnapshot,
  readSnapshot,
  saveRegistration,
  saveSession,
  subscribe,
} from '@/services/session-store';
import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { user, registration } = useMemo(() => readSnapshot(snapshot), [snapshot]);

  const register = useCallback(
    (input: { fullName: string; email: string; password: string }) => registerAccount(input),
    [],
  );

  const verifyOtp = useCallback(
    (email: string, otpCode: string) => verifyOtpRequest({ email, otpCode }),
    [],
  );

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginAccount({ email, password });
    saveSession(result.user, result.token);
    return result.user;
  }, []);

  const logout = useCallback(() => clearSession(), []);

  const persistRegistration = useCallback(
    (next: RegistrationSnapshot) => saveRegistration(next),
    [],
  );

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      registration,
      isLoading: snapshot === null,
      register,
      verifyOtp,
      login,
      logout,
      persistRegistration,
    }),
    [user, registration, snapshot, register, verifyOtp, login, logout, persistRegistration],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

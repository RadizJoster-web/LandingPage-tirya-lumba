'use client';

import React, { createContext, useMemo, useSyncExternalStore, useCallback } from 'react';
import { LoginResult, RegistrationSnapshot } from '@/types';
import { request } from '@/lib/http';
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

async function registerAccount(input: {
  fullName: string;
  email: string;
  password: string;
}): Promise<string> {
  const res = await request<string>('/auth/register', {
    method: 'POST',
    body: input,
  });
  return res.data;
}

async function verifyOtpRequest(input: {
  email: string;
  otpCode: string;
}): Promise<void> {
  await request<unknown>('/auth/verify-otp', { method: 'POST', body: input });
}

async function loginAccount(input: {
  email: string;
  password: string;
}): Promise<LoginResult> {
  const res = await request<LoginResult>('/auth/login', {
    method: 'POST',
    body: input,
  });
  return res.data;
}

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

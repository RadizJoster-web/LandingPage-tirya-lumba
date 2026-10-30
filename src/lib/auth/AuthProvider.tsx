'use client';

import React, {
  createContext,
  useMemo,
  useSyncExternalStore,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RegistrationSnapshot } from '@/types';
import {
  clearSession,
  getServerSnapshot,
  getSnapshot,
  readSnapshot,
  saveSession,
  subscribe,
  updateUser,
} from '@/services/session-store';
import { AuthContextType } from './types';
import {
  registerAccount,
  verifyOtpRequest,
  loginAccount,
  fetchMyRegistration,
} from './authApi';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { user } = useMemo(() => readSnapshot(snapshot), [snapshot]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [liveRegistration, setLiveRegistration] = useState<RegistrationSnapshot | null>(null);
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const registration = liveRegistration;

  const refreshRegistration = useCallback(async () => {
    setIsRegistrationLoading(true);
    try {
      const serverReg = await fetchMyRegistration();
      if (serverReg) {
        setLiveRegistration(serverReg);
        if (serverReg.profilePictureUrl) updateUser({ profilePictureUrl: serverReg.profilePictureUrl });
      } else {
        setLiveRegistration(null);
      }
      return serverReg;
    } finally {
      setIsRegistrationLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.userId) {
      refreshRegistration();
    } else {
      setIsRegistrationLoading(false);
      setLiveRegistration(null);
    }
  }, [user?.userId, refreshRegistration]);

  const register = useCallback((input: { fullName: string; email: string; password: string }) => registerAccount(input), []);
  const verifyOtp = useCallback((email: string, otpCode: string) => verifyOtpRequest({ email, otpCode }), []);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginAccount({ email, password });
      saveSession(result.user, result.token);
      const serverReg = await refreshRegistration();
      if (serverReg?.profilePictureUrl && !result.user.profilePictureUrl) {
        saveSession({ ...result.user, profilePictureUrl: serverReg.profilePictureUrl }, result.token);
      }
      return result.user;
    },
    [refreshRegistration],
  );

  const logout = useCallback(() => {
    setLiveRegistration(null);
    clearSession();
  }, []);

  const persistRegistration = useCallback((next: RegistrationSnapshot) => {
    setLiveRegistration(next);
    if (next.profilePictureUrl) updateUser({ profilePictureUrl: next.profilePictureUrl });
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      registration,
      isLoading: !isHydrated,
      isRegistrationLoading,
      refreshRegistration,
      register,
      verifyOtp,
      login,
      logout,
      persistRegistration,
    }),
    [user, registration, isHydrated, isRegistrationLoading, refreshRegistration, register, verifyOtp, login, logout, persistRegistration],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

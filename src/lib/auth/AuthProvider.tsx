'use client';

import React, { createContext, useSyncExternalStore, useMemo } from 'react';
import { UserSession } from '@/types';
import { AuthContextType } from './types';
import { subscribe, getSnapshot, getServerSnapshot, saveToStorage } from './storage';
import { createSaveStudentRegistration, createUpdateStudentCompletedSessions, createUpdateRegistrationStatus } from './student-actions';
import { createSaveCoachRegistration, createCancelRescheduleSlot, createRequestRescheduleSlot } from './coach-actions';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rawSession = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let user: UserSession | null = null;
  try {
    user = rawSession ? JSON.parse(rawSession) : null;
  } catch {
    user = null;
  }

  const login = async (email: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    const existingStr = localStorage.getItem(`tirya_user_${email.toLowerCase()}`);
    let sessionUser: UserSession = {
      email: email.toLowerCase(),
      role: null,
      name: email.split('@')[0],
    };
    if (existingStr) {
      try { sessionUser = JSON.parse(existingStr); } catch {}
    }
    saveToStorage(sessionUser);
    return true;
  };

  const logout = () => saveToStorage(null);

  const value = useMemo<AuthContextType>(() => ({
    user,
    isLoading: false,
    login,
    logout,
    saveStudentRegistration: createSaveStudentRegistration(user),
    saveCoachRegistration: createSaveCoachRegistration(user),
    updateStudentCompletedSessions: createUpdateStudentCompletedSessions(user),
    updateRegistrationStatus: createUpdateRegistrationStatus(user),
    cancelRescheduleSlot: createCancelRescheduleSlot(user),
    requestRescheduleSlot: createRequestRescheduleSlot(user),
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [rawSession]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

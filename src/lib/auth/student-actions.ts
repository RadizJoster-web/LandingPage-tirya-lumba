import { UserSession, StudentRegistration } from '@/types';
import { saveToStorage, persistUserData } from './storage';

export function createSaveStudentRegistration(user: UserSession | null) {
  return (data: StudentRegistration) => {
    if (!user || typeof window === 'undefined') return;
    const updated: UserSession = {
      ...user,
      role: 'murid',
      name: data.name,
      studentReg: data,
    };
    saveToStorage(updated);
    persistUserData(user.email, updated);
  };
}

export function createUpdateStudentCompletedSessions(user: UserSession | null) {
  return (count: number) => {
    if (!user || !user.studentReg || typeof window === 'undefined') return;
    const updated: UserSession = {
      ...user,
      studentReg: { ...user.studentReg, completedSessions: count },
    };
    saveToStorage(updated);
    persistUserData(user.email, updated);
  };
}

export function createUpdateRegistrationStatus(user: UserSession | null) {
  return (status: 'approved' | 'rejected') => {
    if (!user || typeof window === 'undefined') return;
    const updated: UserSession = {
      ...user,
      studentReg: user.studentReg ? { ...user.studentReg, status } : undefined,
      coachReg: user.coachReg ? { ...user.coachReg, status } : undefined,
    };
    saveToStorage(updated);
    persistUserData(user.email, updated);
  };
}

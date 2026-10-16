import { UserSession, CoachRegistration } from '@/types';
import { saveToStorage, persistUserData } from './storage';

export function createSaveCoachRegistration(user: UserSession | null) {
  return (data: CoachRegistration) => {
    if (!user || typeof window === 'undefined') return;
    const updated: UserSession = {
      ...user,
      role: 'guru',
      name: data.name,
      coachReg: data,
    };
    saveToStorage(updated);
    persistUserData(user.email, updated);
  };
}

export function createCancelRescheduleSlot(user: UserSession | null) {
  return (slotKey: string) => {
    if (!user || !user.coachReg || typeof window === 'undefined') return;
    const newSlots = user.coachReg.availableSlots.filter((s) => s !== slotKey);
    const updated: UserSession = {
      ...user,
      coachReg: { ...user.coachReg, availableSlots: newSlots },
    };
    saveToStorage(updated);
    persistUserData(user.email, updated);
  };
}

export function createRequestRescheduleSlot(user: UserSession | null) {
  return (
    fromDay: number,
    fromSession: number,
    toDay: number,
    toSession: number
  ): { success: boolean; message: string } => {
    if (!user || !user.coachReg || typeof window === 'undefined') {
      return { success: false, message: 'Akun pelatih tidak ditemukan.' };
    }

    // STRICT BUSINESS RULE:
    // Demo: Hari Senin (1), Rabu (3), dan Sabtu (6) memiliki murid aktif.
    const hasStudentsOnDay = (day: number) => day === 1 || day === 3 || day === 6;

    if (hasStudentsOnDay(fromDay)) {
      return {
        success: false,
        message: 'Pengajuan ditolak otomatis: Terdapat murid aktif pada hari tersebut.',
      };
    }

    const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const SESSIONS = ['Pagi', 'Siang', 'Sore'];

    const newReq = {
      id: Math.random().toString(36).substring(2, 9),
      fromDay,
      fromSession,
      toDay,
      toSession,
      reason: `Pindah ketersediaan ${DAYS[fromDay]} (${SESSIONS[fromSession]}) ke ${DAYS[toDay]} (${SESSIONS[toSession]})`,
      status: 'pending' as const,
      createdAt: Date.now(),
    };

    const updated: UserSession = {
      ...user,
      coachReg: {
        ...user.coachReg,
        rescheduleRequests: [...(user.coachReg.rescheduleRequests || []), newReq],
      },
    };
    saveToStorage(updated);
    persistUserData(user.email, updated);

    return {
      success: true,
      message: 'Permintaan reschedule berhasil dikirim ke Admin untuk ditinjau.',
    };
  };
}

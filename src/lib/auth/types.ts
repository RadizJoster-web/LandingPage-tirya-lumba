import { UserSession, StudentRegistration, CoachRegistration } from '@/types';

export interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  saveStudentRegistration: (data: StudentRegistration) => void;
  saveCoachRegistration: (data: CoachRegistration) => void;
  updateStudentCompletedSessions: (count: number) => void;
  updateRegistrationStatus: (status: 'approved' | 'rejected') => void;
  cancelRescheduleSlot: (slotKey: string) => void;
  requestRescheduleSlot: (
    fromDay: number,
    fromSession: number,
    toDay: number,
    toSession: number
  ) => { success: boolean; message: string };
}

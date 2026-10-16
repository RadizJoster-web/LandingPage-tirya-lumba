export type PoolCategory = 'kota' | 'tangsel' | 'kab' | 'non';

export interface Pool {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: PoolCategory;
  priceReguler: number;
  pricePrivate: number;
}

export type ClassType = 'Reguler' | 'Privat' | 'Prestasi' | 'Ekstrakurikuler';

export interface Instructor {
  id: number;
  name: string;
  availableDays: number[]; // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
  poolIds: number[];
  license: string;
  avatarUrl?: string;
}

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export type ShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type PaymentMethod = 'QRIS' | 'Transfer Bank' | 'Cash';

export interface StudentRegistration {
  id?: string;
  name: string;
  birthPlace: string;
  birthDate: string;
  age: number;
  gender: 'Laki-laki' | 'Perempuan';
  address: string;
  phone: string;
  email: string;
  schoolOrOffice: string;
  shirtSize: ShirtSize;
  poolId: number;
  classType: ClassType;
  startDate: string;
  startTime: string;
  coachName: string;
  photoNames: string[];
  paymentMethod: PaymentMethod;
  paymentProofUrl?: string;
  totalPrice: number;
  status: RegistrationStatus;
  rejectionReason?: string;
  completedSessions: number;
  totalSessions: number;
  registeredAt: number;
}

export interface CoachRegistration {
  id?: string;
  name: string;
  birthDate: string;
  age: number;
  gender: 'Laki-laki' | 'Perempuan';
  phone: string;
  domicile: string;
  license: string;
  teachingExperience: string;
  cvFileName?: string;
  selectedPoolIds: number[];
  availableSlots: string[]; // format: "dayIndex|sessionIndex"
  status: RegistrationStatus;
  rejectionReason?: string;
  rescheduleRequests: RescheduleRequestItem[];
  registeredAt: number;
}

export interface RescheduleRequestItem {
  id: string;
  coachId?: string;
  fromDay: number;
  fromSession: number;
  toDay: number;
  toSession: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
}

export type UserRole = 'murid' | 'guru' | null;

export interface UserSession {
  email: string;
  role: UserRole;
  name: string;
  studentReg?: StudentRegistration;
  coachReg?: CoachRegistration;
}

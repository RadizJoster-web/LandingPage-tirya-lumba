// Tipe data payload dan snapshot pendaftaran murid & instruktur.
import { Gender, PaymentMethodApi, ShirtSize } from './models';

export interface StudentRegistrationPayload {
  profilePictureUrl: string;
  fullName: string;
  birthPlace: string;
  birthDate: string;
  gender: Gender;
  address: string;
  phone: string;
  email: string;
  schoolOrOffice: string;
  tshirtSize: ShirtSize;
  locationId: string;
  packageId: string;
  firstMeetDate: string;
  firstMeetSession: string;
  instructorId: string;
  paymentMethod: PaymentMethodApi;
  paymentProofUrl: string;
}

export interface InstructorScheduleInput {
  locationId: string;
  locationName?: string;
  dayOfWeek: string;
  sessionName: string;
  startTime?: string;
  endTime?: string;
  timeRange?: string;
  totalStudents?: number;
}

export interface InstructorRegistrationPayload {
  fullName: string;
  phone: string;
  birthDate: string;
  gender: Gender;
  address: string;
  shortBio: string;
  license: string;
  experience: string;
  schedules: InstructorScheduleInput[];
  profilePictureUrl: string;
  cvUrl: string;
}

export interface RegistrationResult {
  registrationId: string;
  status: string;
  userId?: string;
  fullName?: string;
  phone?: string;
  totalSchedulesCreated?: number;
}

export interface StudentRegistrationSnapshot extends StudentRegistrationPayload {
  kind: 'student';
  registrationId: string;
  status: string;
  submittedAt: number;
  locationLabel: string;
  packageType: string;
  packagePrice: number;
  instructorName: string;
  instructorProfilePictureUrl?: string;
  instructorLicense?: string;
  instructorExperience?: string;
  instructorBio?: string;
  activeSessions?: number;
  photoFileName?: string;
  uploadNotice?: string;
  rejectionReason?: string | null;
}

export interface InstructorRegistrationSnapshot extends InstructorRegistrationPayload {
  kind: 'instructor';
  registrationId: string;
  status: string;
  submittedAt: number;
  scheduleLabels: string[];
  uploadNotice?: string;
  rejectionReason?: string | null;
}

export type RegistrationSnapshot =
  | StudentRegistrationSnapshot
  | InstructorRegistrationSnapshot;

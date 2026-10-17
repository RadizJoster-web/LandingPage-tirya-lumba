// Tipe data mengikuti kontrak REST API PT Tirya Lumba (lihat API_DOCUMENTATION.md).
// Semua endpoint mengembalikan envelope standar: { success, message?, data, pagination? }.

export interface ApiPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: ApiPagination;
}

export type Role = 'ADMIN' | 'POOL_MANAGER' | 'STUDENT' | 'INSTRUCTOR';

export interface AuthUser {
  userId: string;
  email: string;
  role: Role;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

/** GET /api/areas */
export interface Area {
  id: string;
  name: string;
  _count?: { locations: number };
}

/** GET /api/areas/:id */
export interface AreaDetail {
  id: string;
  name: string;
  locations: Location[];
}

/** GET /api/locations/public, /api/locations, /api/locations/:id */
export interface Location {
  id: string;
  name: string;
  category?: string | null;
  mapUrl?: string | null;
  areaId?: string;
  areaName?: string;
  regularPrice?: number;
}

/** GET /api/packages */
export interface LessonPackage {
  id: string;
  locationId: string;
  type: string;
  price: number;
}

/** GET /api/sessions?locationId&dayOfWeek */
export interface SessionSlot {
  id: string;
  dayOfWeek: string;
  sessionName: string;
  startTime: string;
  endTime: string;
  locationId: string | null;
}

/** GET /api/instructor/available */
export interface AvailableInstructor {
  instructorId: string;
  fullName: string;
  profilePictureUrl?: string | null;
  experience?: string | null;
  license?: string | null;
  currentStudentCount: number;
  maxCapacity: number;
}

export type Gender = 'Laki-Laki' | 'Perempuan';
export type ShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
/** Label UI; dikonversi ke nilai API lewat paymentMethodToApi(). */
export type PaymentMethod = 'QRIS' | 'Transfer Bank' | 'Cash';
export type PaymentMethodApi = 'QRIS' | 'BANK_TRANSFER' | 'CASH';

/** POST /api/register/student */
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
  dayOfWeek: string;
  sessionName: string;
}

/** POST /api/register/instructor */
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

/** Simpanan lokal setelah submit pendaftaran: API tidak menyediakan endpoint baca status pendaftaran. */
export interface StudentRegistrationSnapshot extends StudentRegistrationPayload {
  kind: 'student';
  registrationId: string;
  status: string;
  submittedAt: number;
  locationLabel: string;
  packageType: string;
  packagePrice: number;
  instructorName: string;
  photoFileName?: string;
  /** Catatan bila server tidak mengembalikan URL berkas unggahan. */
  uploadNotice?: string;
}

export interface InstructorRegistrationSnapshot extends InstructorRegistrationPayload {
  kind: 'instructor';
  registrationId: string;
  status: string;
  submittedAt: number;
  scheduleLabels: string[];
  /** Catatan bila server tidak mengembalikan URL berkas unggahan. */
  uploadNotice?: string;
}

export type RegistrationSnapshot =
  | StudentRegistrationSnapshot
  | InstructorRegistrationSnapshot;

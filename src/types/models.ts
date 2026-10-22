// Tipe data model dan master data dari REST API PT Tirya Lumba.

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
  fullName: string;
  profilePictureUrl?: string | null;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

export interface Area {
  id: string;
  name: string;
  _count?: { locations: number };
}

export interface AreaDetail {
  id: string;
  name: string;
  locations: Location[];
}

export interface Location {
  id: string;
  name: string;
  category?: string | null;
  mapUrl?: string | null;
  areaId?: string;
  areaName?: string;
  regularPrice?: number;
}

export interface PackageLocation {
  id?: string;
  name: string;
  category?: string | null;
  mapUrl?: string | null;
  area?: { id?: string; name: string } | null;
}

export interface LessonPackage {
  id: string;
  locationId?: string;
  type?: string;
  price: number;
  location?: PackageLocation | null;
}

export interface SessionSlot {
  id: string;
  dayOfWeek: string;
  sessionName: string;
  startTime: string;
  endTime: string;
  locationId: string | null;
}

export interface AvailableInstructor {
  instructorId: string;
  fullName: string;
  profilePictureUrl?: string | null;
  experience?: string | null;
  license?: string | null;
  currentStudentCount: number;
  maxCapacity: number;
}

export interface ProgramCatalogItem {
  id: string;
  type?: string;
  price: number;
  poolName: string;
  areaName: string | null;
  mapUrl: string | null;
  category: string | null;
}

export type Gender = 'Laki-Laki' | 'Perempuan';
export type ShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type PaymentMethod = 'QRIS' | 'Transfer Bank' | 'Cash';
export type PaymentMethodApi = 'QRIS' | 'BANK_TRANSFER' | 'CASH';

// Klien REST API PT Tirya Lumba. Semua endpoint dan bentuk payload mengikuti
// API_DOCUMENTATION.md. Server hanya dipakai oleh projek landing page ini:
// auth, master area/kolam/paket/sesi, ketersediaan instruktur, unggah berkas,
// dan submit pendaftaran murid/guru.
import {
  ApiResponse,
  Area,
  AreaDetail,
  AvailableInstructor,
  InstructorRegistrationPayload,
  LessonPackage,
  Location,
  LoginResult,
  RegistrationResult,
  SessionSlot,
  StudentRegistrationPayload,
} from '@/types';
import { getToken } from './session-store';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/** Alamat berkas statis (tanpa /api) untuk merender URL dari server. */
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  /** Cache revalidate (detik) untuk fetch publik di server component. */
  revalidate?: number;
  tag?: string;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { body, revalidate, tag, headers, ...init } = options;
  const isForm = body instanceof FormData;
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    body: isForm ? body : body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(isForm || body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(revalidate !== undefined
      ? { next: { revalidate, ...(tag ? { tags: [tag] } : {}) } }
      : {}),
  });

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!res.ok || !json || json.success === false) {
    throw new ApiError(
      json?.message || `Permintaan ke server gagal (HTTP ${res.status}).`,
      res.status,
    );
  }

  return json;
}

/** Ubah error apa pun menjadi pesan siap tampil ke pengguna. */
export function toErrorMessage(error: unknown): string {
  // Server menjawab dengan pesan validasi → teruskan pesannya apa adanya.
  if (error instanceof ApiError) return error.message;
  // Sisanya berarti permintaan tidak pernah sampai ke API (fetch gagal/timeout).
  return 'Tidak dapat menghubungi server. Periksa koneksi Anda lalu coba lagi.';
}

/**
 * Jalankan permintaan server-side tanpa membuat render gagal.
 * Dipakai saat prerender: bila server API sedang mati, halaman tetap tampil.
 */
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error('[api] permintaan gagal:', error);
    return fallback;
  }
}

/* ------------------------------------------------------------------ */
/* Modul Auth                                                          */
/* ------------------------------------------------------------------ */

export async function registerAccount(input: {
  fullName: string;
  email: string;
  password: string;
}): Promise<string> {
  const res = await request<string>('/auth/register', { method: 'POST', body: input });
  return res.data;
}

export async function verifyOtp(input: { email: string; otpCode: string }): Promise<void> {
  await request<unknown>('/auth/verify-otp', { method: 'POST', body: input });
}

export async function loginAccount(input: {
  email: string;
  password: string;
}): Promise<LoginResult> {
  const res = await request<LoginResult>('/auth/login', { method: 'POST', body: input });
  return res.data;
}

/* ------------------------------------------------------------------ */
/* Modul master data publik                                            */
/* ------------------------------------------------------------------ */

export async function getAreas(): Promise<Area[]> {
  const res = await request<Area[]>('/areas', { method: 'GET', revalidate: 3600, tag: 'areas' });
  return res.data;
}

export async function getAreaDetail(id: string): Promise<AreaDetail> {
  const res = await request<AreaDetail>(`/areas/${id}`, {
    method: 'GET',
    revalidate: 3600,
    tag: 'areas',
  });
  return res.data;
}

export async function getAllLocations(): Promise<Location[]> {
  const res = await request<Location[]>('/locations', {
    method: 'GET',
    revalidate: 3600,
    tag: 'locations',
  });
  return res.data;
}

export async function getPackages(): Promise<LessonPackage[]> {
  const res = await request<LessonPackage[]>('/packages', {
    method: 'GET',
    revalidate: 3600,
    tag: 'packages',
  });
  return res.data;
}
 
/** Sesi jam operasional untuk satu kolam pada hari tertentu (GET /api/sessions). */
export async function getSessions(locationId: string, dayOfWeek: string): Promise<SessionSlot[]> {
  const query = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${query}`, { method: 'GET' });
  return res.data;
}

/** Guru yang tersedia untuk lokasi, hari, sesi, dan tipe paket tertentu. */
export async function getAvailableInstructors(input: {
  locationId: string;
  dayOfWeek: string;
  sessionName: string;
  packageType?: 'REGULER' | 'PRIVAT';
}): Promise<AvailableInstructor[]> {
  const query = new URLSearchParams({
    locationId: input.locationId,
    dayOfWeek: input.dayOfWeek,
    sessionName: input.sessionName,
    ...(input.packageType ? { packageType: input.packageType } : {}),
  });
  const res = await request<AvailableInstructor[]>(`/instructor/available?${query}`, {
    method: 'GET',
  });
  return res.data;
}

/* ------------------------------------------------------------------ */
/* Modul unggah berkas (multipart/form-data)                           */
/* ------------------------------------------------------------------ */

interface UploadResult {
  profilePictureUrl?: string;
  cvUrl?: string;
}

/** Hasil unggah; `urlReported=false` berarti server hanya membalas pesan sukses (lihat catatan di bawah). */
export interface UploadOutcome {
  url: string;
  urlReported: boolean;
}

// shortcut: dokumen API untuk /student/payment dan /instructor hanya membalas
// { success, message } tanpa URL berkas, sedangkan submit pendaftaran mewajibkan
// paymentProofUrl/cvUrl/profilePictureUrl. Bila backend tidak mengirim URL,
// form tetap boleh dikirim tapi pengguna diberi tahu untuk mengirim berkas via CS.

export async function uploadStudentPhoto(file: File): Promise<UploadOutcome> {
  const form = new FormData();
  form.append('profilePicture', file);
  const res = await request<UploadResult>('/upload-file/student/profil', {
    method: 'POST',
    body: form,
  });
  const url = res.data?.profilePictureUrl ?? '';
  return { url, urlReported: Boolean(url) };
}

export async function uploadPaymentProof(file: File): Promise<UploadOutcome> {
  const form = new FormData();
  form.append('profilePicture', file);
  const res = await request<UploadResult>('/upload-file/student/payment', {
    method: 'POST',
    body: form,
  });
  const url = res.data?.profilePictureUrl ?? '';
  return { url, urlReported: Boolean(url) };
}

export async function uploadInstructorFiles(input: {
  cv: File;
  profilePicture: File;
  paymentProof?: File | null;
}): Promise<{ cv: UploadOutcome; profilePicture: UploadOutcome }> {
  const form = new FormData();
  form.append('cv', input.cv);
  form.append('profilePicture', input.profilePicture);
  if (input.paymentProof) form.append('paymentProof', input.paymentProof);

  const res = await request<UploadResult>('/upload-file/instructor', {
    method: 'POST',
    body: form,
  });

  const cvUrl = res.data?.cvUrl ?? '';
  const profilePictureUrl = res.data?.profilePictureUrl ?? '';
  return {
    cv: { url: cvUrl, urlReported: Boolean(cvUrl) },
    profilePicture: { url: profilePictureUrl, urlReported: Boolean(profilePictureUrl) },
  };
}

/* ------------------------------------------------------------------ */
/* Modul pendaftaran (butuh Bearer token)                              */
/* ------------------------------------------------------------------ */

export async function registerStudent(
  payload: StudentRegistrationPayload,
): Promise<RegistrationResult> {
  const res = await request<RegistrationResult>('/register/student', {
    method: 'POST',
    body: payload,
  });
  return res.data;
}

export async function registerInstructor(
  payload: InstructorRegistrationPayload,
): Promise<RegistrationResult> {
  const res = await request<RegistrationResult>('/register/instructor', {
    method: 'POST',
    body: payload,
  });
  return res.data;
}

/* ------------------------------------------------------------------ */
/* Util                                                                */
/* ------------------------------------------------------------------ */

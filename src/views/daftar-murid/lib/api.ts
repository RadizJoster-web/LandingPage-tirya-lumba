import {
  Area,
  AvailableInstructor,
  LessonPackage,
  Location,
  RegistrationResult,
  SessionSlot,
  StudentRegistrationPayload,
} from '@/types';
import { request } from '@/lib/http';

export async function fetchMaster() {
  const [a, l, p] = await Promise.all([
    request<Area[]>('/areas', {
      method: 'GET',
      revalidate: 3600,
      tags: ['areas'],
    }),
    request<Location[]>('/locations', {
      method: 'GET',
      revalidate: 3600,
      tags: ['locations'],
    }),
    request<LessonPackage[]>('/packages', {
      method: 'GET',
      revalidate: 3600,
      tags: ['packages'],
    }),
  ]);
  return {
    areas: a.data ?? [],
    locations: l.data ?? [],
    packages: p.data ?? [],
  };
}

export async function fetchSessions(locationId: string, dayOfWeek: string) {
  const q = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${q}`, {
    method: 'GET',
    revalidate: 0,
  });
  return res.data ?? [];
}

export async function fetchInstructors(p: {
  locationId: string;
  dayOfWeek: string;
  sessionName: string;
  packageType?: 'REGULER' | 'PRIVAT';
}) {
  const q = new URLSearchParams({
    locationId: p.locationId,
    dayOfWeek: p.dayOfWeek,
    sessionName: p.sessionName,
    ...(p.packageType ? { packageType: p.packageType } : {}),
  });
  // Tier 2: Real-time high-contention data (Wajib no-store)
  const res = await request<AvailableInstructor[]>(
    `/instructor/available?${q}`,
    { method: 'GET', cache: 'no-store' },
  );
  return res.data ?? [];
}

export async function uploadStudentPhoto(file: File) {
  const form = new FormData();
  form.append('profilePicture', file);
  const res = await request<{ profilePictureUrl?: string }>(
    '/upload-file/student/profile',
    { method: 'POST', body: form },
  );
  const url = res.data?.profilePictureUrl ?? '';
  return { url, urlReported: Boolean(url) };
}

export async function uploadPaymentProof(file: File) {
  const form = new FormData();
  form.append('paymentProof', file);
  form.append('profilePicture', file);
  const res = await request<{ paymentProofUrl?: string; profilePictureUrl?: string }>(
    '/upload-file/student/payment',
    { method: 'POST', body: form },
  );
  const url = res.data?.paymentProofUrl ?? res.data?.profilePictureUrl ?? '';
  return { url, urlReported: Boolean(url) };
}

export async function submitStudent(payload: StudentRegistrationPayload) {
  const res = await request<RegistrationResult>('/register/student', {
    method: 'POST',
    body: payload,
  });
  return res.data;
}

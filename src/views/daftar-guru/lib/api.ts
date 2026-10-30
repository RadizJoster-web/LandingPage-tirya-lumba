import {
  Area,
  InstructorRegistrationPayload,
  Location,
  RegistrationResult,
  SessionSlot,
} from '@/types';
import { ApiError, request } from '@/lib/http';

export async function fetchMasterData(): Promise<{
  areas: Area[];
  locations: Location[];
}> {
  const [a, l] = await Promise.all([
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
  ]);
  return { areas: a.data ?? [], locations: l.data ?? [] };
}

export async function fetchSessions(
  locationId: string,
  dayOfWeek?: string,
): Promise<SessionSlot[]> {
  const query = new URLSearchParams({ locationId });
  if (dayOfWeek) query.set('dayOfWeek', dayOfWeek);
  const res = await request<SessionSlot[]>(`/sessions?${query}`, {
    method: 'GET',
    revalidate: 0,
  });
  return res.data ?? [];
}

export async function uploadCv(file: File): Promise<string> {
  const form = new FormData();
  form.append('cv', file);

  const res = await request<{ cvUrl?: string }>('/upload-file/instructor/cv', {
    method: 'POST',
    body: form,
  });

  if (!res.data?.cvUrl)
    throw new ApiError('Server tidak mengembalikan URL CV.', 200);

  return res.data.cvUrl;
}

export async function uploadProfilePicture(file: File): Promise<string> {
  const form = new FormData();
  form.append('profilePicture', file);

  const res = await request<{ profilePictureUrl?: string }>(
    '/upload-file/instructor/profile',
    { method: 'POST', body: form },
  );

  if (!res.data?.profilePictureUrl)
    throw new ApiError('Server tidak mengembalikan URL foto profil.', 200);

  return res.data.profilePictureUrl;
}

export async function submitInstructor(
  payload: InstructorRegistrationPayload,
): Promise<RegistrationResult> {
  const res = await request<RegistrationResult>('/register/instructor', {
    method: 'POST',
    body: payload,
  });
  return res.data;
}

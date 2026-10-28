import { Area, Location, SessionSlot } from '@/types';
import { request } from '@/lib/http';
import { RescheduleStatusData } from '../types';

export async function fetchMasterData(): Promise<{ areas: Area[]; locations: Location[] }> {
  const [a, l] = await Promise.all([
    request<Area[]>('/areas', { method: 'GET', revalidate: 3600, tags: ['areas'] }),
    request<Location[]>('/locations', { method: 'GET', revalidate: 3600, tags: ['locations'] }),
  ]);
  return { areas: a.data, locations: l.data };
}

export async function fetchSessions(locationId: string, dayOfWeek: string): Promise<SessionSlot[]> {
  const query = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${query}`, {
    method: 'GET',
    revalidate: 3600,
    tags: ['sessions'],
  });
  return res.data;
}

export async function fetchRescheduleStatus(): Promise<RescheduleStatusData> {
  // Tier 2: Real-time high-contention status token pelatih (Wajib no-store)
  const res = await request<RescheduleStatusData>('/instructors/reschedule/status', {
    method: 'GET',
    cache: 'no-store',
  });
  return res.data;
}

export async function submitReschedule(schedules: Array<{ locationId: string; dayOfWeek: string; sessionName: string }>) {
  const res = await request('/instructors/reschedule', {
    method: 'POST',
    body: { schedules },
  });
  return res.data;
}

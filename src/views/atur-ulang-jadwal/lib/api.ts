import { Area, Location, SessionSlot } from '@/types';
import { request } from '@/lib/http';
import { RescheduleStatusData } from '../types';

export async function fetchMasterData(): Promise<{ areas: Area[]; locations: Location[] }> {
  const [a, l] = await Promise.all([
    request<Area[]>('/areas', { method: 'GET' }),
    request<Location[]>('/locations', { method: 'GET' }),
  ]);
  return { areas: a.data, locations: l.data };
}

export async function fetchSessions(locationId: string, dayOfWeek: string): Promise<SessionSlot[]> {
  const query = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${query}`, { method: 'GET' });
  return res.data;
}

export async function fetchRescheduleStatus(): Promise<RescheduleStatusData> {
  const res = await request<RescheduleStatusData>('/instructors/reschedule/status', { method: 'GET' });
  return res.data;
}

export async function submitReschedule(schedules: Array<{ locationId: string; dayOfWeek: string; sessionName: string }>) {
  const res = await request('/instructors/reschedule', {
    method: 'POST',
    body: { schedules },
  });
  return res.data;
}

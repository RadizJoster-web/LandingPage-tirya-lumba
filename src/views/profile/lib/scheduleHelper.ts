import { InstructorScheduleInput } from '@/types';
import { getSessionTime } from '@/lib/utils';

export interface NormalizedScheduleItem {
  dayOfWeek: string;
  sessionName: string;
  locationName: string;
  timeRange: string;
  startTime?: string;
  endTime?: string;
  totalStudents?: number;
}

export const DAYS_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export function normalizeInstructorSchedules(
  schedules: InstructorScheduleInput[] = [],
  scheduleLabels: string[] = [],
): NormalizedScheduleItem[] {
  if (schedules && schedules.length > 0) {
    return schedules.map((s) => {
      let timeRange = s.timeRange || '';
      if (!timeRange && s.startTime && s.endTime) {
        timeRange = `${s.startTime.replace(':', '.')} - ${s.endTime.replace(':', '.')}`;
      }
      if (!timeRange) {
        timeRange = getSessionTime(s.sessionName, s.startTime, s.endTime);
      }

      return {
        dayOfWeek: s.dayOfWeek || 'Lainnya',
        sessionName: s.sessionName || 'Sesi',
        locationName: s.locationName || 'Kolam Renang',
        timeRange,
        startTime: s.startTime,
        endTime: s.endTime,
        totalStudents: s.totalStudents ?? 0,
      };
    });
  }

  return scheduleLabels.map((label) => {
    const [poolPart, rest] = label.split('—').map((t) => t.trim());
    const locationName = poolPart || 'Kolam Renang';
    let dayOfWeek = 'Sabtu';
    let sessionName = 'Sesi';
    let timeRange = '';

    if (rest) {
      const timeMatch = rest.match(/\(([^)]+)\)/);
      if (timeMatch) timeRange = timeMatch[1].trim();
      const cleanRest = rest.replace(/\([^)]+\)/, '').trim();
      const parts = cleanRest.split(',').map((p) => p.trim());
      if (parts[0]) dayOfWeek = parts[0];
      if (parts[1]) sessionName = parts[1];
    }

    if (!timeRange) timeRange = getSessionTime(sessionName);

    return {
      dayOfWeek,
      sessionName,
      locationName,
      timeRange,
    };
  });
}

export function groupSchedulesByDay(items: NormalizedScheduleItem[]) {
  const map = new Map<string, NormalizedScheduleItem[]>();

  for (const item of items) {
    const dayKey =
      item.dayOfWeek.charAt(0).toUpperCase() + item.dayOfWeek.slice(1).toLowerCase();

    if (!map.has(dayKey)) map.set(dayKey, []);
    map.get(dayKey)!.push(item);
  }

  const sortedDays = Array.from(map.keys()).sort((a, b) => {
    const idxA = DAYS_ORDER.indexOf(a);
    const idxB = DAYS_ORDER.indexOf(b);
    if (idxA === -1 && idxB === -1) return a.localeCompare(b);
    if (idxA === -1) return 1;
    if (idxB === -1) return -1;
    return idxA - idxB;
  });

  return sortedDays.map((day) => ({
    day,
    items: map.get(day)!,
  }));
}

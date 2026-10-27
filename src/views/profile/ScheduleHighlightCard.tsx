import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { InstructorScheduleInput } from '@/types';
import { formatSessionWithTime, getSessionTime } from '@/lib/utils';
import { Calendar, Clock, MapPin, Users, Settings } from 'lucide-react';

interface ScheduleHighlightCardProps {
  schedules?: InstructorScheduleInput[];
  scheduleLabels?: string[];
}

interface NormalizedScheduleItem {
  dayOfWeek: string;
  sessionName: string;
  locationName: string;
  timeRange: string;
  startTime?: string;
  endTime?: string;
  totalStudents?: number;
}

const DAYS_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const ScheduleHighlightCard: React.FC<ScheduleHighlightCardProps> = ({
  schedules = [],
  scheduleLabels = [],
}) => {
  const normalizedItems: NormalizedScheduleItem[] = React.useMemo(() => {
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
        if (timeMatch) {
          timeRange = timeMatch[1].trim();
        }
        const cleanRest = rest.replace(/\([^)]+\)/, '').trim();
        const parts = cleanRest.split(',').map((p) => p.trim());
        if (parts[0]) dayOfWeek = parts[0];
        if (parts[1]) sessionName = parts[1];
      }

      if (!timeRange) {
        timeRange = getSessionTime(sessionName);
      }

      return {
        dayOfWeek,
        sessionName,
        locationName,
        timeRange,
      };
    });
  }, [schedules, scheduleLabels]);

  const groupedByDay = React.useMemo(() => {
    const map = new Map<string, NormalizedScheduleItem[]>();

    for (const item of normalizedItems) {
      const dayKey =
        item.dayOfWeek.charAt(0).toUpperCase() + item.dayOfWeek.slice(1).toLowerCase();

      if (!map.has(dayKey)) {
        map.set(dayKey, []);
      }
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
  }, [normalizedItems]);

  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
            Jadwal Mengajar Instruktur
          </span>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1D3557] dark:text-slate-100">
            Jadwal &amp; Sesi Mengajar Aktif
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Total {normalizedItems.length} sesi ketersediaan mengajar terdaftar di sistem
          </p>
        </div>

        <Link href="/guru/atur-ulang-jadwal" className="shrink-0">
          <Button
            variant="outline"
            size="sm"
            isFullRounded={false}
            className="flex items-center gap-1.5 border-slate-300 text-[#0077B6] hover:bg-[#E0FBFC]/50"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Atur Ulang Jadwal</span>
          </Button>
        </Link>
      </div>

      {groupedByDay.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-600">
            Belum ada jadwal mengajar yang terdaftar
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groupedByDay.map(({ day, items }) => (
            <div
              key={day}
              className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 space-y-3 dark:bg-slate-800/40 dark:border-slate-800"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700">
                <span className="font-heading font-bold text-sm text-[#0077B6] dark:text-sky-300">
                  {day}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {items.length} Sesi
                </span>
              </div>

              <div className="space-y-2">
                {items.map((slot, idx) => {
                  const formattedSession = formatSessionWithTime(
                    slot.sessionName,
                    slot.timeRange,
                    slot.startTime,
                    slot.endTime,
                  );
                  const sessionTime = getSessionTime(
                    slot.sessionName,
                    slot.startTime,
                    slot.endTime,
                    slot.timeRange,
                  );

                  return (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-lg border border-slate-200/60 shadow-2xs space-y-1.5 dark:bg-slate-900 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#1D3557] dark:text-slate-200">
                          {formattedSession}
                        </span>
                        {/* Crisp numeric pill badge for totalStudents */}
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <Users className="w-3 h-3" />
                          <span>{slot.totalStudents ?? 0} Murid</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 text-[#0077B6]" />
                        <span>Pukul {sessionTime} WIB</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium truncate">
                        <MapPin className="w-3 h-3 text-[#0077B6]" />
                        <span className="truncate">{slot.locationName}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

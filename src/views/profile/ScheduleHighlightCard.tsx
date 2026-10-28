import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { InstructorScheduleInput } from '@/types';
import { Calendar, Settings } from 'lucide-react';
import {
  normalizeInstructorSchedules,
  groupSchedulesByDay,
} from './lib/scheduleHelper';
import { InstructorDayScheduleCard } from './InstructorDayScheduleCard';

interface ScheduleHighlightCardProps {
  schedules?: InstructorScheduleInput[];
  scheduleLabels?: string[];
}

export const ScheduleHighlightCard: React.FC<ScheduleHighlightCardProps> = ({
  schedules = [],
  scheduleLabels = [],
}) => {
  const normalizedItems = React.useMemo(
    () => normalizeInstructorSchedules(schedules, scheduleLabels),
    [schedules, scheduleLabels],
  );

  const groupedByDay = React.useMemo(
    () => groupSchedulesByDay(normalizedItems),
    [normalizedItems],
  );

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
            <InstructorDayScheduleCard key={day} day={day} items={items} />
          ))}
        </div>
      )}
    </section>
  );
};

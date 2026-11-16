import React from 'react';
import Link from 'next/link';
import { Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { InstructorRegistrationSnapshot } from '@/types';
import { groupSchedulesByDay, normalizeInstructorSchedules } from './lib/scheduleHelper';

interface TeacherScheduleCardProps {
  snapshot: InstructorRegistrationSnapshot;
}

export const TeacherScheduleCard: React.FC<TeacherScheduleCardProps> = ({ snapshot }) => {
  const normalized = normalizeInstructorSchedules(snapshot.schedules, snapshot.scheduleLabels);
  const groupedDays = groupSchedulesByDay(normalized);

  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
            Jadwal Mengajar
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Daftar sesi ajar aktif Anda di seluruh kolam mitra
          </p>
        </div>
        <Link href="/guru/atur-ulang-jadwal">
          <Button
            variant="outline"
            size="sm"
            isFullRounded={false}
            className="flex items-center gap-1.5 text-xs text-[#0077B6] border-[#00B4D8]/40 hover:bg-[#E0FBFC]/30"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Atur Jadwal</span>
          </Button>
        </Link>
      </div>

      {groupedDays.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-400">
          Belum ada jadwal mengajar yang terdaftar.
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-slate-800">
          {groupedDays.map(({ day, items }) => (
            <div key={day} className="py-3 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 text-xs">
              <div className="sm:w-24 shrink-0 font-bold text-sm text-[#1D3557] dark:text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00B4D8]" />
                <span>{day}</span>
              </div>

              <div className="flex-1 space-y-2">
                {items.map((slot, sIdx) => {
                  const count = slot.totalStudents ?? 0;
                  const isFull = count >= 4;
                  return (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-slate-50/70 dark:bg-slate-800/60 dark:border-slate-700"
                    >
                      <div className="space-x-2">
                        <span className="font-semibold text-[#1D3557] dark:text-slate-200">
                          {slot.timeRange}
                        </span>
                        <span className="text-slate-400">• {slot.locationName}</span>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isFull
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {count}/4 murid {isFull ? '(Penuh)' : ''}
                      </span>
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

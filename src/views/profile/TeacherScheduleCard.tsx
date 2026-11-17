import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Settings, Users } from 'lucide-react';
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
    <section className="space-y-4">
      {/* Header Bagian Jadwal Mengajar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
            Jadwal Mengajar
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Daftar sesi ajar aktif Anda yang dikelompokkan per hari
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
        <div className="rounded-2xl border border-gray-200/90 bg-white p-8 text-center text-xs text-slate-400 dark:bg-slate-900 dark:border-slate-800">
          Belum ada jadwal mengajar yang terdaftar.
        </div>
      ) : (
        <div className="space-y-3.5">
          {groupedDays.map(({ day, items }) => (
            <div
              key={day}
              className="rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-3"
            >
              {/* Header Kartu Hari */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E0FBFC] text-[#0077B6] font-bold text-xs dark:bg-slate-800 dark:text-[#00B4D8]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{day}</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400">
                  {items.length} Sesi Latihan
                </span>
              </div>

              {/* Daftar Sesi dalam Hari Tersebut */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {items.map((slot, sIdx) => {
                  const studentCount = slot.totalStudents ?? 0;
                  return (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl border border-gray-100 bg-slate-50/70 dark:bg-slate-800/50 dark:border-slate-700/60 flex flex-col justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D3557] dark:text-slate-100">
                          <Clock className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
                          <span>{slot.sessionName}</span>
                          {slot.timeRange && (
                            <span className="font-normal text-slate-400">({slot.timeRange})</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{slot.locationName}</span>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between border-t border-gray-100 dark:border-slate-700/60 text-[11px]">
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Users className="w-3 h-3 text-slate-400" />
                          <span>Murid Aktif:</span>
                        </span>
                        <span className="font-semibold text-[#0077B6] dark:text-[#00B4D8]">
                          {studentCount > 0 ? `${studentCount} Murid` : '0 Murid'}
                        </span>
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

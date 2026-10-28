import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { formatSessionWithTime, getSessionTime } from '@/lib/utils';
import { NormalizedScheduleItem } from './lib/scheduleHelper';

interface InstructorDayScheduleCardProps {
  day: string;
  items: NormalizedScheduleItem[];
}

export const InstructorDayScheduleCard: React.FC<InstructorDayScheduleCardProps> = ({
  day,
  items,
}) => {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 space-y-3 dark:bg-slate-800/40 dark:border-slate-800">
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
  );
};

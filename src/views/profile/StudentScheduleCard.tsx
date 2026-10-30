import React from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import {
  formatDateId,
  dayNameFromDate,
  getSessionTime,
} from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { ScheduleChecklistGuide } from './ScheduleChecklistGuide';

interface StudentScheduleCardProps {
  snapshot: StudentRegistrationSnapshot;
}

export const StudentScheduleCard: React.FC<StudentScheduleCardProps> = ({
  snapshot,
}) => {
  const dateStr = snapshot.firstMeetDate || '';
  const dayName = dateStr ? dayNameFromDate(dateStr) : 'Hari Latihan';
  const formattedDate = dateStr ? formatDateId(dateStr) : '-';
  const sessionName = snapshot.firstMeetSession || 'Sesi Latihan';
  const sessionTimeStr = getSessionTime(
    sessionName,
    snapshot.startTime,
    snapshot.endTime,
    snapshot.timeRange,
  );

  const poolName = snapshot.locationLabel
    ? snapshot.locationLabel.toLowerCase().startsWith('kolam')
      ? snapshot.locationLabel
      : `Kolam Renang ${snapshot.locationLabel}`
    : 'Kolam Mitra Tirya Lumba';

  const activeSessions = snapshot.activeSessions ?? 0;

  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Jadwal Latihan Kesiswaan
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1D3557] dark:text-slate-100">
            Jadwal &amp; Sesi Aktif
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Konfirmasi jadwal pertemuan resmi Anda bersama instruktur
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 sm:min-w-[160px] dark:bg-slate-800/60 dark:border-slate-700">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Sisa Pertemuan
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tabular-nums">
              {activeSessions}
            </span>
            <span className="text-xs font-semibold text-slate-500">Sesi</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-100 space-y-1.5 dark:bg-slate-800/40 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold tracking-wider">
            <Calendar className="w-4 h-4 text-[#0077B6]" />
            <span>Hari Latihan</span>
          </div>
          <p className="font-heading font-bold text-base text-[#1D3557] dark:text-slate-100">
            {dayName}
          </p>
          <p className="text-xs text-slate-500 truncate">{formattedDate}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-100 space-y-1.5 dark:bg-slate-800/40 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold tracking-wider">
            <Clock className="w-4 h-4 text-[#0077B6]" />
            <span>Jam Sesi</span>
          </div>
          <p className="font-heading font-bold text-base text-[#1D3557] dark:text-slate-100">
            {sessionName}
          </p>
          <p className="text-xs text-slate-500">Pukul {sessionTimeStr} WIB</p>
        </div>

        <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-100 space-y-1.5 dark:bg-slate-800/40 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-semibold tracking-wider">
            <MapPin className="w-4 h-4 text-[#0077B6]" />
            <span>Lokasi Kolam</span>
          </div>
          <p className="font-heading font-bold text-base text-[#1D3557] dark:text-slate-100 truncate">
            {poolName}
          </p>
          <Badge variant="azure" size="sm">
            {snapshot.packageType || 'Reguler'}
          </Badge>
        </div>
      </div>

      <ScheduleChecklistGuide />
    </section>
  );
};

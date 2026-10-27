import React, { useState } from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import { formatDateId, dayNameFromDate, formatSessionWithTime, getSessionTime } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, MapPin, ChevronDown, CheckCircle2 } from 'lucide-react';

interface StudentScheduleCardProps {
  snapshot: StudentRegistrationSnapshot;
}

export const StudentScheduleCard: React.FC<StudentScheduleCardProps> = ({
  snapshot,
}) => {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const dateStr = snapshot.firstMeetDate || '';
  const dayName = dateStr ? dayNameFromDate(dateStr) : 'Hari Latihan';
  const formattedDate = dateStr ? formatDateId(dateStr) : '-';
  const sessionName = snapshot.firstMeetSession || 'Sesi Latihan';
  const formattedSession = formatSessionWithTime(
    sessionName,
    snapshot.timeRange,
    snapshot.startTime,
    snapshot.endTime,
  );
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
      {/* Top Header Row with Hero Metric for Active Sessions */}
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

        {/* Hero Metric: Large Bold Active Sessions */}
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

      {/* Primary Training Info Grid: Day, Time, Pool Location */}
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
            {formattedSession}
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

      {/* Collapsible Clean Preparation Checklist */}
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 overflow-hidden dark:bg-slate-900/40 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setIsChecklistOpen(!isChecklistOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-[#1D3557] hover:bg-slate-100/60 transition-colors dark:text-slate-200 dark:hover:bg-slate-800/60"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0077B6]" />
            Panduan &amp; Persiapan Kehadiran Latihan
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isChecklistOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isChecklistOpen && (
          <div className="px-4 pb-4 pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-2 dark:border-slate-800 dark:text-slate-300 animate-fade-in">
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#0077B6]">&gt;</span>
              <span>Hadir minimal <strong>15 menit lebih awal</strong> sebelum jam sesi untuk pemanasan otot dan absensi.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#0077B6]">&gt;</span>
              <span>Wajib mengenakan <strong>pakaian renang standar</strong> dan membawa kacamata renang pribadi.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#0077B6]">&gt;</span>
              <span>Jika berhalangan hadir, harap berikan konfirmasi minimal <strong>24 jam</strong> sebelumnya ke admin atau instruktur.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#0077B6]">&gt;</span>
              <span>Tunjukkan kartu / status di profil ini kepada pengawas kolam saat registrasi kehadiran.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

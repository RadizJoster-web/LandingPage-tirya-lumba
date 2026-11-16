import React from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import { formatRupiah, getSessionTime } from '@/lib/utils';
import { StudentSessionProgress } from './StudentSessionProgress';
import { StudentCoachPanel } from './StudentCoachPanel';
import { StudentAttendanceHistoryCard } from './StudentAttendanceHistoryCard';
import { StudentPersonalDataCard } from './StudentPersonalDataCard';

interface StudentContentViewProps {
  snapshot: StudentRegistrationSnapshot;
  email: string;
}

export const StudentContentView: React.FC<StudentContentViewProps> = ({ snapshot, email }) => {
  const isApproved = snapshot.status === 'APPROVED';
  const activeSessions = snapshot.activeSessions ?? 0;
  const timeStr = snapshot.timeRange || getSessionTime(snapshot.firstMeetSession, snapshot.startTime, snapshot.endTime);

  return (
    <div className="space-y-5 flex-1">
      {/* Kartu 1: Program Kursus */}
      <section className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-5">
        <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
          Program Kursus
        </h2>

        {/* Ringkasan Sesi */}
        <StudentSessionProgress
          activeSessions={activeSessions}
          totalSessions={snapshot.packagePrice ? 4 : 4}
        />

        {/* Rincian Label-Nilai */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
          <div>
            <span className="block text-[11px] font-medium text-slate-400">Paket Kursus</span>
            <span className="font-semibold text-[#1D3557] dark:text-slate-200 text-sm mt-0.5 block">
              Paket {snapshot.packageType || 'Reguler'}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-medium text-slate-400">Biaya Kursus</span>
            <span className="font-semibold text-[#1D3557] dark:text-slate-200 text-sm mt-0.5 block tabular-nums">
              {formatRupiah(snapshot.packagePrice)}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-medium text-slate-400">Jadwal Rutin</span>
            <span className="font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5 block">
              {snapshot.firstMeetSession} {timeStr ? `(${timeStr})` : ''}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-medium text-slate-400">Kolam Latihan</span>
            <span className="font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5 block truncate">
              {snapshot.locationLabel || 'Kolam Mitra'}
            </span>
          </div>
        </div>

        {/* Panel Buka/Tutup Profil Pelatih */}
        <StudentCoachPanel snapshot={snapshot} />
      </section>

      {/* Kartu 2: Riwayat Latihan */}
      <StudentAttendanceHistoryCard isApproved={isApproved} />

      {/* Kartu 3: Data Diri */}
      <StudentPersonalDataCard snapshot={snapshot} email={email} />
    </div>
  );
};

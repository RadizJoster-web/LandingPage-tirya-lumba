import React, { useEffect, useState } from 'react';
import { request, toErrorMessage } from '@/lib/http';
import { formatDateId } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, History } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  locationName: string;
  status: string;
}

interface StudentAttendanceHistoryCardProps {
  isApproved: boolean;
}

export const StudentAttendanceHistoryCard: React.FC<StudentAttendanceHistoryCardProps> = ({
  isApproved,
}) => {
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(isApproved);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isApproved) return;
    let active = true;

    request<AttendanceRecord[]>('/attendances/my-history', { method: 'GET' })
      .then((res) => {
        if (active) setAttendances(res.data ?? []);
      })
      .catch((err) => {
        if (active) setErrorMsg(toErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [isApproved]);

  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
        <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
          Riwayat Latihan
        </h2>
        {isApproved && attendances.length > 0 && (
          <span className="text-xs font-semibold text-[#0077B6] bg-[#E0FBFC] px-2.5 py-0.5 rounded-full dark:bg-slate-800 dark:text-[#00B4D8]">
            {attendances.length} Pertemuan
          </span>
        )}
      </div>

      {!isApproved ? (
        <p className="text-xs text-slate-500 italic py-2">
          Riwayat latihan dan absensi akan tercatat otomatis setelah pendaftaran Anda diverifikasi dan aktif.
        </p>
      ) : loading ? (
        <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="w-3.5 h-3.5 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
          <span>Memuat riwayat pertemuan...</span>
        </div>
      ) : errorMsg ? (
        <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl">{errorMsg}</p>
      ) : attendances.length === 0 ? (
        <div className="text-center py-6 text-xs text-slate-400">
          Belum ada sesi pertemuan latihan yang tercatat.
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-slate-800">
          {attendances.map((att, idx) => (
            <div key={att.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-slate-400 text-[11px]">
                  #{idx + 1}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold text-[#1D3557] dark:text-slate-200">
                  {formatDateId(att.date)}
                </span>
                <span className="text-slate-400 hidden sm:inline">• {att.locationName}</span>
              </div>
              <Badge variant="success" size="sm">
                {att.status || 'Hadir'}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

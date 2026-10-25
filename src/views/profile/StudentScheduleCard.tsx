import React from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import { formatDateId, dayNameFromDate } from '@/lib/utils';

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
  const poolName = snapshot.locationLabel
    ? snapshot.locationLabel.toLowerCase().startsWith('kolam')
      ? snapshot.locationLabel
      : `Kolam Renang ${snapshot.locationLabel}`
    : 'Kolam Mitra Tirya Lumba';

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-[#00B4D8]/30 bg-gradient-to-br from-[#E0FBFC]/90 via-white to-white p-6 shadow-md shadow-[#0077B6]/5 sm:p-8">
      {/* Header Seksi Jadwal Murid */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0077B6] text-xl text-white shadow-sm">
            🗓️
          </div>
          <div>
            <h2 className="font-heading text-lg font-extrabold text-[#1D3557] sm:text-xl">
              Jadwal & Pengingat Latihan Murid
            </h2>
            <p className="text-xs text-slate-500">
              Pengingat jadwal latihan renang resmi Anda bersama pelatih
            </p>
          </div>
        </div>

        <div className="self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Jadwal Terjadwal
          </span>
        </div>
      </div>

      {/* Grid Card Jadwal: Hari & Jam Primary */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Kolom Kiri: Kartu Jadwal Pertemuan */}
        <div className="lg:col-span-2 flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:border-[#00B4D8]/50 hover:shadow-md">
          <div>
            {/* Header Hari (Primary) */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0077B6]/10 text-base">
                  📅
                </span>
                <div>
                  <h3 className="font-heading text-lg font-extrabold text-[#1D3557]">
                    {dayName}
                  </h3>
                  <p className="text-xs text-slate-500">{formattedDate}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#E0FBFC] px-3 py-1 text-xs font-extrabold text-[#0077B6]">
                {sessionName}
              </span>
            </div>

            {/* Rincian Sesi & Lokasi */}
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-slate-100 bg-[#F8F9FA] p-4 space-y-3">
                {/* Jam Sesi */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#0077B6]">⏰</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Waktu Latihan
                    </span>
                  </div>
                  <span className="font-heading text-sm font-extrabold text-[#1D3557]">
                    {sessionName}
                  </span>
                </div>

                {/* Lokasi Kolam */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#0077B6]">📍</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Lokasi Kolam
                    </span>
                  </div>
                  <span className="font-heading text-sm font-bold text-[#1D3557] truncate max-w-[200px] sm:max-w-none text-right">
                    {poolName}
                  </span>
                </div>

                {/* Pelatih Pendamping */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#0077B6]">🏊‍♂️</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Pelatih
                    </span>
                  </div>
                  <span className="font-heading text-sm font-bold text-[#0077B6]">
                    {snapshot.instructorName || 'Pelatih Tirya Lumba'}
                  </span>
                </div>

                {/* Paket Kelas */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#0077B6]">🏷️</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Paket Kelas
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {snapshot.packageType || 'Reguler'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Status Pertemuan</span>
            <span className="text-[#0077B6] font-semibold">Pertemuan Pertama Terjadwal</span>
          </div>
        </div>

        {/* Kolom Kanan: Kartu Tips & Pengingat Latihan */}
        <div className="flex flex-col justify-between rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
              <span className="text-base">💡</span>
              <h4 className="font-heading text-sm font-bold text-amber-900">
                Panduan & Pengingat
              </h4>
            </div>

            <ul className="mt-3.5 space-y-2.5 text-xs text-amber-950/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#0077B6] font-bold">1.</span>
                <span>
                  Harap hadir <strong>15 menit lebih awal</strong> untuk pemanasan dan absensi.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0077B6] font-bold">2.</span>
                <span>
                  Wajib mengenakan <strong>pakaian renang</strong> yang sesuai dan membawa kacamata renang.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0077B6] font-bold">3.</span>
                <span>
                  Jika berhalangan hadir, hubungi admin atau pelatih minimal <strong>24 jam</strong> sebelum sesi.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0077B6] font-bold">4.</span>
                <span>
                  Tunjukkan halaman profil ini kepada pengawas/pelatih di lokasi kolam saat tiba.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] text-amber-800 font-medium">
            🏊‍♂️ Selamat berlatih dan tetap utamakan keselamatan air!
          </div>
        </div>
      </div>
    </section>
  );
};

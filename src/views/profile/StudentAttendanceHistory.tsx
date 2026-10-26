'use client';

import React, { useEffect, useState } from 'react';
import { request, toErrorMessage } from '@/lib/http';
import { formatDateId } from '@/lib/utils';

interface AttendanceRecord {
  id: string;
  date: string;
  locationName: string;
  status: string;
}

export const StudentAttendanceHistory: React.FC = () => {
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let active = true;

    request<AttendanceRecord[]>('/attendances/my-history', { method: 'GET' })
      .then((res) => {
        if (active) {
          setAttendances(res.data ?? []);
        }
      })
      .catch((err) => {
        if (active) {
          setErrorMsg(toErrorMessage(err));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-3xl bg-white/90 p-6 sm:p-8 shadow-xs border border-slate-100 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#1D3557]">
            Riwayat Pertemuan & Presensi
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Catatan kehadiran resmi pada setiap sesi latihan renang Anda.
          </p>
        </div>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#0077B6] self-start sm:self-auto border border-sky-200">
          Total: {attendances.length} Pertemuan
        </span>
      </div>

      {loading ? (
        <div className="py-8 flex justify-center">
          <div className="w-6 h-6 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : errorMsg ? (
        <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
          {errorMsg}
        </p>
      ) : attendances.length === 0 ? (
        <div className="text-center py-8 rounded-2xl bg-[#F8F9FA] border border-dashed border-slate-200">
          <span className="text-3xl block mb-2">📋</span>
          <p className="text-sm font-semibold text-slate-600">
            Belum ada catatan presensi pertemuan renang.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Data kehadiran akan otomatis tercatat setiap kali Anda menyelesaikan sesi latihan di
            lokasi kolam.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-2 sm:px-4">Pertemuan</th>
                <th className="py-3 px-2 sm:px-4">Tanggal</th>
                <th className="py-3 px-2 sm:px-4">Lokasi Kolam</th>
                <th className="py-3 px-2 sm:px-4 text-right">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {attendances.map((item, index) => {
                const meetNumber = attendances.length - index;
                const isHadir = item.status === 'Hadir';

                return (
                  <tr key={item.id} className="hover:bg-sky-50/40 transition">
                    <td className="py-3 px-2 sm:px-4 font-bold text-[#1D3557]">
                      Sesi #{meetNumber}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-slate-700">
                      {formatDateId(item.date)}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-slate-600">
                      {item.locationName}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          isHadir
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isHadir ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

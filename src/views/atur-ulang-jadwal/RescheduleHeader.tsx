import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface RescheduleHeaderProps {
  notification?: string;
}

export const RescheduleHeader: React.FC<RescheduleHeaderProps> = ({
  notification,
}) => {
  return (
    <>
      <div className="mb-4">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Dasbor Profil</span>
        </Link>
      </div>

      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
          Portal Pelatih Tirya Lumba
        </span>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D3557] tracking-tight dark:text-slate-100">
          Atur Ulang Jadwal Mengajar
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Perbarui ketersediaan kolam mitra dan jam sesi mengajar resmi Anda di sistem.
        </p>
      </div>

      {notification && (
        <div className="mb-6 p-4 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}
    </>
  );
};

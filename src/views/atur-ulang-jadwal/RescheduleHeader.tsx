import React from 'react';
import Link from 'next/link';

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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8]"
        >
          ← Kembali ke Profil
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="font-heading font-extrabold text-2xl text-[#1D3557] mb-1">
          Atur Ulang Jadwal Mengajar
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Pilih jadwal yang ingin diganti, lalu tentukan hari dan sesi baru dari
          jadwal resmi server.
        </p>
      </div>

      {notification && (
        <div className="mb-6 p-4 rounded-lg text-xs font-semibold bg-[#E0FBFC] text-[#0077B6] border border-[#00B4D8]/30">
          {notification}
        </div>
      )}
    </>
  );
};

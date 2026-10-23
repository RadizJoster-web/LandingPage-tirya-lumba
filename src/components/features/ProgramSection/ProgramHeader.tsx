import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface ProgramHeaderProps {
  totalRegulerCount: number;
}

export const ProgramHeader: React.FC<ProgramHeaderProps> = ({
  totalRegulerCount,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#0077B6] border border-[#00B4D8]/30 mb-3 shadow-xs">
          <span>🏊‍♂️</span> Paket Kelas Renang
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight">
          Program &amp; Paket Les
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
          {totalRegulerCount > 0
            ? `${totalRegulerCount} paket Reguler aktif dari kolam mitra Tangerang Raya, lengkap dengan harganya.`
            : 'Paket kelas renang belum tersedia. Silakan cek kembali dalam beberapa saat.'}
        </p>
      </div>

      <Link href="/daftar/murid" className="shrink-0">
        <Button
          variant="primary"
          size="md"
          isFullRounded={true}
          className="shadow-md"
        >
          Daftar Sebagai Murid
        </Button>
      </Link>
    </div>
  );
};

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
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Katalog Kolam Mitra
        </span>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#1D3557] tracking-tight">
          Program &amp; Kolam Renang
        </h2>
        <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl">
          {totalRegulerCount > 0
            ? `Pilih dari ${totalRegulerCount} kolam renang mitra aktif di Tangerang Raya dengan fasilitas terstandarisasi.`
            : 'Paket kelas renang belum tersedia. Silakan cek kembali dalam beberapa saat.'}
        </p>
      </div>

      <Link href="/daftar/murid" className="shrink-0">
        <Button
          variant="primary"
          size="md"
          isFullRounded={true}
          className="shadow-sm"
        >
          Daftar Sebagai Murid
        </Button>
      </Link>
    </div>
  );
};

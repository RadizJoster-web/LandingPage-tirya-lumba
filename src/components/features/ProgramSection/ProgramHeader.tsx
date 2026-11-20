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
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0077B6] mb-3">
          <span>Katalog Kolam Mitra</span>
        </div>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1D3557] tracking-tight">
          Program &amp; Kolam Renang Pilihan
        </h2>
        <p className="mt-2.5 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
          {totalRegulerCount > 0
            ? `Tersedia ${totalRegulerCount} pilihan kolam renang mitra aktif di Tangerang Raya dengan pelatih berlisensi dan fasilitas terstandarisasi.`
            : 'Paket kelas renang belum tersedia. Silakan cek kembali dalam beberapa saat.'}
        </p>
      </div>

      <Link href="/daftar/murid" className="shrink-0">
        <Button
          variant="primary"
          size="md"
          isFullRounded={true}
          className="shadow-xs hover:shadow-sm px-6 py-2.5 text-xs font-semibold"
        >
          Daftar Sebagai Murid
        </Button>
      </Link>
    </div>
  );
};

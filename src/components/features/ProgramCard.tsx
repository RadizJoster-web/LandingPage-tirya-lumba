import React from 'react';
import Link from 'next/link';
import { ProgramCatalogItem } from '@/services/program';
import { formatRupiah } from '@/lib/utils';

interface ProgramCardProps {
  program: ProgramCatalogItem;
}

/**
 * Satu kartu = satu baris GET /api/packages.
 * Hierarki: area (label) → nama kolam (headline) → kategori → harga (paling menonjol).
 */
export const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-slate-100 transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-900/10">
      <div className="flex-1 p-6">
        {program.areaName && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E0FBFC] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#0077B6]">
            📍 {program.areaName}
          </span>
        )}

        <h3 className="mt-3 font-heading text-lg font-extrabold leading-snug text-[#1D3557]">
          {program.poolName}
        </h3>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          {program.type}
        </p>

        <p className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-[#00B4D8]">
          {formatRupiah(program.price)}
        </p>
        <p className="text-xs text-slate-500">Paket {program.type}</p>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-slate-100 p-4">
        {program.mapUrl && (
          <a
            href={program.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full border border-[#00B4D8]/40 px-3 py-2 text-center text-xs font-semibold text-[#0077B6] transition-colors hover:bg-[#E0FBFC]"
          >
            Lihat di Maps
          </a>
        )}
        <Link
          href="/daftar/murid"
          className="flex-1 rounded-full bg-[#00B4D8] px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-[#0077B6]"
        >
          Daftar Kelas
        </Link>
      </div>
    </article>
  );
};

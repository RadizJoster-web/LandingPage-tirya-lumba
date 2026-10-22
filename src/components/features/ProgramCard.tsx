import React from 'react';
import { ProgramCatalogItem } from '@/types';
import { formatRupiah } from '@/lib/utils';

interface ProgramCardProps {
  program: ProgramCatalogItem;
}

/**
 * Satu kartu = satu baris GET /api/packages.
 * Nama kolam dan harga menjadi konten utama; informasi lokasi menyusul.
 */
export const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
      <div className="flex-1 p-6 sm:p-7">
        <h3 className="font-heading text-xl font-extrabold leading-snug text-[#1D3557]">
          {program.poolName}
        </h3>

        <p className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0077B6]">
          {formatRupiah(program.price)} <span className='text-xs'>/ 4 pertemuan</span>
        </p>

        {program.type && (
          <p className="mt-2 text-sm font-medium text-slate-600">
            Paket {program.type}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          {program.areaName && (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true">📍</span>
              {program.areaName}
            </span>
          )}
          {program.category && <span>{program.category}</span>}
        </div>
      </div>

      {program.mapUrl && (
        <div className="flex justify-end px-6 pb-5 sm:px-7">
          <a
            href={program.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0077B6] transition-colors hover:text-[#00B4D8]"
          >
            Lihat Maps
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </article>
  );
};

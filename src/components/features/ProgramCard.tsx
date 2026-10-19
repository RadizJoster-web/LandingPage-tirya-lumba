import React from 'react';
import Link from 'next/link';
import { ProgramCatalogItem } from '@/services/api';
import { formatRupiah } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ProgramCardProps {
  program: ProgramCatalogItem;
}

/** Satu kartu = satu paket les dari GET /api/packages, bukan satu kolam. */
export const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <Card variant="landing" className="flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-heading font-bold text-lg text-[#0077B6] group-hover:text-[#00B4D8] transition-colors">
            Kelas {program.type}
          </h3>
          {program.areaName && <Badge variant="azure">{program.areaName}</Badge>}
        </div>

        <dl className="text-xs sm:text-sm divide-y divide-blue-50">
          <div className="flex items-center justify-between gap-3 py-1.5">
            <dt className="text-slate-500">Kolam</dt>
            <dd className="font-medium text-[#1D3557] text-right">{program.locationName}</dd>
          </div>
          <div className="flex items-center justify-between gap-3 py-1.5">
            <dt className="text-slate-500">Jenis Kelas</dt>
            <dd className="font-medium text-[#1D3557]">{program.type}</dd>
          </div>
          <div className="flex items-center justify-between gap-3 py-1.5">
            <dt className="text-slate-500">Harga</dt>
            <dd className="font-bold text-[#0077B6]">{formatRupiah(program.price)}</dd>
          </div>
        </dl>
      </div>

      <Link href="/daftar/murid" className="mt-4 block">
        <span className="block text-center text-xs sm:text-sm font-semibold text-white bg-[#00B4D8] hover:bg-[#0077B6] rounded-full px-4 py-2 transition-colors">
          Daftar Kelas Ini
        </span>
      </Link>
    </Card>
  );
};

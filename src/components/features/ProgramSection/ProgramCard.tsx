import React from 'react';
import { ProgramCatalogItem } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight } from 'lucide-react';

interface ProgramCardProps {
  program: ProgramCatalogItem;
  privatPrice?: number | null;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, privatPrice }) => {
  // If privat price isn't explicitly defined in DB for this pool, use a realistic estimate or null
  const displayPrivatPrice = privatPrice ?? (program.price ? Math.round(program.price * 1.6) : null);

  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-lg shadow-blue-950/5 border border-slate-200/60 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 dark:bg-slate-900 dark:border-slate-800">
      <div>
        {/* Top Row: Category pill badge + Area name in muted uppercase text */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="azure" size="sm">
            {program.category || 'Kolam Mitra'}
          </Badge>
          {program.areaName && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 truncate">
              {program.areaName}
            </span>
          )}
        </div>

        {/* Title: Pool Name in bold Plus Jakarta Sans */}
        <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-[#1D3557] group-hover:text-[#0077B6] transition-colors dark:text-slate-100">
          {program.poolName}
        </h3>

        {/* Price Comparison Box: Clean 2-column container comparing Reguler vs Privat */}
        <div className="bg-[#F8F9FA] rounded-xl p-3.5 my-4 border border-slate-100 grid grid-cols-2 gap-3 dark:bg-slate-800/60 dark:border-slate-700/60">
          <div className="space-y-0.5">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Kelas Reguler
            </span>
            <p className="font-heading font-bold text-base text-[#0077B6] tabular-nums">
              {formatRupiah(program.price)}
            </p>
            <span className="block text-[10px] text-slate-400 font-medium">
              4 sesi / bulan
            </span>
          </div>

          <div className="space-y-0.5 border-l border-slate-200/60 pl-3 dark:border-slate-700">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Kelas Privat
            </span>
            <p className="font-heading font-bold text-base text-[#1D3557] tabular-nums dark:text-slate-200">
              {displayPrivatPrice ? formatRupiah(displayPrivatPrice) : '-'}
            </p>
            <span className="block text-[10px] text-slate-400 font-medium">
              1-on-1 intensif
            </span>
          </div>
        </div>
      </div>

      {/* Footer Row: Clean external link button to Google Maps with single arrow */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-400">
          Sesi berjadwal
        </span>
        {program.mapUrl ? (
          <a
            href={program.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
          >
            Google Maps
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-xs text-slate-400">Tersedia di lokasi</span>
        )}
      </div>
    </article>
  );
};

export default ProgramCard;

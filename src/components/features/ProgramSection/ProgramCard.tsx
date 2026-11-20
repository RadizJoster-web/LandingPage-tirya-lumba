import React from 'react';
import { ProgramCatalogItem } from '@/types';
import { formatRupiah, mediaUrl } from '@/lib/utils';
import { MapPin, ArrowUpRight, Sparkles } from 'lucide-react';

interface ProgramCardProps {
  program: ProgramCatalogItem;
  privatPrice?: number | null;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, privatPrice }) => {
  const displayPrivatPrice = privatPrice ?? (program.price ? Math.round(program.price * 1.6) : null);
  const cardImage = mediaUrl(program.imageUrl) || '/hero-section-image.jpg';

  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl bg-white p-5 border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-md transition-all duration-300 dark:bg-slate-900 dark:border-slate-800">
      <div>
        {/* Banner Image with Aspect Ratio & Modern Glass Badges */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 mb-4">
          <img
            src={cardImage}
            alt={program.poolName}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

          {/* Category Chip */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#0077B6] shadow-2xs backdrop-blur-md border border-white/60">
              <Sparkles className="w-3 h-3 text-[#00B4D8]" />
              {program.category || 'Kolam Mitra'}
            </span>
          </div>

          {/* Area Pill */}
          {program.areaName && (
            <div className="absolute bottom-2.5 left-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/70 text-white backdrop-blur-xs">
                <MapPin className="w-3 h-3 text-[#00B4D8]" />
                {program.areaName}
              </span>
            </div>
          )}
        </div>

        {/* Title: Pool Name */}
        <h3 className="font-heading text-lg font-bold text-[#1D3557] group-hover:text-[#0077B6] transition-colors duration-200 line-clamp-1 mb-3 dark:text-slate-100">
          {program.poolName}
        </h3>

        {/* Clean Modern Pricing Container */}
        <div className="rounded-xl bg-slate-50/80 p-3.5 border border-slate-100/90 dark:bg-slate-800/40 dark:border-slate-700/50 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-slate-500">Kelas Reguler</span>
            <div className="text-right">
              <span className="font-heading font-bold text-lg text-[#0077B6] tabular-nums">
                {formatRupiah(program.price)}
              </span>
              <span className="text-[11px] text-slate-400 block font-normal">/ 4 sesi per bulan</span>
            </div>
          </div>

          {displayPrivatPrice && (
            <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs dark:border-slate-700/40">
              <span className="text-slate-500">Opsi Kelas Privat:</span>
              <span className="font-semibold text-slate-700 tabular-nums dark:text-slate-300">
                {formatRupiah(displayPrivatPrice)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action Row */}
      <div className="pt-4 mt-3 flex items-center justify-between border-t border-slate-100 text-xs dark:border-slate-800">
        <span className="text-slate-400 font-medium">Jadwal fleksibel</span>
        {program.mapUrl ? (
          <a
            href={program.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
          >
            <span>Petunjuk Arah</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-slate-400">Tersedia di lokasi</span>
        )}
      </div>
    </article>
  );
};

export default ProgramCard;

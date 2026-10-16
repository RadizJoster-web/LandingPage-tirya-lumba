import React from 'react';
import { Pool } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

interface PoolCardProps {
  pool: Pool;
}

export const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const mapsUrl = `https://www.google.com/maps?q=${pool.latitude},${pool.longitude}`;

  return (
    <Card variant="landing" className="flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-bold text-lg text-[#0077B6] group-hover:text-[#00B4D8] transition-colors">
            🏊 {pool.name}
          </h3>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm text-slate-600 hover:text-[#00B4D8] transition-colors flex items-start gap-1.5 mb-4 group/loc"
          title="Buka lokasi di Google Maps"
        >
          <span className="shrink-0 text-sm">📍</span>
          <span>
            {pool.address}{' '}
            <span className="inline-block text-[#0077B6] font-medium group-hover/loc:underline">
              Buka Peta ↗
            </span>
          </span>
        </a>
      </div>

      <div className="space-y-2 pt-2 border-t border-blue-50">
        <div className="flex items-center justify-between text-xs sm:text-sm bg-[#E0FBFC]/70 px-3 py-2 rounded-lg">
          <span className="text-slate-600 font-medium">Kelas Reguler</span>
          <span className="font-bold text-[#0077B6]">
            {formatRupiah(pool.priceReguler)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm bg-[#E0FBFC]/70 px-3 py-2 rounded-lg">
          <span className="text-slate-600 font-medium">Kelas Privat</span>
          <span className="font-bold text-[#0077B6]">
            {formatRupiah(pool.pricePrivate)}
          </span>
        </div>
      </div>
    </Card>
  );
};

import React from 'react';
import { LessonPackage, Location } from '@/types';
import { formatRupiah, mediaUrl } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface PoolCardProps {
  pool: Location;
  /** Paket les kolam ini dari GET /api/packages; harga reguler & privat tampil dari sini. */
  packages?: LessonPackage[];
}

export const PoolCard: React.FC<PoolCardProps> = ({ pool, packages = [] }) => {
  const mapHref = mediaUrl(pool.mapUrl) ?? undefined;

  const prices = packages
    .filter((item) => item.locationId === pool.id)
    .map((item) => ({ label: item.type, price: item.price }));

  if (prices.length === 0 && typeof pool.regularPrice === 'number') {
    prices.push({ label: 'Reguler', price: pool.regularPrice });
  }

  return (
    <Card variant="landing" className="flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-bold text-lg text-[#0077B6] group-hover:text-[#00B4D8] transition-colors">
            🏊 {pool.name}
          </h3>
          {pool.areaName && <Badge variant="azure">{pool.areaName}</Badge>}
        </div>

        {mapHref ? (
          <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-slate-600 hover:text-[#00B4D8] transition-colors flex items-start gap-1.5 mb-4 group/loc"
            title="Buka lokasi di Google Maps"
          >
            <span className="shrink-0 text-sm">📍</span>
            <span>
              Lihat lokasi kolam{' '}
              <span className="inline-block text-[#0077B6] font-medium group-hover/loc:underline">
                Buka Peta ↗
              </span>
            </span>
          </a>
        ) : (
          <p className="text-xs sm:text-sm text-slate-600 flex items-start gap-1.5 mb-4">
            <span className="shrink-0 text-sm">📍</span>
            <span>{pool.category || 'Kolam mitra PT Tirya Lumba'}</span>
          </p>
        )}
      </div>

      {prices.length > 0 && (
        <div className="pt-2 border-t border-blue-50 space-y-1.5">
          {prices.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-xs sm:text-sm bg-[#E0FBFC]/70 px-3 py-2 rounded-lg"
            >
              <span className="text-slate-600 font-medium">Kelas {item.label}</span>
              <span className="font-bold text-[#0077B6]">{formatRupiah(item.price)}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

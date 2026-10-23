import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface StatItem {
  value: number;
  label: string;
  color: string;
}

interface WhyUsStatsProps {
  stats: {
    totalPartnerPools: number;
    totalAreas: number;
    totalClassTypes: number;
  };
}

export const WhyUsStats: React.FC<WhyUsStatsProps> = ({ stats }) => {
  const statItems: StatItem[] = [
    { value: stats.totalPartnerPools, label: 'Kolam Renang Mitra', color: 'text-[#00B4D8]' },
    { value: stats.totalAreas, label: 'Wilayah Layanan', color: 'text-[#0077B6]' },
    { value: stats.totalClassTypes, label: 'Jenis Kelas Tersedia', color: 'text-[#00B4D8]' },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto py-8 px-6 bg-white rounded-3xl shadow-lg shadow-blue-900/5 border border-blue-50 mb-12">
        {statItems.map((item, index) => (
          <div
            key={item.label}
            className={`space-y-1 ${
              index > 0 ? 'border-t sm:border-t-0 sm:border-x border-slate-100 pt-4 sm:pt-0' : ''
            }`}
          >
            <div className={`font-heading font-extrabold text-4xl sm:text-5xl ${item.color}`}>
              {item.value}
            </div>
            <p className="text-sm font-semibold text-slate-600">{item.label}</p>
          </div>
        ))}
      </div>

      <Link href="/daftar/murid">
        <Button
          variant="primary"
          size="lg"
          isFullRounded={true}
          className="shadow-lg hover:scale-105"
        >
          Daftar Sebagai Murid
        </Button>
      </Link>
    </>
  );
};

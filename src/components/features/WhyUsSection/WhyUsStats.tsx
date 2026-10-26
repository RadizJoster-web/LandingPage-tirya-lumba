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
    totalStudents: number;
    totalInstructors: number;
    totalPartnerPools: number;
    totalAreas: number;
    totalClassTypes: number;
  };
}

export const WhyUsStats: React.FC<WhyUsStatsProps> = ({ stats }) => {
  const statItems: StatItem[] = [
    { value: stats.totalStudents, label: 'Murid Terdaftar', color: 'text-[#0077B6]' },
    { value: stats.totalInstructors, label: 'Pelatih Berlisensi', color: 'text-[#00B4D8]' },
    { value: stats.totalPartnerPools, label: 'Kolam Mitra', color: 'text-[#0077B6]' },
    { value: stats.totalAreas, label: 'Wilayah Layanan', color: 'text-[#00B4D8]' },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto py-8 px-6 bg-white rounded-3xl shadow-lg shadow-blue-900/5 border border-blue-50 mb-12">
        {statItems.map((item, index) => (
          <div
            key={item.label}
            className={`space-y-1 ${
              index > 0 ? 'border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 pl-0 md:pl-4' : ''
            }`}
          >
            <div className={`font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl ${item.color}`}>
              {item.value}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">{item.label}</p>
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

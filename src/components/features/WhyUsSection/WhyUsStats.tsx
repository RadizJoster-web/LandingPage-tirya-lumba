import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface StatItem {
  value: number;
  label: string;
  subtext: string;
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
    {
      value: stats.totalStudents,
      label: 'Murid Terdaftar',
      subtext: 'Aktif berlatih di seluruh kolam mitra',
    },
    {
      value: stats.totalInstructors,
      label: 'Pelatih Berlisensi',
      subtext: 'Tersertifikasi resmi standar PRSI',
    },
    {
      value: stats.totalPartnerPools,
      label: 'Kolam Mitra',
      subtext: 'Tersebar di lokasi strategis terdekat',
    },
    {
      value: stats.totalAreas,
      label: 'Wilayah Layanan',
      subtext: 'Cakupan penuh Tangerang Raya',
    },
  ];

  return (
    <div className="space-y-10">
      {/* 4-Column Stat Cards with Clean Typography and Subtle Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-sky-200 hover:shadow-sm transition-all duration-200 dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tabular-nums tracking-tight">
              {item.value}
            </div>
            <h3 className="mt-2 font-heading font-bold text-base text-[#1D3557] dark:text-slate-100">
              {item.label}
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed dark:text-slate-400">
              {item.subtext}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-2 text-center">
        <Link href="/daftar/murid">
          <Button
            variant="primary"
            size="lg"
            isFullRounded={true}
            className="px-8 py-3.5 text-sm font-semibold shadow-xs hover:shadow-sm active:scale-[0.98] transition-all"
          >
            Daftar Sebagai Murid
          </Button>
        </Link>
      </div>
    </div>
  );
};

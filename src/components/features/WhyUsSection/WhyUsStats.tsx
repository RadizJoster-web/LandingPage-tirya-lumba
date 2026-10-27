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
    <div className="space-y-12">
      {/* Bento Grid 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-blue-950/5 border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900 dark:border-slate-800"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-3">
              Data Resmi
            </span>
            <div className="font-heading font-extrabold text-[42px] leading-tight text-[#0077B6] tabular-nums tracking-tight">
              {item.value}
            </div>
            <h3 className="mt-2 font-heading font-bold text-base text-[#1D3557] dark:text-slate-100">
              {item.label}
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
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
            className="px-8 shadow-sm hover:shadow-md"
          >
            Daftar Sebagai Murid
          </Button>
        </Link>
      </div>
    </div>
  );
};

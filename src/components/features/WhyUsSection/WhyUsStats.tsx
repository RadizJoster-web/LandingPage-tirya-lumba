'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MotionStagger, MotionStaggerItem, MotionFadeIn, motion } from '@/components/ui/motion';

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
      {/* Bento Grid 4 Cards with Staggered In/Out */}
      <MotionStagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {statItems.map((item) => (
          <MotionStaggerItem key={item.label} direction="up" distance={22} duration={0.5}>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="h-full bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-blue-950/5 border border-slate-200/60 transition-shadow duration-300 hover:shadow-xl dark:bg-slate-900 dark:border-slate-800"
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
            </motion.div>
          </MotionStaggerItem>
        ))}
      </MotionStagger>

      <MotionFadeIn direction="up" distance={16} delay={0.2} duration={0.55} className="pt-2 text-center">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
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
        </motion.div>
      </MotionFadeIn>
    </div>
  );
};

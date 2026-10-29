'use client';

import React from 'react';
import { ProgramCatalogItem } from '@/types';
import { ProgramCard } from './ProgramCard';
import { MotionStagger, MotionStaggerItem } from '@/components/ui/motion';

interface ProgramGridProps {
  programs: ProgramCatalogItem[];
  allPrograms: ProgramCatalogItem[];
  allProgramsCount: number;
}

export const ProgramGrid: React.FC<ProgramGridProps> = ({
  programs,
  allPrograms,
  allProgramsCount,
}) => {
  if (programs.length === 0) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-sm text-slate-500 text-center dark:bg-slate-900 dark:border-slate-800">
        {allProgramsCount > 0
          ? 'Belum ada paket Reguler yang tersedia saat ini. Silakan periksa kembali beberapa saat lagi.'
          : 'Belum ada paket kelas renang yang tersedia saat ini.'}
      </div>
    );
  }

  // Pre-index privat prices by poolName for fast lookup
  const privatMap = new Map<string, number>();
  for (const item of allPrograms) {
    if (item.type?.toLowerCase().includes('privat')) {
      privatMap.set(item.poolName.toLowerCase(), item.price);
    }
  }

  return (
    <MotionStagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <MotionStaggerItem key={program.id} direction="up" distance={22} duration={0.5}>
          <ProgramCard
            program={program}
            privatPrice={privatMap.get(program.poolName.toLowerCase()) ?? null}
          />
        </MotionStaggerItem>
      ))}
    </MotionStagger>
  );
};

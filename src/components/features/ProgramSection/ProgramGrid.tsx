import React from 'react';
import { ProgramCatalogItem } from '@/types';
import { ProgramCard } from './ProgramCard';

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
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-sm text-slate-500 text-center">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard
          key={program.id}
          program={program}
          privatPrice={privatMap.get(program.poolName.toLowerCase()) ?? null}
        />
      ))}
    </div>
  );
};

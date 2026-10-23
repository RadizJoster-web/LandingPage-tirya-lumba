import React from 'react';
import { ProgramCatalogItem } from '@/types';
import { ProgramCard } from './ProgramCard';

interface ProgramGridProps {
  programs: ProgramCatalogItem[];
  allProgramsCount: number;
}

export const ProgramGrid: React.FC<ProgramGridProps> = ({
  programs,
  allProgramsCount,
}) => {
  if (programs.length === 0) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-amber-200 text-sm text-amber-800">
        {allProgramsCount > 0
          ? 'Belum ada paket Reguler yang tersedia saat ini. Silakan cek kembali dalam beberapa saat.'
          : 'Belum ada paket kelas renang yang tersedia saat ini. Silakan cek kembali dalam beberapa saat.'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
};

import React from 'react';
import { ProgramCatalogItem } from '@/types';
import { ProgramHeader } from './ProgramHeader';
import { ProgramGrid } from './ProgramGrid';
import { ProgramPagination } from './ProgramPagination';

interface ProgramSectionProps {
  /** Sumber kartu: GET /api/packages yang sudah dilengkapi nama kolam & wilayah. */
  programs: ProgramCatalogItem[];
  currentPage: number;
  perPage: number;
}

/** Grid kartu paket les; pagination 6 kartu per halaman (?halaman=N). */
export const ProgramSection: React.FC<ProgramSectionProps> = ({
  programs,
  currentPage,
  perPage,
}) => {
  const regulerPackages = programs.filter((program) => program.type === 'Reguler');
  // Fallback to all programs if no explicit 'Reguler' type is tagged
  const displaySource = regulerPackages.length > 0 ? regulerPackages : programs;
  const totalPages = Math.max(1, Math.ceil(displaySource.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * perPage;
  const visible = displaySource.slice(start, start + perPage);

  return (
    <section id="program" className="py-20 lg:py-28 bg-[#F8F9FA] scroll-mt-20 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgramHeader totalRegulerCount={displaySource.length} />
        <ProgramGrid
          programs={visible}
          allPrograms={programs}
          allProgramsCount={displaySource.length}
        />
        <ProgramPagination totalPages={totalPages} safePage={safePage} />
      </div>
    </section>
  );
};

export default ProgramSection;

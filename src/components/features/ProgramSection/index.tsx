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

/** Grid kartu paket les; pagination dihitung klien karena /packages belum berhalaman. */
export const ProgramSection: React.FC<ProgramSectionProps> = ({
  programs,
  currentPage,
  perPage,
}) => {
  const regulerPackages = programs.filter((program) => program.type === 'Reguler');
  const totalPages = Math.max(1, Math.ceil(regulerPackages.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * perPage;
  const visible = regulerPackages.slice(start, start + perPage);

  return (
    <section id="program" className="py-20 bg-[#E0FBFC]/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgramHeader totalRegulerCount={regulerPackages.length} />
        <ProgramGrid programs={visible} allProgramsCount={programs.length} />
        <ProgramPagination totalPages={totalPages} safePage={safePage} />
      </div>
    </section>
  );
};

export default ProgramSection;

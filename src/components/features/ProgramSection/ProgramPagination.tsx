import React from 'react';
import Link from 'next/link';

interface ProgramPaginationProps {
  totalPages: number;
  safePage: number;
}

export const ProgramPagination: React.FC<ProgramPaginationProps> = ({
  totalPages,
  safePage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-12"
      aria-label="Navigasi halaman paket"
    >
      <Link
        href={`/?halaman=${Math.max(1, safePage - 1)}#program`}
        aria-disabled={safePage === 1}
        className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border border-[#00B4D8]/40 bg-white text-[#0077B6] hover:bg-[#E0FBFC] transition-all ${
          safePage === 1 ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        ← Prev
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/?halaman=${page}#program`}
          aria-current={safePage === page ? 'page' : undefined}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
            safePage === page
              ? 'bg-[#00B4D8] text-white shadow-sm scale-105'
              : 'bg-white text-[#0077B6] border border-[#00B4D8]/30 hover:bg-[#E0FBFC]'
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`/?halaman=${Math.min(totalPages, safePage + 1)}#program`}
        aria-disabled={safePage === totalPages}
        className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border border-[#00B4D8]/40 bg-white text-[#0077B6] hover:bg-[#E0FBFC] transition-all ${
          safePage === totalPages ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        Next →
      </Link>
    </nav>
  );
};

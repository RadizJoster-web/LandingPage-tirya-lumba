import React from 'react';
import Link from 'next/link';
import { ApiPagination, Location } from '@/types';
import { PoolCard } from '@/components/features/PoolCard';
import { Button } from '@/components/ui/Button';

interface ProgramSectionProps {
  locations: Location[];
  pagination?: ApiPagination;
  currentPage: number;
}

/** Grid kartu kolam mitra; isi dan jumlah halaman berasal dari GET /api/locations/public. */
export const ProgramSection: React.FC<ProgramSectionProps> = ({
  locations,
  pagination,
  currentPage,
}) => {
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <section id="program" className="py-20 bg-[#E0FBFC]/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#0077B6] border border-[#00B4D8]/30 mb-3 shadow-xs">
              <span>🏊‍♂️</span> Lokasi &amp; Pilihan Kelas
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight">
              Program &amp; Kolam Renang Mitra
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              {pagination
                ? `${pagination.totalItems} kolam mitra tersebar di Tangerang Raya, lengkap dengan harga kelas reguler per kolam.`
                : 'Data kolam mitra sedang tidak dapat dimuat. Silakan muat ulang halaman.'}
            </p>
          </div>

          <Link href="/daftar/murid" className="shrink-0">
            <Button variant="primary" size="md" isFullRounded={true} className="shadow-md">
              Daftar Sebagai Murid
            </Button>
          </Link>
        </div>

        {locations.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-amber-200 text-sm text-amber-800">
            Belum ada data kolam mitra yang bisa ditampilkan. Pastikan server API aktif, lalu muat ulang halaman.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((pool) => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Navigasi halaman kolam">
            <Link
              href={`/?halaman=${Math.max(1, currentPage - 1)}#program`}
              aria-disabled={currentPage === 1}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border border-[#00B4D8]/40 bg-white text-[#0077B6] hover:bg-[#E0FBFC] transition-all ${
                currentPage === 1 ? 'opacity-40 pointer-events-none' : ''
              }`}
            >
              ← Prev
            </Link>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/?halaman=${page}#program`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                  currentPage === page
                    ? 'bg-[#00B4D8] text-white shadow-sm scale-105'
                    : 'bg-white text-[#0077B6] border border-[#00B4D8]/30 hover:bg-[#E0FBFC]'
                }`}
              >
                {page}
              </Link>
            ))}

            <Link
              href={`/?halaman=${Math.min(totalPages, currentPage + 1)}#program`}
              aria-disabled={currentPage === totalPages}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border border-[#00B4D8]/40 bg-white text-[#0077B6] hover:bg-[#E0FBFC] transition-all ${
                currentPage === totalPages ? 'opacity-40 pointer-events-none' : ''
              }`}
            >
              Next →
            </Link>
          </nav>
        )}
      </div>
    </section>
  );
};

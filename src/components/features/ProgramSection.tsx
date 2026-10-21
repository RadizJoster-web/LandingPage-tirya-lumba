import React from 'react';
import Link from 'next/link';
import { ProgramCatalogItem } from '@/services/program';
import { ProgramCard } from '@/components/features/ProgramCard';
import { Button } from '@/components/ui/Button';

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
  const totalPages = Math.max(1, Math.ceil(programs.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * perPage;
  const visible = programs.slice(start, start + perPage);

  return (
    <section id="program" className="py-20 bg-[#E0FBFC]/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#0077B6] border border-[#00B4D8]/30 mb-3 shadow-xs">
              <span>🏊‍♂️</span> Paket Kelas Renang
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight">
              Program &amp; Paket Les
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              {programs.length > 0
                ? `${programs.length} paket les aktif dari kolam mitra Tangerang Raya, lengkap dengan jenis kelas dan harganya.`
                : 'Tidak dapat menghubungi server. Pastikan koneksi Anda aktif, lalu muat ulang halaman.'}
            </p>
          </div>

          <Link href="/daftar/murid" className="shrink-0">
            <Button variant="primary" size="md" isFullRounded={true} className="shadow-md">
              Daftar Sebagai Murid
            </Button>
          </Link>
        </div>

        {visible.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-amber-200 text-sm text-amber-800">
            Tidak dapat menghubungi server. Pastikan server API aktif, lalu muat ulang halaman.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Navigasi halaman paket">
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
        )}
      </div>
    </section>
  );
};

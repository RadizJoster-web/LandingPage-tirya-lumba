'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pool } from '@/types';
import { PoolCard } from '@/components/features/PoolCard';
import { Button } from '@/components/ui/Button';

interface ProgramSectionProps {
  pools: Pool[];
}

export const ProgramSection: React.FC<ProgramSectionProps> = ({ pools }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(pools.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPools = pools.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById('program');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="program" className="py-20 bg-[#E0FBFC]/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#0077B6] border border-[#00B4D8]/30 mb-3 shadow-xs">
              <span>🏊‍♂️</span> Lokasi & Pilihan Kelas
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight">
              Program & Kolam Renang Mitra
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Pilih lokasi kolam renang terdekat dari tempat tinggal Anda di wilayah Tangerang Raya dengan fasilitas terbaik dan instruktur profesional.
            </p>
          </div>

          <Link href="/daftar/murid" className="shrink-0">
            <Button variant="primary" size="md" isFullRounded={true} className="shadow-md">
              Daftar Sebagai Murid
            </Button>
          </Link>
        </div>

        {/* Pools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold border border-[#00B4D8]/40 bg-white text-[#0077B6] hover:bg-[#E0FBFC] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                  currentPage === page
                    ? 'bg-[#00B4D8] text-white shadow-sm scale-105'
                    : 'bg-white text-[#0077B6] border border-[#00B4D8]/30 hover:bg-[#E0FBFC]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold border border-[#00B4D8]/40 bg-white text-[#0077B6] hover:bg-[#E0FBFC] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

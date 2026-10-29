'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MotionFadeIn, motion } from '@/components/ui/motion';

interface ProgramHeaderProps {
  totalRegulerCount: number;
}

export const ProgramHeader: React.FC<ProgramHeaderProps> = ({
  totalRegulerCount,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <MotionFadeIn direction="up" distance={20} duration={0.6}>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Katalog Kolam Mitra
        </span>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#1D3557] tracking-tight">
          Program &amp; Kolam Renang
        </h2>
        <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl">
          {totalRegulerCount > 0
            ? `Pilih dari ${totalRegulerCount} kolam renang mitra aktif di Tangerang Raya dengan fasilitas terstandarisasi.`
            : 'Paket kelas renang belum tersedia. Silakan cek kembali dalam beberapa saat.'}
        </p>
      </MotionFadeIn>

      <MotionFadeIn direction="up" delay={0.15} distance={15} duration={0.55} className="shrink-0">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link href="/daftar/murid" className="block">
            <Button
              variant="primary"
              size="md"
              isFullRounded={true}
              className="shadow-sm hover:shadow-md"
            >
              Daftar Sebagai Murid
            </Button>
          </Link>
        </motion.div>
      </MotionFadeIn>
    </div>
  );
};

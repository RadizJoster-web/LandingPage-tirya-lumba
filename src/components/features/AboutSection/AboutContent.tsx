'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MotionFadeIn, MotionStagger, MotionStaggerItem, motion } from '@/components/ui/motion';

export const AboutContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <MotionFadeIn direction="left" distance={24} duration={0.6}>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Tentang PT Tirya Lumba
        </span>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#1D3557] tracking-tight leading-tight dark:text-slate-100">
          Membangun Kepercayaan Diri di Atas Air Sejak 2012
        </h2>

        <p className="mt-4 text-base text-[#1D3557]/80 leading-relaxed dark:text-slate-300">
          PT Tirya Lumba adalah lembaga pelatihan dan kursus renang terkemuka di Tangerang Raya
          yang berfokus pada keselamatan, pembentukan karakter, dan pengembangan potensi
          olahraga renang bagi balita, anak-anak, remaja, hingga dewasa pemula.
        </p>
      </MotionFadeIn>

      {/* Structured copy with clean > list items (Staggered reveal) */}
      <MotionStagger
        delayChildren={0.2}
        staggerDelay={0.1}
        className="space-y-3 pt-2 text-sm font-medium text-[#1D3557]/90 dark:text-slate-200"
      >
        <MotionStaggerItem direction="left" distance={16}>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span> Kurikulum Bertahap Berstandar PRSI &amp; FINA
          </div>
        </MotionStaggerItem>
        <MotionStaggerItem direction="left" distance={16}>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span> Pelatih Resmi Berpengalaman &amp; Terverifikasi
          </div>
        </MotionStaggerItem>
        <MotionStaggerItem direction="left" distance={16}>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span> Sistem Pendaftaran &amp; Penjadwalan Terintegrasi Penuh
          </div>
        </MotionStaggerItem>
      </MotionStagger>

      {/* Link with smooth underline reveal animation */}
      <MotionFadeIn direction="up" distance={12} delay={0.35} duration={0.5} className="pt-4">
        <motion.div whileHover={{ x: 2 }} className="inline-block">
          <Link
            href="/#kenapa-pilih-kami"
            className="group relative inline-flex items-center gap-2 font-heading font-bold text-base text-[#0077B6] pb-1 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#00B4D8] after:scale-x-0 group-hover:after:scale-x-100 after:origin-bottom-right hover:after:origin-bottom-left after:transition-transform after:duration-300"
          >
            <span>Kenal kami lebih dalam</span>
            <ArrowRight className="w-4 h-4 text-[#00B4D8] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </MotionFadeIn>
    </div>
  );
};

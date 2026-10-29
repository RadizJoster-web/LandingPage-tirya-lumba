'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MotionFadeIn, MotionStagger, MotionStaggerItem, motion } from '@/components/ui/motion';

interface HeroContentProps {
  totalPartnerPools: number;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  totalPartnerPools,
}) => {
  return (
    <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
      {/* Top Eyebrow Badge */}
      <MotionFadeIn direction="down" delay={0.1} distance={14}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Sekolah Renang Profesional • Tangerang Raya
          </span>
        </div>
      </MotionFadeIn>

      {/* Main H1 Headline */}
      <MotionFadeIn direction="up" delay={0.2} duration={0.65}>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[56px] text-[#1D3557] leading-[1.12] tracking-tight">
          Selami Kepercayaan Diri, Kuasai Air Bersama{' '}
          <span className="text-[#0077B6]">Tirya Lumba</span>
        </h1>
      </MotionFadeIn>

      {/* Value Proposition Description */}
      <MotionFadeIn direction="up" delay={0.3} duration={0.6}>
        <p className="text-base sm:text-lg text-[#1D3557]/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
          Bimbingan kursus renang aman, bertahap, dan menyenangkan bersama pelatih
          resmi berlisensi di {totalPartnerPools > 0 ? `${totalPartnerPools} ` : ''}kolam mitra
          terdekat dari tempat tinggal Anda.
        </p>
      </MotionFadeIn>

      {/* Primary & Secondary Pill CTAs with Micro-scale */}
      <MotionFadeIn direction="up" delay={0.4} duration={0.6}>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
          <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link href="/daftar" className="block w-full">
              <Button
                variant="primary"
                size="lg"
                isFullRounded={true}
                className="w-full sm:w-auto px-8 shadow-sm hover:shadow-md"
              >
                Daftar Sekarang
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link href="/#tentang-kami" className="block w-full">
              <Button
                variant="outline"
                size="lg"
                isFullRounded={true}
                className="w-full sm:w-auto px-8 border-slate-300 text-[#1D3557] hover:bg-slate-100"
              >
                Tentang Kami
              </Button>
            </Link>
          </motion.div>
        </div>
      </MotionFadeIn>

      {/* Clean typographic list items (Staggered In/Out reveal) */}
      <MotionStagger
        delayChildren={0.45}
        staggerDelay={0.1}
        className="pt-6 border-t border-slate-200/60 flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-2 text-xs sm:text-sm font-medium text-[#1D3557]/70"
      >
        <MotionStaggerItem direction="right" distance={12}>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#0077B6]">&gt;</span> Pelatih Bersertifikat Resmi
          </div>
        </MotionStaggerItem>
        <MotionStaggerItem direction="right" distance={12}>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#0077B6]">&gt;</span> Jadwal Latihan Fleksibel
          </div>
        </MotionStaggerItem>
        <MotionStaggerItem direction="right" distance={12}>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#0077B6]">&gt;</span> Pendaftaran 100% Digital
          </div>
        </MotionStaggerItem>
      </MotionStagger>
    </div>
  );
};

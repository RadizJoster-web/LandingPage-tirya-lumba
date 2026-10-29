'use client';

import React from 'react';
import { MotionFadeIn } from '@/components/ui/motion';

export const WhyUsHeader: React.FC = () => {
  return (
    <MotionFadeIn direction="up" distance={20} duration={0.6}>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Keunggulan &amp; Metrik
        </span>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#1D3557] tracking-tight dark:text-slate-100">
          Mengapa Memilih PT Tirya Lumba?
        </h2>
        <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
          Pencapaian riil berbasis data operasional yang membuktikan dedikasi kami dalam melahirkan generasi perenang yang mandiri, percaya diri, dan berprestasi.
        </p>
      </div>
    </MotionFadeIn>
  );
};

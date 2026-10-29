'use client';

import React from 'react';
import Image from 'next/image';
import { MotionFadeIn, MotionFloat } from '@/components/ui/motion';

export const HeroGraphic: React.FC = () => {
  return (
    <div className="lg:col-span-5 flex justify-center items-center">
      <MotionFadeIn direction="none" delay={0.2} duration={0.7} className="w-full">
        <MotionFloat yOffset={8} duration={4.5} className="relative w-full max-w-lg lg:max-w-xl group mx-auto">
          {/* Subtle aquatic aura behind the swimmer */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-radial from-[#00B4D8]/25 via-[#0077B6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Floating Transparent Hero Illustration */}
          <div className="relative w-full flex items-center justify-center drop-shadow-[0_16px_32px_rgba(0,119,182,0.18)] transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/hero-section-image.png"
              alt="Ilustrasi Kursus Renang Tirya Lumba"
              width={1818}
              height={855}
              className="w-full h-auto object-contain select-none pointer-events-none"
              priority
            />
          </div>
        </MotionFloat>
      </MotionFadeIn>
    </div>
  );
};

export { HeroGraphic as HeroImage };

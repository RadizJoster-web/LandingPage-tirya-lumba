import React from 'react';
import { HeroContent } from './HeroContent';
import { HeroGraphic } from './HeroGraphic';

interface HeroSectionProps {
  totalPartnerPools: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalPartnerPools,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E0FBFC]/30 via-white to-white py-16 sm:py-20 lg:py-28 border-b border-slate-100">
      {/* Subtle aquatic aura */}
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-[#00B4D8]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-[350px] h-[350px] bg-[#0077B6]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <HeroContent totalPartnerPools={totalPartnerPools} />
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

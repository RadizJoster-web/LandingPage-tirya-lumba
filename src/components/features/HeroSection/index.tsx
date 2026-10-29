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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E0FBFC]/50 via-[#F8F9FA] to-[#F8F9FA] py-20 lg:py-28">
      {/* Subtle aquatic background mesh & aurora glow */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none animate-subtle-pulse" />
      <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] bg-[#0077B6]/10 rounded-full blur-3xl pointer-events-none" />

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

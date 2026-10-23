import React from 'react';
import { HeroContent } from './HeroContent';
import { HeroGraphic } from './HeroGraphic';

interface HeroSectionProps {
  /** Jumlah kolam mitra dari API; dipakai sebagai bukti skala, bukan angka karangan. */
  totalPartnerPools: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalPartnerPools,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E0FBFC] via-white to-[#F8F9FA] pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background aquatic ambient glow circles */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#0077B6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <HeroContent totalPartnerPools={totalPartnerPools} />
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

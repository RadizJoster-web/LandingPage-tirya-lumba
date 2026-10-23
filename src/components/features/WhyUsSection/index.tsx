import React from 'react';
import { WhyUsHeader } from './WhyUsHeader';
import { WhyUsFeatures } from './WhyUsFeatures';
import { WhyUsStats } from './WhyUsStats';

interface WhyUsSectionProps {
  /** Angka nyata dari API: jumlah kolam mitra, wilayah, dan jenis kelas yang tersedia. */
  stats: {
    totalPartnerPools: number;
    totalAreas: number;
    totalClassTypes: number;
  };
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ stats }) => {
  return (
    <section id="kenapa-pilih-kami" className="py-24 bg-[#E0FBFC]/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <WhyUsHeader />
        <WhyUsFeatures />
        <WhyUsStats stats={stats} />
      </div>
    </section>
  );
};

export default WhyUsSection;

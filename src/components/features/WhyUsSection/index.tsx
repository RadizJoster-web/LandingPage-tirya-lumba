import React from 'react';
import { WhyUsHeader } from './WhyUsHeader';
import { WhyUsFeatures } from './WhyUsFeatures';
import { WhyUsStats } from './WhyUsStats';

interface WhyUsSectionProps {
  stats: {
    totalStudents: number;
    totalInstructors: number;
    totalPartnerPools: number;
    totalAreas: number;
    totalClassTypes: number;
  };
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ stats }) => {
  return (
    <section id="kenapa-pilih-kami" className="py-20 lg:py-28 bg-[#F8F9FA] scroll-mt-16 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <WhyUsHeader />
        <WhyUsFeatures />
        <WhyUsStats stats={stats} />
      </div>
    </section>
  );
};

export default WhyUsSection;

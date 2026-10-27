import React from 'react';
import { AboutContent } from './AboutContent';
import { AboutIllustration } from './AboutIllustration';

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang-kami" className="py-20 lg:py-28 bg-white scroll-mt-16 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <AboutIllustration />
          </div>
          <div className="lg:col-span-6">
            <AboutContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

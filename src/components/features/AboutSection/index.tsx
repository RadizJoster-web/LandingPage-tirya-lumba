import React from 'react';
import { AboutContent } from './AboutContent';
import { AboutIllustration } from './AboutIllustration';

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang-kami" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AboutContent />
          <AboutIllustration />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

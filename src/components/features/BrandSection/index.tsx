import React from 'react';
import { BrandMarquee } from './BrandMarquee';

export const BrandSection: React.FC = () => {
  return (
    <section className="py-10 bg-white border-y border-slate-100 overflow-hidden group">
      <BrandMarquee />
    </section>
  );
};

export default BrandSection;

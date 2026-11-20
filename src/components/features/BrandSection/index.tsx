import React from 'react';
import { BrandMarquee } from './BrandMarquee';

export const BrandSection: React.FC = () => {
  return (
    <section className="py-10 bg-slate-50/50 border-b border-slate-100 overflow-hidden group dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 mb-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Dipercaya oleh Institusi &amp; Komunitas Olahraga Renang
        </p>
      </div>
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <BrandMarquee />
      </div>
    </section>
  );
};

export default BrandSection;

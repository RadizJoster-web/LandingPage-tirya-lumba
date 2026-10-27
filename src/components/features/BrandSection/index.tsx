import React from 'react';
import { BrandMarquee } from './BrandMarquee';

export const BrandSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden group dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Dipercaya oleh Institusi &amp; Komunitas Olahraga Renang
        </p>
      </div>
      <BrandMarquee />
    </section>
  );
};

export default BrandSection;

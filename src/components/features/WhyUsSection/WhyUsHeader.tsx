import React from 'react';

export const WhyUsHeader: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0077B6] mb-3">
        <span>Keunggulan &amp; Metrik</span>
      </div>
      <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1D3557] tracking-tight dark:text-slate-100">
        Mengapa Memilih PT Tirya Lumba?
      </h2>
      <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed dark:text-slate-300">
        Pencapaian riil berbasis data operasional yang membuktikan dedikasi kami dalam membimbing generasi perenang yang mandiri, percaya diri, dan berprestasi.
      </p>
    </div>
  );
};

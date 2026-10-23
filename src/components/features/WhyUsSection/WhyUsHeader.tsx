import React from 'react';

export const WhyUsHeader: React.FC = () => {
  return (
    <>
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-[#0077B6] border border-[#00B4D8]/30 mb-3 shadow-xs">
        <span>✨</span> Keunggulan Kami
      </div>

      <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight max-w-2xl mx-auto">
        Mengapa Mempercayakan Orang Tersayang di Tirya Lumba?
      </h2>
      <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
        Kami memberikan bimbingan renang berstandar tinggi dengan ekosistem belajar yang aman, ramah anak, dan terstruktur.
      </p>
    </>
  );
};

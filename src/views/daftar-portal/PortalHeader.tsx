import React from 'react';

export const PortalHeader: React.FC = () => {
  return (
    <>
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-[#0077B6] border border-[#00B4D8]/30 mb-4 shadow-xs">
        <span>🌊</span> Portal Pendaftaran
      </div>

      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight">
        Pilih Jalur Pendaftaran
      </h1>
      <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
        Silakan pilih peran pendaftaran yang sesuai dengan kebutuhan Anda di PT Tirya Lumba.
      </p>
    </>
  );
};

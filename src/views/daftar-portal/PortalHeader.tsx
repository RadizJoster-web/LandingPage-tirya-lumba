import React from 'react';

export const PortalHeader: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto text-center mb-12">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
        Portal Tirya Lumba
      </span>
      <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#1D3557] tracking-tight dark:text-slate-100">
        Pilih Jalur Pendaftaran
      </h1>
      <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed">
        Tentukan jalur yang sesuai untuk memulai perjalanan berenang Anda atau bergabung sebagai tim pelatih profesional.
      </p>
    </div>
  );
};

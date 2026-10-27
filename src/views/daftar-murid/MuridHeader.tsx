import React from 'react';

export const MuridHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
        Pendaftaran Murid Baru
      </span>
      <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D3557] tracking-tight dark:text-slate-100">
        Formulir Kursus Renang
      </h1>
      <p className="mt-1 text-xs sm:text-sm text-slate-500">
        Lengkapi 3 langkah mudah berikut untuk reservasi jadwal dan instruktur
      </p>
    </div>
  );
};

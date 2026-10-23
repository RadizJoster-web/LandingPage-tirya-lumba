import React from 'react';

export const MuridHeader: React.FC = () => {
  return (
    <div className="text-center mb-2">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E0FBFC] text-[#0077B6] mb-3">
        <span>🏊</span> Pendaftaran Murid Baru
      </div>
      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6]">
        Formulir Pendaftaran Murid
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Data kolam, paket, sesi, dan guru diambil langsung dari server PT Tirya Lumba.
      </p>
    </div>
  );
};

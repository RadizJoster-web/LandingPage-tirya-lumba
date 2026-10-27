import React from 'react';

export const RegisterHeader: React.FC = () => {
  return (
    <div className="text-center mb-7">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
        Portal Tirya Lumba
      </span>
      <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D3557] tracking-tight dark:text-slate-100">
        Buat Akun Baru
      </h1>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
        Daftarkan akun Anda untuk reservasi kelas atau bergabung sebagai instruktur
      </p>
    </div>
  );
};

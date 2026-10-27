import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface LoginHeaderProps {
  justVerified: boolean;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ justVerified }) => {
  return (
    <>
      <div className="text-center mb-7">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Portal Tirya Lumba
        </span>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D3557] tracking-tight dark:text-slate-100">
          Masuk ke Akun
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          Akses jadwal latihan, profil murid, dan status pendaftaran Anda
        </p>
      </div>

      {justVerified && (
        <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs font-medium text-emerald-800 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Verifikasi akun berhasil. Silakan masuk menggunakan kata sandi Anda.</span>
        </div>
      )}
    </>
  );
};

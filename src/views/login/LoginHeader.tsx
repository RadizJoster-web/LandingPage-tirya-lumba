import React from 'react';

interface LoginHeaderProps {
  justVerified: boolean;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ justVerified }) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[#00B4D8] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
          <span className="text-2xl">🔐</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6]">
          Masuk Akun
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Selamat datang kembali di portal PT Tirya Lumba
        </p>
      </div>

      {justVerified && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
          Verifikasi akun berhasil. Silakan masuk dengan email dan password Anda.
        </div>
      )}
    </>
  );
};

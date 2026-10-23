import React from 'react';

export const RegisterHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <div className="w-12 h-12 rounded-full bg-[#00B4D8] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
        <span className="text-2xl">📝</span>
      </div>
      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6]">
        Buat Akun Baru
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Daftarkan diri Anda untuk mulai proses booking kelas atau pengajar
      </p>
    </div>
  );
};

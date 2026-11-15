import React from 'react';

interface ProfilePublicInfoRowProps {
  fullName: string;
  phone?: string | null;
  email: string;
  address?: string | null;
}

export const ProfilePublicInfoRow: React.FC<ProfilePublicInfoRowProps> = ({
  fullName,
  phone,
  email,
  address,
}) => {
  return (
    <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="sm:w-1/3 space-y-1">
        <h3 className="text-sm font-bold text-[#1D3557] dark:text-slate-100">
          Profil Publik
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Informasi identitas akun dan kontak utama Anda yang terdaftar pada sistem.
        </p>
      </div>

      <div className="sm:w-2/3 space-y-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Nama Lengkap
          </label>
          <div className="rounded-xl border border-gray-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-[#1D3557] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
            {fullName || '–'}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Nomor WhatsApp / Telepon
            </label>
            <div className="rounded-xl border border-gray-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-[#1D3557] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
              {phone || '–'}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Alamat Email Akun
            </label>
            <div className="rounded-xl border border-gray-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-[#1D3557] truncate dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
              {email}
            </div>
          </div>
        </div>

        {address ? (
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Domisili Tempat Tinggal
            </label>
            <div className="rounded-xl border border-gray-200 bg-slate-50/70 px-3.5 py-2 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
              {address}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

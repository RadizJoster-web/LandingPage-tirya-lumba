import React from 'react';

interface GenderAndAgeInputProps {
  birthDate: string;
  currentAge: number;
  gender: 'Laki-Laki' | 'Perempuan';
  setGender: (g: 'Laki-Laki' | 'Perempuan') => void;
}

export const GenderAndAgeInput: React.FC<GenderAndAgeInputProps> = ({
  birthDate,
  currentAge,
  gender,
  setGender,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Usia Saat Ini
        </label>
        <div className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-700 text-sm border border-gray-200 rounded-lg font-medium flex items-center justify-between dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
          <span>{birthDate ? `${currentAge} Tahun` : '—'}</span>
          <span className="text-[11px] text-slate-400">Otomatis dihitung</span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Jenis Kelamin *
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setGender('Laki-Laki')}
            className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
              gender === 'Laki-Laki'
                ? 'bg-[#E0FBFC] text-[#0077B6] border-[#00B4D8] shadow-xs'
                : 'bg-white text-slate-600 border-gray-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            Laki-laki
          </button>
          <button
            type="button"
            onClick={() => setGender('Perempuan')}
            className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
              gender === 'Perempuan'
                ? 'bg-[#E0FBFC] text-[#0077B6] border-[#00B4D8] shadow-xs'
                : 'bg-white text-slate-600 border-gray-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            Perempuan
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

export const ScheduleChecklistGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 overflow-hidden dark:bg-slate-900/40 dark:border-slate-800">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-[#1D3557] hover:bg-slate-100/60 transition-colors dark:text-slate-200 dark:hover:bg-slate-800/60"
      >
        <span className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0077B6]" />
          Panduan &amp; Persiapan Kehadiran Latihan
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-2 dark:border-slate-800 dark:text-slate-300 animate-fade-in">
          <div className="flex items-start gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span>
            <span>
              Hadir minimal <strong>15 menit lebih awal</strong> sebelum jam sesi
              untuk pemanasan otot dan absensi.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span>
            <span>
              Wajib mengenakan <strong>pakaian renang standar</strong> dan membawa
              kacamata renang pribadi.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span>
            <span>
              Jika berhalangan hadir, harap berikan konfirmasi minimal{' '}
              <strong>24 jam</strong> sebelumnya ke admin atau instruktur.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span>
            <span>
              Tunjukkan kartu / status di profil ini kepada pengawas kolam saat
              registrasi kehadiran.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

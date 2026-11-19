import React from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const CoachClosedNotice: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center shadow-lg shadow-slate-900/5 space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center shadow-xs">
          <Lock size={26} strokeWidth={2.2} />
        </div>

        <div className="space-y-2">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1D3557] dark:text-slate-100">
            Pendaftaran Pelatih Ditutup
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Saat ini seluruh alokasi dan kuota penerimaan pelatih baru di semua cabang kolam renang sedang penuh. Formulir pendaftaran pelatih dinonaktifkan sementara oleh manajemen.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link href="/daftar/murid" className="w-full">
            <Button variant="primary" size="md" isFullRounded={true} className="w-full gap-2">
              <GraduationCap size={16} />
              Daftar sebagai Murid
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" size="md" isFullRounded={true} className="w-full gap-2">
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

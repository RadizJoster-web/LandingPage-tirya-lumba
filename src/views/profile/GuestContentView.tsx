import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface GuestContentViewProps {
  name: string;
  email: string;
}

export const GuestContentView: React.FC<GuestContentViewProps> = ({ name, email }) => {
  return (
    <div className="space-y-5 flex-1">
      {/* Kartu 1: Program Renang */}
      <section className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
        <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
          Program Renang
        </h2>

        <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/70 p-6 text-center space-y-3 dark:bg-slate-800/40 dark:border-slate-700">
          <div className="mx-auto w-10 h-10 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-[#1D3557] dark:text-slate-200">
              Anda belum terdaftar di program renang
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Bergabunglah sebagai murid les renang bersertifikasi atau daftarkan diri Anda sebagai pelatih profesional PT Tirya Lumba.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/daftar">
              <Button
                variant="primary"
                size="md"
                isFullRounded={false}
                className="inline-flex items-center gap-2 text-xs font-semibold px-6"
              >
                <span>Pilih Jalur Pendaftaran</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Kartu 2: Informasi Akun */}
      <section className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
        <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
          Informasi Akun
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block text-[11px] font-medium text-slate-400">
              Nama Lengkap
            </span>
            <p className="text-sm font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5">
              {name || '–'}
            </p>
          </div>
          <div>
            <span className="block text-[11px] font-medium text-slate-400">
              Email Terdaftar
            </span>
            <p className="text-sm font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5 font-mono">
              {email}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

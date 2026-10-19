import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface EmptyProfileProps {
  displayName: string;
}

/** Kerangka dasbor murid/pelatih dalam keadaan blur: bentuknya terlihat, datanya tidak. */
function BlurredDashboard() {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="blur-[4px] select-none pointer-events-none p-5 space-y-4" aria-hidden="true">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-32 rounded bg-slate-300" />
            <div className="h-2 w-20 rounded bg-slate-200" />
          </div>
          <div className="h-8 w-24 rounded-full bg-[#00B4D8]/50" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-3 space-y-2">
              <div className="h-2 w-12 rounded bg-slate-200" />
              <div className="h-4 w-16 rounded bg-slate-300" />
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5">
              <div className="w-6 h-6 rounded-full bg-slate-200" />
              <div className="h-2 flex-1 rounded bg-slate-200" />
              <div className="h-2 w-14 rounded bg-slate-300" />
            </div>
          ))}
        </div>
      </div>
      <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-semibold text-[#1D3557]/70 px-6 text-center">
        Dasbor murid / pelatih aktif setelah pendaftaran diverifikasi
      </span>
    </div>
  );
}

export const EmptyProfile: React.FC<EmptyProfileProps> = ({ displayName }) => {
  return (
    <div className="min-h-[75vh] py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-2xl mx-auto">
        <Card variant="dashboard" className="p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl shrink-0">
              👋
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1D3557]">
                Selamat Datang, {displayName}!
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Akun sudah terdaftar. Belum ada pendaftaran murid atau pelatih yang tersimpan.
              </p>
            </div>
          </div>

          <BlurredDashboard />

          <div className="space-y-3 pt-1">
            <p className="text-sm text-slate-600">
              Pilih jalur pendaftaran untuk membuka dasbor Anda:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/daftar/murid" className="flex-1">
                <Button variant="primary" size="md" isFullRounded={false} className="w-full">
                  Daftar Sebagai Murid
                </Button>
              </Link>
              <Link href="/daftar/guru" className="flex-1">
                <Button variant="outline" size="md" isFullRounded={false} className="w-full">
                  Daftar Sebagai Pelatih
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

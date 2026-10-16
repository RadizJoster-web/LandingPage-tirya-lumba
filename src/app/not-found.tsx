import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-50 text-center space-y-5">
        <div className="text-6xl">🤿</div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-[#00B4D8] uppercase tracking-wider">
            404 Halaman Tidak Ditemukan
          </p>
          <h1 className="font-heading font-extrabold text-3xl text-[#0077B6]">
            Terlalu Jauh Menyelam?
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan. Mari kembali ke permukaan!
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md" isFullRounded={true} className="shadow-md">
              Kembali ke Beranda 🌊
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

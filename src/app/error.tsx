'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js Segment Error caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-red-100 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-[#FF6F59] flex items-center justify-center text-3xl mx-auto">
          ⚠️
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-[#1D3557]">
          Terjadi Gangguan Sistem
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Mohon maaf, halaman ini mengalami kendala teknis saat memuat data. Silakan coba muat ulang atau kembali beberapa saat lagi.
        </p>

        <div className="pt-4 flex justify-center gap-3">
          <Link href="/">
            <Button variant="outline" size="md" isFullRounded={true}>
              Ke Beranda
            </Button>
          </Link>
          <Button
            variant="primary"
            size="md"
            isFullRounded={true}
            onClick={() => reset()}
          >
            Coba Lagi ↻
          </Button>
        </div>
      </div>
    </div>
  );
}

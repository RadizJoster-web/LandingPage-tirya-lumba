import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const SessionRenewalBanner: React.FC = () => {
  return (
    <section className="rounded-xl border-2 border-[#00B4D8] bg-gradient-to-r from-[#E0FBFC] via-white to-sky-50/50 p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="space-y-1.5">
          <Badge variant="azure" size="sm">
            Sesi Latihan Telah Selesai
          </Badge>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1D3557]">
            Waktunya Melanjutkan Latihan Renang Anda!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
            Paket latihan Anda sebelumnya telah rampung (0 pertemuan tersisa). Silakan lakukan pendaftaran ulang untuk memilih paket baru. Data diri Anda terisi secara otomatis.
          </p>
        </div>

        <Link href="/daftar/murid" className="shrink-0 self-start sm:self-auto">
          <Button
            variant="primary"
            size="md"
            isFullRounded={false}
            className="font-semibold flex items-center gap-2 shadow-sm"
          >
            <span>Daftar Ulang Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

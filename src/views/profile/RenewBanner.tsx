import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface RenewBannerProps {
  coachName: string;
}

export const RenewBanner: React.FC<RenewBannerProps> = ({ coachName }) => {
  return (
    <Card variant="dashboard" className="bg-[#E0FBFC] border-2 border-[#00B4D8] p-6 text-center space-y-3">
      <div className="text-3xl">🎉</div>
      <h3 className="font-heading font-extrabold text-xl text-[#0077B6]">
        Paket Kursus Anda Telah Selesai!
      </h3>
      <p className="text-sm text-slate-600 max-w-lg mx-auto">
        Selamat! Anda telah menyelesaikan seluruh 8 sesi latihan. Ingin melanjutkan ke tingkat kemahiran berikutnya bersama {coachName}?
      </p>
      <Link href="/daftar/murid" className="inline-block pt-1">
        <Button variant="primary" size="md" isFullRounded={false} className="shadow-md">
          Perpanjang Paket Renang Sekarang ↗
        </Button>
      </Link>
    </Card>
  );
};

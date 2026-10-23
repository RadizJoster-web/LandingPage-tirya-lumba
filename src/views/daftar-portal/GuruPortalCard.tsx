import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const GuruPortalCard: React.FC = () => {
  return (
    <Card
      variant="landing"
      className="p-8 flex flex-col justify-between border-2 border-transparent hover:border-[#0077B6] group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-60" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0077B6] flex items-center justify-center text-3xl mb-6 shadow-xs group-hover:scale-110 transition-transform">
          🎓
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-[#0077B6] mb-3">
          Daftar sebagai Pelatih
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Bergabunglah dengan jaringan pelatih PT Tirya Lumba. Dapatkan kemudahan manajemen jadwal mengajar tanpa perlu bolak-balik fisik mengecek absensi manual.
        </p>
        <ul className="space-y-2 text-xs font-medium text-slate-500 mb-8">
          <li className="flex items-center gap-2">
            <span className="text-[#0077B6]">✓</span> Pilih lokasi kolam yang Anda sanggupi
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#0077B6]">✓</span> Tentukan sesi ketersediaan mengajar
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#0077B6]">✓</span> Pengajuan reschedule jadwal langsung ke admin
          </li>
        </ul>
      </div>

      <Link href="/daftar/guru" className="relative z-10">
        <Button
          variant="outline"
          size="md"
          isFullRounded={true}
          className="w-full"
        >
          Lanjut Daftar Pelatih →
        </Button>
      </Link>
    </Card>
  );
};

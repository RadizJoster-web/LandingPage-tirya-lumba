import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const MuridPortalCard: React.FC = () => {
  return (
    <Card
      variant="landing"
      className="p-8 flex flex-col justify-between border-2 border-transparent hover:border-[#00B4D8] group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0FBFC] rounded-bl-full -z-0 opacity-60" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-3xl mb-6 shadow-xs group-hover:scale-110 transition-transform">
          🏊
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-[#0077B6] mb-3">
          Daftar sebagai Murid
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Ikuti kelas kursus renang profesional bersama instruktur bersertifikat. Tersedia program Reguler, Privat, Prestasi, dan Ekstrakurikuler di berbagai kolam mitra.
        </p>
        <ul className="space-y-2 text-xs font-medium text-slate-500 mb-8">
          <li className="flex items-center gap-2">
            <span className="text-[#00B4D8]">✓</span> Jadwal dan lokasi kolam fleksibel
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00B4D8]">✓</span> Pembayaran QRIS / Transfer / Tunai
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00B4D8]">✓</span> Status pendaftaran &amp; verifikasi tampil di profil
          </li>
        </ul>
      </div>

      <Link href="/daftar/murid" className="relative z-10">
        <Button
          variant="primary"
          size="md"
          isFullRounded={true}
          className="w-full shadow-md"
        >
          Lanjut Daftar Murid →
        </Button>
      </Link>
    </Card>
  );
};

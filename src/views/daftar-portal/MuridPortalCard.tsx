import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight } from 'lucide-react';

export const MuridPortalCard: React.FC = () => {
  return (
    <Card
      variant="landing"
      className="p-7 sm:p-8 flex flex-col justify-between border-2 border-slate-200/80 hover:border-[#00B4D8] group relative overflow-hidden transition-all duration-300 dark:border-slate-800 dark:hover:border-[#00B4D8]"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <Badge variant="azure" size="sm">
            Program Murid
          </Badge>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Jalur 01
          </span>
        </div>

        <h2 className="font-heading font-bold text-2xl text-[#1D3557] mb-3 group-hover:text-[#0077B6] transition-colors dark:text-slate-100">
          Daftar sebagai Murid
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Ikuti kelas kursus renang terstruktur bersama pelatih resmi. Pilihan paket Reguler, Privat, dan Prestasi di kolam mitra terdekat.
        </p>

        {/* Clean > typographic list items */}
        <div className="space-y-2.5 text-xs font-medium text-slate-600 mb-8 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span> Pilih kolam mitra dan sesi waktu fleksibel
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span> Metode pembayaran QRIS, Transfer Bank, atau Tunai
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0077B6]">&gt;</span> Pantau jadwal latihan dan absensi dari profil
          </div>
        </div>
      </div>

      <Link href="/daftar/murid" className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          variant="primary"
          size="md"
          isFullRounded={true}
          className="w-full flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md"
        >
          <span>Lanjut Pendaftaran Murid</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </Card>
  );
};

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PlatformStats } from '@/services/api';

interface WhyUsSectionProps {
  stats: PlatformStats;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ stats }) => {
  return (
    <section id="kenapa-pilih-kami" className="py-24 bg-[#E0FBFC]/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-[#0077B6] border border-[#00B4D8]/30 mb-3 shadow-xs">
          <span>✨</span> Keunggulan Kami
        </div>

        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight max-w-2xl mx-auto">
          Mengapa Mempercayakan Orang Tersayang di Tirya Lumba?
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Kami memberikan bimbingan renang berstandar tinggi dengan ekosistem belajar yang aman, ramah anak, dan terstruktur.
        </p>

        {/* 3 Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-14 text-left">
          <Card variant="landing" className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl font-bold">
              🎓
            </div>
            <h3 className="font-heading font-bold text-xl text-[#0077B6]">
              Guru Berkualitas & Berlisensi
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Seluruh pelatih telah tersertifikasi oleh PRSI dan dibekali sertifikasi keselamatan air (Water Safety & First Aid). Ramah, sabar, dan komunikatif.
            </p>
          </Card>

          <Card variant="landing" className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl font-bold">
              🕒
            </div>
            <h3 className="font-heading font-bold text-xl text-[#0077B6]">
              Jadwal & Lokasi Fleksibel
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bebas tentukan hari, jam (pagi, siang, atau sore), serta pilihan kolam renang mitra terdekat dari domisili Anda di Tangerang Raya.
            </p>
          </Card>

          <Card variant="landing" className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl font-bold">
              🛡️
            </div>
            <h3 className="font-heading font-bold text-xl text-[#0077B6]">
              Kurikulum Aman & Terarah
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Metode pengajaran bertahap dari pemula sampai gaya kompetisi. Progres murid terpantau rapi dalam sistem digital tanpa khawatir jadwal bentrok.
            </p>
          </Card>
        </div>

        {/* Real Dynamic / Parallel Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto py-8 px-6 bg-white rounded-3xl shadow-lg shadow-blue-900/5 border border-blue-50 mb-12">
          <div className="space-y-1">
            <div className="font-heading font-extrabold text-4xl sm:text-5xl text-[#00B4D8]">
              {stats.totalStudents.toLocaleString('id-ID')}+
            </div>
            <p className="text-sm font-semibold text-slate-600">Total Murid Dilatih</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-x border-slate-100 pt-4 sm:pt-0">
            <div className="font-heading font-extrabold text-4xl sm:text-5xl text-[#0077B6]">
              {stats.totalCoaches}
            </div>
            <p className="text-sm font-semibold text-slate-600">Pelatih Berpengalaman</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0">
            <div className="font-heading font-extrabold text-4xl sm:text-5xl text-[#00B4D8]">
              {stats.totalPartnerPools}
            </div>
            <p className="text-sm font-semibold text-slate-600">Kolam Renang Mitra</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/daftar/murid">
          <Button variant="primary" size="lg" isFullRounded={true} className="shadow-lg hover:scale-105">
            Daftar Sebagai Murid
          </Button>
        </Link>
      </div>
    </section>
  );
};

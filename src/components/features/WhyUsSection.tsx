import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface WhyUsSectionProps {
  /** Angka nyata dari API: jumlah kolam mitra, wilayah, dan jenis kelas yang tersedia. */
  stats: {
    totalPartnerPools: number;
    totalAreas: number;
    totalClassTypes: number;
  };
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ stats }) => {
  const statItems = [
    { value: stats.totalPartnerPools, label: 'Kolam Renang Mitra', color: 'text-[#00B4D8]' },
    { value: stats.totalAreas, label: 'Wilayah Layanan', color: 'text-[#0077B6]' },
    { value: stats.totalClassTypes, label: 'Jenis Kelas Tersedia', color: 'text-[#00B4D8]' },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-14 text-left">
          <Card variant="landing" className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl font-bold">
              🎓
            </div>
            <h3 className="font-heading font-bold text-xl text-[#0077B6]">
              Guru Berkualitas &amp; Berlisensi
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Setiap pelatih yang tampil di sistem sudah terverifikasi admin: lisensi pelatih, pengalaman mengajar, dan jadwal ketersediaannya tercatat resmi.
            </p>
          </Card>

          <Card variant="landing" className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl font-bold">
              🕒
            </div>
            <h3 className="font-heading font-bold text-xl text-[#0077B6]">
              Jadwal &amp; Lokasi Fleksibel
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pilih kolam terdekat, hari, dan sesi jam les langsung dari jadwal asli pada sistem. Pelatih yang muncul sudah otomatis tersaring sesuai pilihanmu.
            </p>
          </Card>

          <Card variant="landing" className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl font-bold">
              🛡️
            </div>
            <h3 className="font-heading font-bold text-xl text-[#0077B6]">
              Kurikulum Aman &amp; Terarah
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Metode pengajaran bertahap dari pemula sampai gaya kompetisi. Status pendaftaran dan verifikasi tercatat digital tanpa jadwal bentrok.
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto py-8 px-6 bg-white rounded-3xl shadow-lg shadow-blue-900/5 border border-blue-50 mb-12">
          {statItems.map((item, index) => (
            <div
              key={item.label}
              className={`space-y-1 ${
                index > 0 ? 'border-t sm:border-t-0 sm:border-x border-slate-100 pt-4 sm:pt-0' : ''
              }`}
            >
              <div className={`font-heading font-extrabold text-4xl sm:text-5xl ${item.color}`}>
                {item.value}
              </div>
              <p className="text-sm font-semibold text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>

        <Link href="/daftar/murid">
          <Button variant="primary" size="lg" isFullRounded={true} className="shadow-lg hover:scale-105">
            Daftar Sebagai Murid
          </Button>
        </Link>
      </div>
    </section>
  );
};

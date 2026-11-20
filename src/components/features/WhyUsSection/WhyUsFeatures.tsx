import React from 'react';
import { Award, Calendar, ShieldCheck } from 'lucide-react';

export const WhyUsFeatures: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Instruktur Berlisensi Resmi',
      description:
        'Seluruh pelatih renang kami telah terverifikasi secara ketat dengan lisensi kepelatihan resmi, rekam jejak pengajaran, dan dedikasi keselamatan tinggi.',
    },
    {
      icon: Calendar,
      title: 'Jadwal & Lokasi Fleksibel',
      description:
        'Pilih kolam renang mitra terdekat, hari latihan, dan jam sesi yang paling sesuai dengan rutinitas harian Anda tanpa bentrok.',
    },
    {
      icon: ShieldCheck,
      title: 'Kurikulum Aman & Terukur',
      description:
        'Metode bimbingan terstruktur mulai dari adaptasi rasa percaya diri di air hingga penyempurnaan teknik gaya renang yang efisien.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 text-left">
      {features.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.title}
            className="rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:border-sky-200 hover:shadow-md transition-all duration-200 dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0077B6] flex items-center justify-center mb-4 dark:bg-slate-800 dark:text-sky-400">
              <IconComponent className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#1D3557] mb-2 dark:text-slate-100">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

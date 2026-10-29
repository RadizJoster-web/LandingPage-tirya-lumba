'use client';

import React from 'react';
import { MotionStagger, MotionStaggerItem, motion } from '@/components/ui/motion';

export const WhyUsFeatures: React.FC = () => {
  const features = [
    {
      title: 'Instruktur Berlisensi Resmi',
      description:
        'Seluruh pelatih renang kami telah terverifikasi secara ketat: lisensi kepelatihan, rekam jejak pengajaran, dan dedikasi pedagogis.',
    },
    {
      title: 'Jadwal & Lokasi Fleksibel',
      description:
        'Pilih kolam renang mitra terdekat, hari, dan sesi waktu latihan yang paling sesuai dengan jadwal harian Anda secara real-time.',
    },
    {
      title: 'Kurikulum Aman & Terukur',
      description:
        'Metode bimbingan bertahap dari adaptasi air untuk pemula hingga pembinaan teknik dan stamina atlet tanpa risiko jadwal bentrok.',
    },
  ];

  return (
    <MotionStagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
      {features.map((item, idx) => (
        <MotionStaggerItem key={item.title} direction="up" distance={20} duration={0.5}>
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
            className="h-full rounded-2xl bg-white/70 backdrop-blur-xs p-6 sm:p-7 border border-slate-200/60 shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-slate-900/60 dark:border-slate-800"
          >
            <span className="text-xs font-bold text-[#00B4D8] font-heading block mb-3">
              0{idx + 1}
            </span>
            <h3 className="font-heading font-bold text-lg text-[#1D3557] mb-2 dark:text-slate-100">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed dark:text-slate-400">
              {item.description}
            </p>
          </motion.div>
        </MotionStaggerItem>
      ))}
    </MotionStagger>
  );
};

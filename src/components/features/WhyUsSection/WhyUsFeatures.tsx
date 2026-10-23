import React from 'react';
import { Card } from '@/components/ui/Card';

export const WhyUsFeatures: React.FC = () => {
  return (
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
  );
};

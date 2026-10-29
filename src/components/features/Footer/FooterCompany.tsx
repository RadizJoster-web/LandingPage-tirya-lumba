import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const FooterCompany: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#00B4D8] flex items-center justify-center text-white">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12c.6.5 1.2.8 2.5.8 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.2 0 1.9.3 2.5.8" />
            <path d="M2 16c.6.5 1.2.8 2.5.8 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.2 0 1.9.3 2.5.8" />
          </svg>
        </div>
        <span className="font-heading font-extrabold text-xl text-white tracking-tight">
          PT Tirya Lumba
        </span>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed max-w-md">
        Pusat pelatihan renang profesional untuk semua usia di Tangerang Raya. Menghadirkan pelatih berlisensi PRSI dengan kurikulum bertahap dan lokasi kolam mitra terdekat.
      </p>
      <div className="text-xs text-slate-400 space-y-2 pt-2">
        <p className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
          Jl. Boulevard Raya No. 8, Tangerang, Banten
        </p>
        <p className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
          0812-3456-7890 (Customer Service)
        </p>
        <p className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
          halo@tiryalumba.id
        </p>
      </div>
    </div>
  );
};

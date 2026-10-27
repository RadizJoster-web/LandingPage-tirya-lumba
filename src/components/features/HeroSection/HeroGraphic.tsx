import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight } from 'lucide-react';

interface HeroGraphicProps {
  totalPartnerPools: number;
}

export const HeroGraphic: React.FC<HeroGraphicProps> = ({ totalPartnerPools }) => {
  const displayPools = totalPartnerPools > 0 ? totalPartnerPools : 12;

  return (
    <div className="lg:col-span-5 flex justify-center">
      {/* Layered floating outer container (inspired by style.jpg) */}
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl bg-[#E0FBFC]/40 p-5 sm:p-7 border border-slate-200/60 shadow-lg shadow-blue-900/5 relative">
          {/* Main Hero Showcase Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-blue-950/5 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Jaringan Kolam Mitra
              </span>
              <Badge variant="azure" size="sm">
                Aktif
              </Badge>
            </div>

            <div className="mt-4">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0077B6] font-heading tabular-nums">
                {displayPools}
              </div>
              <p className="mt-1 text-sm font-medium text-[#1D3557]">
                Lokasi Kolam di Tangerang Raya
              </p>
            </div>

            {/* Inner Comparison / Spec Row */}
            <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Kurikulum
                </span>
                <p className="text-sm font-bold text-[#1D3557] mt-0.5">
                  Standar PRSI
                </p>
              </div>
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Kategori
                </span>
                <p className="text-sm font-bold text-[#1D3557] mt-0.5">
                  Reguler &amp; Privat
                </p>
              </div>
            </div>
          </div>

          {/* Floating Metric Badge 1 (Top-right overlap) */}
          <div className="absolute -top-5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl shadow-blue-950/10 border border-slate-100/90 hidden sm:block animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Pendaftaran
              </span>
            </div>
            <p className="text-base font-extrabold text-[#1D3557] mt-1 font-heading">
              100% Online
            </p>
          </div>

          {/* Floating Metric Badge 2 (Bottom-left overlap) */}
          <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl shadow-blue-950/10 border border-slate-100/90 flex items-center gap-4 animate-fade-in">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Pelatih Resmi
              </span>
              <p className="text-sm font-bold text-[#1D3557] font-heading mt-0.5">
                Bersertifikat PRSI
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#E0FBFC] flex items-center justify-center text-[#0077B6]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

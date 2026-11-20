import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroContentProps {
  totalPartnerPools: number;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  totalPartnerPools,
}) => {
  return (
    <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
      {/* Sleek Pill Badge */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-pulse" />
        <span className="text-xs font-semibold tracking-wide text-slate-600">
          Sekolah Renang Profesional • Tangerang Raya
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-[#1D3557] leading-[1.14] tracking-tight">
        Selami Kepercayaan Diri, Kuasai Air Bersama{' '}
        <span className="text-[#0077B6] relative inline-block">
          Tirya Lumba
          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#00B4D8]/30 rounded-full" />
        </span>
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
        Bimbingan kursus renang aman, bertahap, dan terstruktur bersama pelatih
        resmi berlisensi di {totalPartnerPools > 0 ? `${totalPartnerPools} ` : ''}kolam mitra
        terdekat dari tempat tinggal Anda.
      </p>

      {/* Primary & Secondary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
        <Link href="/daftar" className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            isFullRounded={true}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <span>Daftar Sekarang</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
        <Link href="/#tentang-kami" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            isFullRounded={true}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold border-slate-200 bg-white/80 text-[#1D3557] hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-[0.98]"
          >
            Tentang Kami
          </Button>
        </Link>
      </div>

      {/* Clean Feature Highlights with Minimalist Badges */}
      <div className="pt-6 border-t border-slate-200/80 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0077B6] shrink-0" />
          <span>Pelatih Bersertifikat Resmi</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0077B6] shrink-0" />
          <span>Jadwal Latihan Fleksibel</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0077B6] shrink-0" />
          <span>Pendaftaran 100% Online</span>
        </div>
      </div>
    </div>
  );
};

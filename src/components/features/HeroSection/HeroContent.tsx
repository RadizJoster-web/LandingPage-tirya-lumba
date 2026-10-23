import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface HeroContentProps {
  totalPartnerPools: number;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  totalPartnerPools,
}) => {
  return (
    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#00B4D8]/30 shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00B4D8] animate-pulse" />
        <span className="text-xs sm:text-sm font-semibold text-[#0077B6]">
          Sekolah Renang Terpercaya di Tangerang Raya
        </span>
      </div>

      <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#0077B6] leading-[1.15] tracking-tight">
        Selami Kepercayaan Diri Bersama{' '}
        <span className="text-[#00B4D8] underline decoration-[#FF6F59]/50 underline-offset-8">
          Tirya Lumba
        </span>
      </h1>

      <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
        Belajar berenang dengan aman, menyenangkan, dan berjenjang bersama pelatih
        berlisensi di {totalPartnerPools > 0 ? `${totalPartnerPools} ` : ''}kolam mitra
        terbaik dekat rumah Anda.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
        <Link href="/daftar" className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            isFullRounded={true}
            className="w-full sm:w-auto shadow-md hover:scale-105"
          >
            Daftar Sekarang
          </Button>
        </Link>
        <Link href="/#tentang-kami" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            isFullRounded={true}
            className="w-full sm:w-auto"
          >
            Tentang Kami
          </Button>
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="pt-6 border-t border-blue-100 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-xs sm:text-sm text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="text-[#00B4D8] font-bold text-base">✓</span> Pelatih Bersertifikat
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#00B4D8] font-bold text-base">✓</span> Jadwal Fleksibel
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#00B4D8] font-bold text-base">✓</span> Pendaftaran Digital Praktis
        </div>
      </div>
    </div>
  );
};

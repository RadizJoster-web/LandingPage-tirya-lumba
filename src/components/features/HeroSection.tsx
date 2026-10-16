import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E0FBFC] via-white to-[#F8F9FA] pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background aquatic ambient glow circles */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#0077B6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
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
              Belajar berenang dengan aman, menyenangkan, dan berjenjang bersama 37+ pelatih bersertifikat PRSI di kolam mitra terbaik dekat rumah Anda.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/daftar" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" isFullRounded={true} className="w-full sm:w-auto shadow-md hover:scale-105">
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href="/#tentang-kami" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" isFullRounded={true} className="w-full sm:w-auto">
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

          {/* Right Visual Graphic Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glassmorphic card illustration wrapper */}
              <div className="relative rounded-3xl bg-gradient-to-tr from-[#0077B6] via-[#00B4D8] to-[#90e0ef] p-6 shadow-2xl shadow-blue-900/20 text-white overflow-hidden">
                <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-[#FF6F59]/30 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-6">
                  {/* Decorative Waves SVG */}
                  <div className="h-44 sm:h-52 flex items-center justify-center">
                    <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow-md">
                      <defs>
                        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 10,80 Q 80,40 160,80 T 310,80"
                        fill="none"
                        stroke="url(#waveGrad)"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 10,120 Q 80,80 160,120 T 310,120"
                        fill="none"
                        stroke="url(#waveGrad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 10,160 Q 80,120 160,160 T 310,160"
                        fill="none"
                        stroke="url(#waveGrad)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Swimming circle / float ring */}
                      <circle cx="240" cy="50" r="22" fill="#FF6F59" opacity="0.9" />
                      <circle cx="240" cy="50" r="12" fill="#ffffff" />
                    </svg>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-wider text-blue-100">
                        Metode Belajar
                      </span>
                      <span className="text-xs bg-[#FF6F59] px-2.5 py-0.5 rounded-full font-bold">
                        PRSI Standard
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold">
                      Pengenalan Air → Gaya Dada → Bebas → Prestasi
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-blue-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0FBFC] flex items-center justify-center text-lg">
                  🏊
                </div>
                <div>
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <p className="text-xs font-bold text-[#1D3557]">2.500+ Murid Lulus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

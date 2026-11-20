import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0077B6]">
        <span>Tentang PT Tirya Lumba</span>
      </div>

      <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1D3557] tracking-tight leading-tight dark:text-slate-100">
        Membangun Kepercayaan Diri di Atas Air Sejak 2012
      </h2>

      <p className="text-base text-slate-600 leading-relaxed dark:text-slate-300">
        PT Tirya Lumba adalah lembaga pelatihan dan kursus renang terkemuka di Tangerang Raya
        yang berfokus pada keselamatan, pembentukan karakter, dan pengembangan potensi
        olahraga renang bagi balita, anak-anak, remaja, hingga dewasa pemula.
      </p>

      {/* Structured clean value list with accessible check badges */}
      <div className="space-y-3 pt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-1 rounded-full bg-sky-50 text-[#0077B6] shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span>Kurikulum Bertahap Berstandar PRSI &amp; World Aquatics</span>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-1 rounded-full bg-sky-50 text-[#0077B6] shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span>Pelatih Resmi Berpengalaman &amp; Terverifikasi Ketat</span>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-1 rounded-full bg-sky-50 text-[#0077B6] shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span>Sistem Pendaftaran &amp; Penjadwalan Terintegrasi Digital</span>
        </div>
      </div>

      {/* Interactive Link with subtle arrow movement */}
      <div className="pt-2">
        <Link
          href="/#kenapa-pilih-kami"
          className="group inline-flex items-center gap-2 font-heading font-semibold text-sm text-[#0077B6] hover:text-[#00B4D8] transition-colors"
        >
          <span>Kenal kami lebih dalam</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

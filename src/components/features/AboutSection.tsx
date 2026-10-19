import React from 'react';
import Link from 'next/link';

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang-kami" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#E0FBFC] text-[#0077B6] mb-4">
              <span>🐬</span> Tentang PT Tirya Lumba
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight mb-6">
              Membangun Kepercayaan Diri di Atas Air Sejak 2012
            </h2>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                PT Tirya Lumba adalah lembaga pelatihan dan kursus renang terkemuka di Tangerang Raya
                yang berfokus pada keselamatan, pembentukan karakter, dan pengembangan potensi
                olahraga renang. Kami telah mendampingi ribuan murid, mulai dari usia balita,
                anak-anak, remaja, hingga dewasa pemula.
              </p>
              <p>
                Dengan didukung pelatih bersertifikasi resmi PRSI dan kurikulum bertahap berbasis
                kenyamanan air, setiap peserta dibimbing sampai memiliki teknik bernapas yang benar,
                daya tahan, bahkan dipersiapkan menjadi atlet berprestasi.
              </p>
            </div>

            {/* Tautan dengan garis bawah yang muncul saat hover, bukan tombol kaku. */}
            <div className="mt-8">
              <Link
                href="/#kenapa-pilih-kami"
                className="group relative inline-flex items-center gap-2 font-heading font-bold text-base sm:text-lg text-[#0077B6] py-1 cursor-pointer"
              >
                <span>Kenal kami lebih dalam</span>
                <span className="text-[#00B4D8] transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
                <span className="absolute left-0 bottom-0 w-full h-[2.5px] bg-[#00B4D8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
              </Link>
            </div>
          </div>

          {/* Foto kegiatan: SVG lokal agar tidak bergantung pada aset eksternal. */}
          <figure className="relative">
            <div className="absolute -inset-4 bg-[#E0FBFC] rounded-3xl rotate-2" aria-hidden="true" />
            <svg
              viewBox="0 0 640 480"
              role="img"
              aria-label="Ilustrasi kelas renang PT Tirya Lumba"
              className="relative w-full h-auto rounded-3xl shadow-xl shadow-blue-900/10"
            >
              <defs>
                <linearGradient id="aboutSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E0FBFC" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <linearGradient id="aboutWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00B4D8" />
                  <stop offset="100%" stopColor="#0077B6" />
                </linearGradient>
              </defs>

              <rect width="640" height="480" fill="url(#aboutSky)" />

              {/* Garis lintasan kolam */}
              <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="6">
                <line x1="0" y1="300" x2="640" y2="300" />
                <line x1="0" y1="360" x2="640" y2="360" />
                <line x1="0" y1="420" x2="640" y2="420" />
              </g>

              <path d="M0 280 Q 160 250 320 280 T 640 280 L640 480 L0 480 Z" fill="url(#aboutWater)" />

              {/* Pelampung */}
              <circle cx="470" cy="250" r="46" fill="#FF6F59" />
              <circle cx="470" cy="250" r="24" fill="#ffffff" />

              {/* Perenang */}
              <g fill="#1D3557">
                <circle cx="250" cy="248" r="18" />
                <path d="M268 252 q60 10 110 -18 q10 -5 14 6 q-52 40 -124 30 z" />
                <path d="M232 252 q-40 4 -66 26 q-8 8 -18 0 q24 -34 84 -38 z" />
              </g>

              {/* Riak air */}
              <g stroke="#ffffff" strokeOpacity="0.6" strokeWidth="5" fill="none" strokeLinecap="round">
                <path d="M180 330 q30 -14 60 0 t60 0" />
                <path d="M380 380 q30 -14 60 0 t60 0" />
                <path d="M90 400 q30 -14 60 0 t60 0" />
              </g>
            </svg>

            <figcaption className="relative mt-6 sm:mt-8 sm:absolute sm:-bottom-6 sm:left-6 sm:mt-0 bg-white rounded-2xl px-5 py-3 shadow-lg border border-blue-50">
              <p className="font-heading font-bold text-sm text-[#1D3557]">Kurikulum PRSI</p>
              <p className="text-xs text-slate-500">Bertahap, aman, dan terukur</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

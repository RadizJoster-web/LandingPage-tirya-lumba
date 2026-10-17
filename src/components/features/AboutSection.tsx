import React from 'react';
import Link from 'next/link';

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang-kami" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#E0FBFC] text-[#0077B6] mb-4">
          <span>🐬</span> Tentang PT Tirya Lumba
        </div>

        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight mb-6">
          Membangun Kepercayaan Diri di Atas Air Sejak 2012
        </h2>

        <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          <p>
            PT Tirya Lumba adalah lembaga pelatihan dan kursus renang terkemuka di Tangerang Raya yang berfokus pada keselamatan, pembentukan karakter, dan pengembangan potensi olahraga renang. Kami telah mendampingi ribuan murid, mulai dari usia balita, anak-anak, remaja, hingga dewasa pemula.
          </p>
          <p>
            Dengan didukung oleh pelatih bersertifikasi resmi PRSI (Persatuan Renang Seluruh Indonesia) dan kurikulum bertahap berbasis kenyamanan air (*water comfort*), kami memastikan setiap peserta tidak hanya bisa berenang, namun memiliki teknik bernafas yang benar, daya tahan, bahkan dipersiapkan menjadi atlet renang berprestasi.
          </p>
        </div>

        {/* Modern animated link with bottom hover reveal, not a stiff button */}
        <div className="mt-8 pt-4">
          <Link
            href="/#kenapa-pilih-kami"
            className="group relative inline-flex items-center gap-2 font-heading font-bold text-base sm:text-lg text-[#0077B6] py-1 cursor-pointer"
          >
            <span>Kenal kami lebih dalam</span>
            <span className="text-[#00B4D8] transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
            {/* Hover underline animation from bottom */}
            <span className="absolute left-0 bottom-0 w-full h-[2.5px] bg-[#00B4D8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
          </Link>
        </div>
      </div>
    </section>
  );
};

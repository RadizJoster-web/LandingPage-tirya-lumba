import React from 'react';
import Link from 'next/link';

export const AboutContent: React.FC = () => {
  return (
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
  );
};

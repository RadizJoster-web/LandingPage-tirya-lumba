import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1D3557] text-slate-300 pt-14 pb-8 border-t border-blue-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Brief */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#00B4D8] flex items-center justify-center text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12c.6.5 1.2.8 2.5.8 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.2 0 1.9.3 2.5.8" />
                  <path d="M2 16c.6.5 1.2.8 2.5.8 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.2 0 1.9.3 2.5.8" />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                PT Tirya Lumba
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Pusat pelatihan renang profesional untuk semua usia di Tangerang Raya. Menghadirkan pelatih berlisensi PRSI dengan metode bertahap dan lokasi kolam mitra terdekat.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 pt-1">
              <p className="flex items-center gap-2">
                <span>📍</span> Jl. Boulevard Raya No. 8, Tangerang, Banten
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span> 0812-3456-7890 (Customer Service)
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span> halo@tiryalumba.id
              </p>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide">
              Sitemap
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#00B4D8] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#program" className="hover:text-[#00B4D8] transition-colors">
                  Program & Kolam
                </Link>
              </li>
              <li>
                <Link href="/#tentang-kami" className="hover:text-[#00B4D8] transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="hover:text-[#00B4D8] transition-colors">
                  Portal Pendaftaran
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#00B4D8] transition-colors">
                  Masuk Akun
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide">
              Media Sosial
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B4D8] transition-colors flex items-center gap-2"
                >
                  <span>📷</span> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B4D8] transition-colors flex items-center gap-2"
                >
                  <span>▶️</span> YouTube Channel
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B4D8] transition-colors flex items-center gap-2"
                >
                  <span>💬</span> WhatsApp Konsultasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-700/60 text-center text-xs text-slate-400">
          <p>© 2026 PT Tirya Lumba. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
};

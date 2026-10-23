import React from 'react';
import Link from 'next/link';

export const FooterSitemap: React.FC = () => {
  return (
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
            Program &amp; Kolam
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
  );
};

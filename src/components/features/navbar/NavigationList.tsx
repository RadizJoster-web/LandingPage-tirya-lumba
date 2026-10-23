import React from 'react';
import Link from 'next/link';

export const NavigationList: React.FC = () => {
  return (
    <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#1D3557]">
      <Link href="/" className="hover:text-[#00B4D8] transition-colors">
        Beranda
      </Link>
      <Link href="/#program" className="hover:text-[#00B4D8] transition-colors">
        Program
      </Link>
      <Link href="/#tentang-kami" className="hover:text-[#00B4D8] transition-colors">
        Tentang Kami
      </Link>
      <Link href="/#kenapa-pilih-kami" className="hover:text-[#00B4D8] transition-colors">
        Kenapa Kami
      </Link>
    </div>
  );
};

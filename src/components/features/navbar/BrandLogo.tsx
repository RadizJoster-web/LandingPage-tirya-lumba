import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const BrandLogo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
        <Image
          src="/favicon.jpg"
          alt="Logo Tirya Lumba"
          fill
          sizes="40px"
          className="object-cover scale-105"
          priority
        />
      </div>
      <span className="font-heading font-extrabold text-xl text-[#0077B6] tracking-tight">
        Tirya Lumba
      </span>
    </Link>
  );
};

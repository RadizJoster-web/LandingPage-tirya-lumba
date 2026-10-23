import React from 'react';
import Link from 'next/link';

export const BrandLogo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-full bg-[#00B4D8] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12c.6.5 1.2.8 2.5.8 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.2 0 1.9.3 2.5.8" />
          <path d="M2 16c.6.5 1.2.8 2.5.8 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.2 0 1.9.3 2.5.8" />
        </svg>
      </div>
      <span className="font-heading font-extrabold text-xl text-[#0077B6] tracking-tight">
        Tirya Lumba
      </span>
    </Link>
  );
};

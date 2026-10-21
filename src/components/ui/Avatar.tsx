'use client';

import React, { useState } from 'react';
import { cn, mediaUrl } from '@/lib/utils';

export interface AvatarProps {
  /** Nama lengkap dari payload user; dipakai untuk inisial bila foto tidak ada. */
  name: string;
  /** Path/nilai `profilePictureUrl` dari payload user. */
  src?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-20 h-20 text-2xl',
};

/** Inisial satu huruf yang aman untuk nama kosong. */
export function initialOf(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '👤';
}

/** Foto profil user dengan validasi: URL kosong atau gagal dimuat jatuh ke inisial. */
export const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'md', className }) => {
  const [failed, setFailed] = useState(false);
  const url = mediaUrl(src);

  return (
    <span
      className={cn(
        'shrink-0 rounded-full bg-[#00B4D8] text-white font-bold flex items-center justify-center overflow-hidden',
        SIZES[size],
        className,
      )}
    >
      {url && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element -- URL dinamis dari server.
        <img
          src={url}
          alt={name}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        initialOf(name)
      )}
    </span>
  );
};

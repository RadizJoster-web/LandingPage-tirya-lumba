'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AuthUser, RegistrationSnapshot } from '@/types';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { ProfileMenu } from './ProfileMenu';

interface NavAuthButtonsProps {
  user: AuthUser | null;
  registration: RegistrationSnapshot | null;
  isLoading: boolean;
  onLogout: () => void;
}

/** Satu tombol profil + dropdown; pendaftaran dan keluar berada di dalam panel. */
export const NavAuthButtons: React.FC<NavAuthButtonsProps> = ({
  user,
  registration,
  isLoading,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  if (isLoading) {
    return <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-full" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="outline" size="sm" isFullRounded={true}>
            Masuk
          </Button>
        </Link>
        <Link href="/register">
          <Button variant="primary" size="sm" isFullRounded={true}>
            Daftar Akun
          </Button>
        </Link>
      </div>
    );
  }

  const name = user.fullName || user.email;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full border border-[#00B4D8]/30 bg-white py-1 pl-1 pr-3 transition-colors hover:bg-[#E0FBFC] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:ring-offset-2"
      >
        <Avatar name={name} src={user.profilePictureUrl} size="sm" />
        <span className="max-w-[130px] truncate text-sm font-semibold text-[#0077B6]">
          {name}
        </span>
        <svg
          className={`h-3.5 w-3.5 text-[#0077B6] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>

      {isOpen && (
        <ProfileMenu
          user={user}
          registration={registration}
          onNavigate={() => setIsOpen(false)}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

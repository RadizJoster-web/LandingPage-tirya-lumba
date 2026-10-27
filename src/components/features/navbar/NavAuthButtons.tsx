'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AuthUser, RegistrationSnapshot } from '@/types';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { ProfileMenu } from './ProfileMenu';
import { ChevronDown } from 'lucide-react';

interface NavAuthButtonsProps {
  user: AuthUser | null;
  registration: RegistrationSnapshot | null;
  isLoading: boolean;
  onLogout: () => void;
}

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
    return <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-full" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm" isFullRounded={true} className="text-[#1D3557]">
            Masuk
          </Button>
        </Link>
        <Link href="/register">
          <Button variant="primary" size="sm" isFullRounded={true}>
            Daftar
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
        className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1 pl-1.5 pr-3.5 shadow-xs transition-all hover:border-[#00B4D8] hover:bg-[#E0FBFC]/20 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
      >
        <Avatar name={name} src={user.profilePictureUrl} size="sm" />
        <span className="text-xs font-semibold text-[#1D3557] truncate max-w-[120px]">
          Profil Saya
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0077B6]' : ''}`}
        />
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

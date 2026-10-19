'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AuthUser, RegistrationSnapshot } from '@/types';
import { Button } from '@/components/ui/Button';

interface NavAuthButtonsProps {
  user: AuthUser | null;
  displayName: string;
  registration: RegistrationSnapshot | null;
  isLoading: boolean;
  onLogout: () => void;
}

const ROLE_LABEL: Record<string, string> = {
  STUDENT: 'Murid',
  INSTRUCTOR: 'Pelatih',
  ADMIN: 'Admin',
  POOL_MANAGER: 'Pengelola Kolam',
};

/** Satu tombol profil + dropdown; pendaftaran dan keluar berada di dalam panel. */
export const NavAuthButtons: React.FC<NavAuthButtonsProps> = ({
  user,
  displayName,
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

  const initial = displayName.trim().charAt(0).toUpperCase() || '👤';

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full bg-[#E0FBFC] hover:bg-[#c9f5f7] pl-1 pr-3 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:ring-offset-2"
      >
        <span className="w-7 h-7 rounded-full bg-[#00B4D8] text-white text-xs font-bold flex items-center justify-center">
          {initial}
        </span>
        <span className="max-w-[130px] truncate text-sm font-semibold text-[#0077B6]">
          {displayName}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-[#0077B6] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-blue-50 shadow-xl shadow-blue-900/10 p-4 space-y-3"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#00B4D8] text-white text-sm font-bold flex items-center justify-center">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="font-heading font-bold text-sm text-[#1D3557] truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          <p className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0FBFC] text-[11px] font-semibold text-[#0077B6]">
            {ROLE_LABEL[user.role] ?? user.role}
            {registration ? ' • Terdaftar' : ' • Belum mendaftar'}
          </p>

          {/* Pratinjau dasbor dalam keadaan blur; tidak memuat data apa pun. */}
          <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-3 overflow-hidden">
            <div className="blur-[3px] select-none pointer-events-none space-y-2" aria-hidden="true">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-300" />
                <div className="h-2 w-24 rounded bg-slate-300" />
              </div>
              <div className="h-2 w-full rounded bg-slate-200" />
              <div className="h-2 w-4/5 rounded bg-slate-200" />
              <div className="flex gap-2 pt-1">
                <div className="h-6 flex-1 rounded bg-[#00B4D8]/40" />
                <div className="h-6 flex-1 rounded bg-slate-200" />
              </div>
            </div>
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-[#1D3557]/70">
              {registration ? 'Dasbor aktif setelah verifikasi' : 'Dasbor terkunci'}
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1D3557] hover:bg-[#E0FBFC]/60"
            >
              👤 Profil Saya
            </Link>
            <Link
              href={registration ? '/profile' : '/daftar'}
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1D3557] hover:bg-[#E0FBFC]/60"
            >
              {registration ? '📋 Status Pendaftaran' : '📝 Pendaftaran Murid / Pelatih'}
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-[#FF6F59] hover:bg-red-50"
            >
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

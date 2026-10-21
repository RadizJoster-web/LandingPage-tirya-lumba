'use client';

import React from 'react';
import Link from 'next/link';
import { AuthUser, RegistrationSnapshot } from '@/types';
import { Avatar } from '@/components/ui/Avatar';

export const ROLE_LABEL: Record<string, string> = {
  STUDENT: 'Murid',
  INSTRUCTOR: 'Pelatih',
  ADMIN: 'Admin',
  POOL_MANAGER: 'Pengelola Kolam',
};

interface ProfileMenuProps {
  user: AuthUser;
  registration: RegistrationSnapshot | null;
  onNavigate: () => void;
  onLogout: () => void;
}

/** Panel dropdown profil: identitas akun, tautan pendaftaran, dan tombol keluar. */
export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  user,
  registration,
  onNavigate,
  onLogout,
}) => {
  const name = user.fullName || user.email;

  return (
    <div
      role="menu"
      className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/10 animate-fade-in"
    >
      <div className="flex items-center gap-3">
        <Avatar name={name} src={user.profilePictureUrl} size="md" />
        <div className="min-w-0">
          <p className="font-heading font-bold text-sm text-[#1D3557] truncate">{name}</p>
          <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-[#E0FBFC] px-2.5 py-0.5 text-[11px] font-semibold text-[#0077B6]">
          {ROLE_LABEL[user.role] ?? user.role}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            registration
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-700'
          }`}
        >
          {registration ? 'Terdaftar' : 'Belum mendaftar'}
        </span>
      </div>

      <div className="mt-4 space-y-1 border-t border-slate-100 pt-3">
        <Link
          href="/profile"
          role="menuitem"
          onClick={onNavigate}
          className="block rounded-xl px-3 py-2 text-sm font-medium text-[#1D3557] hover:bg-[#E0FBFC]/60"
        >
          👤 Profil Saya
        </Link>
        <Link
          href={registration ? '/profile' : '/daftar'}
          role="menuitem"
          onClick={onNavigate}
          className="block rounded-xl px-3 py-2 text-sm font-medium text-[#1D3557] hover:bg-[#E0FBFC]/60"
        >
          {registration ? '📋 Status Pendaftaran' : '📝 Pendaftaran Murid / Pelatih'}
        </Link>
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onNavigate();
            onLogout();
          }}
          className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-[#FF6F59] hover:bg-red-50"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

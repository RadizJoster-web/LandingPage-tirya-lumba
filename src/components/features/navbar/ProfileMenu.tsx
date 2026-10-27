'use client';

import React from 'react';
import Link from 'next/link';
import { AuthUser, RegistrationSnapshot } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { User, LogOut, FileText, ArrowRight } from 'lucide-react';

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
      className="absolute right-0 mt-2 max-h-[calc(100vh-6rem)] w-72 origin-top-right overflow-y-auto rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-blue-950/5 animate-scale-up dark:bg-slate-900 dark:border-slate-800"
    >
      <div className="flex items-center gap-3">
        <Avatar name={name} src={user.profilePictureUrl} size="md" />
        <div className="min-w-0">
          <p className="font-heading font-bold text-sm text-[#1D3557] truncate dark:text-slate-100">
            {name}
          </p>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <Badge variant="azure" size="sm">
          {ROLE_LABEL[user.role] ?? user.role}
        </Badge>
        <Badge
          variant={registration ? 'success' : 'neutral'}
          size="sm"
        >
          {registration ? 'Terdaftar' : 'Belum Terdaftar'}
        </Badge>
      </div>

      <div className="mt-4 space-y-1 border-t border-slate-100 pt-3 dark:border-slate-800">
        <Link
          href="/profile"
          role="menuitem"
          onClick={onNavigate}
          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#1D3557] hover:bg-[#E0FBFC]/50 transition-colors dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <span className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#0077B6]" />
            Profil &amp; Dasbor
          </span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
        </Link>

        {!registration ? (
          <Link
            href="/daftar"
            role="menuitem"
            onClick={onNavigate}
            className="flex items-center justify-between rounded-xl bg-[#00B4D8] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0077B6] transition-colors"
          >
            <span>Daftar Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        ) : (
          <Link
            href="/profile"
            role="menuitem"
            onClick={onNavigate}
            className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#1D3557] hover:bg-[#E0FBFC]/50 transition-colors dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#0077B6]" />
              Status Pendaftaran
            </span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </Link>
        )}

        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onNavigate();
            onLogout();
          }}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-[#FF6F59] hover:bg-rose-50 transition-colors dark:hover:bg-rose-950/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          Keluar dari Akun
        </button>
      </div>
    </div>
  );
};

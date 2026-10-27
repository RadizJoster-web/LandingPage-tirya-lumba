'use client';

import React from 'react';
import Link from 'next/link';
import { AuthUser } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, LogOut, User as UserIcon } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  user: AuthUser | null;
  onClose: () => void;
  onLogout: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  user,
  onClose,
  onLogout,
}) => {
  const avatar = user ? mediaUrl(user.profilePictureUrl) : null;
  const initial = (user?.fullName || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <div
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200/80 px-5 space-y-3 shadow-lg overflow-hidden transition-all duration-300 ease-out dark:bg-slate-900/95 dark:border-slate-800 ${
        isOpen
          ? 'opacity-100 translate-y-0 max-h-[600px] pt-4 pb-6'
          : 'opacity-0 -translate-y-2 max-h-0 py-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col space-y-2 text-sm font-medium text-[#1D3557] dark:text-slate-200">
        <Link
          href="/"
          onClick={onClose}
          className="py-2 hover:text-[#00B4D8] transition-colors"
        >
          Beranda
        </Link>
        <Link
          href="/#program"
          onClick={onClose}
          className="py-2 hover:text-[#00B4D8] transition-colors"
        >
          Program &amp; Kolam
        </Link>
        <Link
          href="/#tentang-kami"
          onClick={onClose}
          className="py-2 hover:text-[#00B4D8] transition-colors"
        >
          Tentang Kami
        </Link>
        <Link
          href="/#kenapa-pilih-kami"
          onClick={onClose}
          className="py-2 hover:text-[#00B4D8] transition-colors"
        >
          Kenapa Kami
        </Link>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
        {user ? (
          <>
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-[#00B4D8] transition-all group dark:bg-slate-800/60 dark:border-slate-700"
            >
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt={user.fullName || user.email}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#0077B6] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {initial}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-bold text-[#1D3557] truncate group-hover:text-[#0077B6] transition-colors dark:text-slate-100">
                    {user.fullName || 'Pengguna'}
                  </span>
                  <Badge variant="azure" size="sm">
                    {user.role === 'INSTRUCTOR' ? 'Pelatih' : user.role === 'STUDENT' ? 'Murid' : 'Profil'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0077B6] group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

            <Button
              variant="outline"
              size="sm"
              isFullRounded={true}
              className="w-full text-[#FF6F59] border-rose-200 hover:bg-rose-50"
              onClick={onLogout}
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2 pt-1">
            <Link href="/login" onClick={onClose} className="flex-1">
              <Button variant="ghost" size="md" isFullRounded={true} className="w-full border border-slate-200">
                Masuk
              </Button>
            </Link>
            <Link href="/register" onClick={onClose} className="flex-1">
              <Button variant="primary" size="md" isFullRounded={true} className="w-full">
                Daftar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

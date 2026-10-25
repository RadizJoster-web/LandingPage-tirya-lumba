import React from 'react';
import Link from 'next/link';
import { AuthUser } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  user: AuthUser | null;
  onClose: () => void;
  onLogout: () => void;
}

/**
 * Menu mobile selalu ter-render; buka/tutup dijalankan transisi CSS sehingga
 * animasi masuk dan keluar sama-sama terlihat (inert menahan fokus saat tertutup).
 */
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
      className={`md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-200 px-4 space-y-3 shadow-lg overflow-hidden transition-all duration-200 ease-out ${
        isOpen
          ? 'opacity-100 translate-y-0 max-h-[600px] pt-3 pb-5 border-b'
          : 'opacity-0 -translate-y-2 max-h-0 py-0 border-b-0 pointer-events-none'
      }`}
    >
      <Link
        href="/"
        onClick={onClose}
        className="block py-2 text-base font-medium text-[#1D3557] hover:text-[#00B4D8]"
      >
        Beranda
      </Link>
      <Link
        href="/#program"
        onClick={onClose}
        className="block py-2 text-base font-medium text-[#1D3557] hover:text-[#00B4D8]"
      >
        Program & Kolam
      </Link>
      <Link
        href="/#tentang-kami"
        onClick={onClose}
        className="block py-2 text-base font-medium text-[#1D3557] hover:text-[#00B4D8]"
      >
        Tentang Kami
      </Link>
      <Link
        href="/#kenapa-pilih-kami"
        onClick={onClose}
        className="block py-2 text-base font-medium text-[#1D3557] hover:text-[#00B4D8]"
      >
        Kenapa Kami
      </Link>

      <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
        {user ? (
          <>
            {/* Kartu Profil Pengguna Elegan di Mobile */}
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-[#E0FBFC]/80 via-white to-white border border-[#00B4D8]/30 shadow-xs hover:border-[#00B4D8] transition-all group"
            >
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt={user.fullName || user.email}
                  className="w-10 h-10 rounded-full object-cover border border-[#00B4D8]/50 shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#0077B6] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-xs">
                  {initial}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-sm font-bold text-[#1D3557] truncate group-hover:text-[#0077B6] transition-colors">
                    {user.fullName || 'Pengguna'}
                  </span>
                  <span className="rounded-full bg-[#0077B6]/10 px-2 py-0.5 text-[10px] font-bold text-[#0077B6] shrink-0">
                    {user.role === 'INSTRUCTOR'
                      ? 'Pelatih'
                      : user.role === 'STUDENT'
                        ? 'Murid'
                        : 'Profil'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
              </div>
              <span className="text-slate-400 group-hover:text-[#0077B6] group-hover:translate-x-0.5 transition-all text-sm font-bold pr-1">
                →
              </span>
            </Link>

            <Link href="/daftar" onClick={onClose}>
              <Button variant="primary" size="md" className="w-full">
                Portal Pendaftaran
              </Button>
            </Link>
            <Button variant="outline" size="md" className="w-full" onClick={onLogout}>
              Keluar
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" onClick={onClose}>
              <Button variant="outline" size="md" className="w-full">
                Masuk
              </Button>
            </Link>
            <Link href="/register" onClick={onClose}>
              <Button variant="primary" size="md" className="w-full">
                Daftar Akun
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

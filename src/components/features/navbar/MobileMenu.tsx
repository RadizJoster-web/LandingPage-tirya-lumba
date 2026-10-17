import React from 'react';
import Link from 'next/link';
import { AuthUser } from '@/types';
import { Button } from '@/components/ui/Button';

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
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-200 px-4 pt-3 pb-5 space-y-3 shadow-lg">
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

      <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
        {user ? (
          <>
            <Link href="/profile" onClick={onClose}>
              <Button variant="secondary" size="md" className="w-full">
                👤 Profil Saya ({user.email.split('@')[0]})
              </Button>
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

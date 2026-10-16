import React from 'react';
import Link from 'next/link';
import { UserSession } from '@/types';
import { Button } from '@/components/ui/Button';

interface NavAuthButtonsProps {
  user: UserSession | null;
  isLoading: boolean;
  onLogout: () => void;
}

export const NavAuthButtons: React.FC<NavAuthButtonsProps> = ({
  user,
  isLoading,
  onLogout,
}) => {
  if (isLoading) {
    return <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-full" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/profile">
          <Button variant="secondary" size="sm" isFullRounded={true} className="gap-1.5">
            <span>👤</span>
            <span className="max-w-[130px] truncate">{user.name || user.email.split('@')[0]}</span>
          </Button>
        </Link>
        <Link href="/daftar">
          <Button variant="primary" size="sm" isFullRounded={true}>
            Pendaftaran
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          isFullRounded={true}
          onClick={onLogout}
        >
          Keluar
        </Button>
      </div>
    );
  }

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
};

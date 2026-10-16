import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface EmptyProfileProps {
  displayName: string;
}

export const EmptyProfile: React.FC<EmptyProfileProps> = ({ displayName }) => {
  return (
    <div className="min-h-[75vh] py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-2xl mx-auto text-center">
        <Card variant="dashboard" className="p-8 sm:p-12 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-3xl mx-auto mb-4">
            👋
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1D3557] mb-2">
            Selamat Datang, {displayName}!
          </h1>
          <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
            Akun Anda telah terdaftar. Saat ini Anda belum mendaftar sebagai murid maupun pelatih. Silakan pilih jalur Anda untuk mulai menggunakan sistem.
          </p>
          <Link href="/daftar">
            <Button variant="primary" size="md" isFullRounded={false} className="shadow-md">
              Buka Portal Pendaftaran
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Card } from '@/components/ui/Card';
import { EmptyProfile } from './EmptyProfile';
import { RegistrationStatus } from './RegistrationStatus';

export default function ProfileParent() {
  const router = useRouter();
  const { user, registration, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Akun admin/pengelola kolam memakai dasbor terpisah, bukan halaman landing ini.
  if (user.role === 'ADMIN' || user.role === 'POOL_MANAGER') {
    return (
      <div className="min-h-[70vh] py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
        <div className="max-w-xl mx-auto">
          <Card variant="dashboard" className="p-8 text-center space-y-3">
            <div className="text-4xl">🗂️</div>
            <h1 className="font-heading font-extrabold text-2xl text-[#1D3557]">
              Akun Manajemen
            </h1>
            <p className="text-sm text-slate-600">
              Akun <span className="font-semibold">{user.email}</span> terdaftar sebagai pengelola sistem.
              Silakan gunakan aplikasi dasbor admin untuk mengelola data kolam, pelatih, dan pendaftaran.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (!registration) {
    return <EmptyProfile displayName={user.email} />;
  }

  return <RegistrationStatus snapshot={registration} />;
}

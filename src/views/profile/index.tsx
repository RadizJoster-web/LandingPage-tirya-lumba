'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { InstructorRegistrationSnapshot } from '@/types';
import { EmptyProfile } from './EmptyProfile';
import { RegistrationStatus } from './RegistrationStatus';

export default function ProfileParent() {
  const router = useRouter();
  const { user, registration, isLoading, isRegistrationLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Loading akun awal
  if (isLoading || !user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-slate-400">Memuat profil pengguna...</p>
      </div>
    );
  }

  const name = user.fullName || user.email;

  // Akun admin/pengelola kolam
  if (user.role === 'ADMIN' || user.role === 'POOL_MANAGER') {
    return (
      <main className="min-h-[85vh] bg-[#F3F4F6] px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-lg rounded-xl bg-white p-8 text-center border border-gray-200/90 shadow-xs dark:bg-slate-900 dark:border-slate-800">
          <Avatar name={name} src={user.profilePictureUrl} size="lg" className="mx-auto" />
          <h1 className="mt-4 font-heading text-xl font-bold text-[#1D3557] dark:text-slate-100">
            Akun Manajemen Sistem
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Akun <span className="font-semibold text-[#1D3557] dark:text-slate-200">{user.email}</span> memiliki hak akses pengelola. Silakan gunakan dasbor aplikasi internal untuk mengelola master kolam, pelatih, dan verifikasi pendaftaran.
          </p>
          <Link href="/" className="mt-6 inline-block">
            <Button variant="outline" size="md" isFullRounded={false}>
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // Jika data registrasi dari server masih dalam proses pengambilan awal
  if (isRegistrationLoading && !registration) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-slate-500">
          Memeriksa status pendaftaran Anda dari server...
        </p>
      </div>
    );
  }

  // 1. Jika pengguna memiliki catatan pendaftaran resmi (PENDING, APPROVED, atau REJECTED)
  if (registration) {
    return <RegistrationStatus snapshot={registration} email={user.email} />;
  }

  // 2. Jika akun pelatih aktif yang sudah disetujui (seed/legacy)
  if (user.role === 'INSTRUCTOR') {
    const instructorFallback: InstructorRegistrationSnapshot = {
      kind: 'instructor',
      fullName: user.fullName || user.email,
      phone: '',
      birthDate: '',
      gender: 'Laki-Laki',
      address: '',
      shortBio: '',
      license: '',
      experience: '',
      schedules: [],
      profilePictureUrl: user.profilePictureUrl || '',
      cvUrl: '',
      registrationId: 'REG-' + user.userId.slice(0, 8),
      status: 'APPROVED',
      submittedAt: Date.now(),
      scheduleLabels: [],
    };
    return <RegistrationStatus snapshot={instructorFallback} email={user.email} />;
  }

  // 3. Akun baru (role USER) yang belum pernah mendaftar
  return <EmptyProfile name={name} email={user.email} photoUrl={user.profilePictureUrl} />;
}

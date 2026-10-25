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
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-9 h-9 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-500">Memuat profil...</p>
      </div>
    );
  }

  const name = user.fullName || user.email;

  // Akun admin/pengelola kolam memakai dasbor terpisah, bukan halaman landing ini.
  if (user.role === 'ADMIN' || user.role === 'POOL_MANAGER') {
    return (
      <main className="min-h-[75vh] bg-gradient-to-b from-[#E0FBFC]/60 via-[#F8F9FA] to-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl bg-white/85 p-8 text-center ring-1 ring-slate-100">
          <Avatar name={name} src={user.profilePictureUrl} size="lg" className="mx-auto" />
          <h1 className="mt-4 font-heading text-2xl font-extrabold text-[#1D3557]">
            Akun Manajemen
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Akun <span className="font-semibold">{user.email}</span> terdaftar sebagai pengelola
            sistem. Silakan gunakan aplikasi dasbor admin untuk mengelola data kolam, pelatih,
            dan pendaftaran.
          </p>
          <Link href="/" className="mt-6 inline-block">
            <Button variant="outline" size="md" isFullRounded={true}>
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-9 h-9 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-600">
          Memeriksa status pendaftaran Anda dari server...
        </p>
      </div>
    );
  }

  // 1. Jika pengguna memiliki catatan pendaftaran resmi (PENDING, APPROVED, atau REJECTED)
  if (registration) {
    return <RegistrationStatus snapshot={registration} email={user.email} />;
  }

  // 2. Jika akun pelatih aktif yang sudah disetujui (mis. data seed/legacy tanpa tabel registrasi)
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

  // 3. Akun baru (role USER) yang belum pernah mendaftar sebagai murid maupun guru:
  // Tampilkan layar pemilihan pendaftaran (EmptyProfile) tanpa data palsu seperti ukuran baju / pembayaran.
  return <EmptyProfile name={name} email={user.email} photoUrl={user.profilePictureUrl} />;
}

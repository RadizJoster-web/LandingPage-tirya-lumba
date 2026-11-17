'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Check } from 'lucide-react';
import { ProfileLayout } from './ProfileLayout';
import { ProfileIdentitySidebar } from './ProfileIdentitySidebar';
import { GuestContentView } from './GuestContentView';
import { StudentContentView } from './StudentContentView';
import { TeacherContentView } from './TeacherContentView';
import { InstructorRegistrationSnapshot, StudentRegistrationSnapshot } from '@/types';

export default function ProfileParent() {
  const router = useRouter();
  const { user, registration, isLoading, isRegistrationLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-slate-400">Memuat profil pengguna...</p>
      </div>
    );
  }

  if (user.role === 'ADMIN' || user.role === 'POOL_MANAGER') {
    return (
      <main className="min-h-[85vh] bg-[#F8FAFC] px-4 py-16 dark:bg-slate-950 flex justify-center items-center">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center border border-gray-200 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
          <Avatar name={user.fullName || user.email} src={user.profilePictureUrl} size="lg" className="mx-auto" />
          <h1 className="font-heading text-xl font-bold text-[#1D3557] dark:text-slate-100">Akun Manajemen Sistem</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Akun Anda memiliki akses pengelola. Gunakan dashboard untuk mengelola kolam dan jadwal.
          </p>
        </div>
      </main>
    );
  }

  if (isRegistrationLoading && !registration) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-slate-400">Memeriksa status pendaftaran...</p>
      </div>
    );
  }

  const isStudent = registration?.kind === 'student';
  const isTeacher = registration?.kind === 'instructor' || user.role === 'INSTRUCTOR';

  const currentName = user.fullName || registration?.fullName || user.email;

  const tagline = isStudent
    ? 'Peserta kursus renang aktif'
    : isTeacher
      ? 'Pelatih renang profesional'
      : 'Akun baru';

  const badges = isStudent ? (
    <>
      <Badge variant="azure" size="sm" className="text-[10px] gap-1"><Check className="w-3 h-3" /> Akun terverifikasi</Badge>
      <Badge variant={registration.status === 'APPROVED' ? 'success' : 'coral'} size="sm" className="text-[10px]">
        {registration.status === 'APPROVED' ? 'Aktif' : registration.status === 'REJECTED' ? 'Ditolak' : 'Menunggu Verifikasi'}
      </Badge>
    </>
  ) : isTeacher ? (
    <>
      <Badge variant="azure" size="sm" className="text-[10px] gap-1"><Check className="w-3 h-3" /> Akun terverifikasi</Badge>
      {registration?.kind === 'instructor' && registration.license ? (
        <Badge variant="azure" size="sm" className="text-[10px]">{registration.license}</Badge>
      ) : null}
    </>
  ) : (
    <Badge variant="neutral" size="sm" className="text-[10px]">Belum terdaftar</Badge>
  );

  const waMessage = encodeURIComponent(`Halo Customer Service PT Tirya Lumba, saya *${currentName}* (${user.email}).\nSaya ingin menanyakan perihal akun saya.`);

  return (
    <ProfileLayout
      sidebar={
        <ProfileIdentitySidebar
          name={currentName}
          email={user.email}
          photoUrl={user.profilePictureUrl || registration?.profilePictureUrl}
          tagline={tagline}
          badges={badges}
          waMessage={waMessage}
          onLogout={logout}
        />
      }
    >
      {isStudent ? (
        <StudentContentView snapshot={registration as StudentRegistrationSnapshot} email={user.email} />
      ) : isTeacher ? (
        <TeacherContentView
          snapshot={
            (registration?.kind === 'instructor'
              ? registration
              : {
                  kind: 'instructor',
                  fullName: user.fullName || user.email,
                  phone: user.phone || '',
                  birthDate: '',
                  gender: 'Laki-Laki',
                  address: '',
                  shortBio: '',
                  license: '',
                  experience: '',
                  schedules: [],
                  profilePictureUrl: user.profilePictureUrl || '',
                  cvUrl: '',
                  registrationId: user.userId,
                  status: 'APPROVED',
                  submittedAt: Date.now(),
                  scheduleLabels: [],
                }) as InstructorRegistrationSnapshot
          }
          email={user.email}
        />
      ) : (
        <GuestContentView name={currentName} email={user.email} />
      )}
    </ProfileLayout>
  );
}

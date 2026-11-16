'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check } from 'lucide-react';
import { ProfileLayout } from './ProfileLayout';
import { ProfileIdentitySidebar } from './ProfileIdentitySidebar';
import { GuestContentView } from './GuestContentView';
import { StudentContentView } from './StudentContentView';
import { TeacherContentView } from './TeacherContentView';
import { SAMPLE_STUDENT_SNAPSHOT, SAMPLE_TEACHER_SNAPSHOT } from './profilePrototypeData';
import { InstructorRegistrationSnapshot, StudentRegistrationSnapshot } from '@/types';

type ProfileCondition = 'auto' | 'guest' | 'student' | 'teacher';

export default function ProfileParent() {
  const router = useRouter();
  const { user, registration, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileCondition>('auto');

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
          <Link href="/" className="inline-block pt-2">
            <Button variant="outline" size="md" isFullRounded={false}>Kembali ke Beranda</Button>
          </Link>
        </div>
      </main>
    );
  }

  const effectiveCondition = activeTab !== 'auto'
    ? activeTab
    : registration?.kind === 'student'
      ? 'student'
      : (registration?.kind === 'instructor' || user.role === 'INSTRUCTOR')
        ? 'teacher'
        : 'guest';

  const studentSnapshot = (registration?.kind === 'student' ? registration : SAMPLE_STUDENT_SNAPSHOT) as StudentRegistrationSnapshot;
  const teacherSnapshot = (registration?.kind === 'instructor' ? registration : SAMPLE_TEACHER_SNAPSHOT) as InstructorRegistrationSnapshot;

  const currentName = effectiveCondition === 'guest'
    ? (user.fullName || 'Pengguna Baru')
    : effectiveCondition === 'student'
      ? (studentSnapshot.fullName || user.fullName || user.email)
      : (teacherSnapshot.fullName || user.fullName || user.email);

  const tagline = effectiveCondition === 'student'
    ? 'Peserta kursus renang aktif'
    : effectiveCondition === 'teacher'
      ? 'Pelatih renang profesional'
      : 'Akun baru';

  const badges = effectiveCondition === 'student' ? (
    <>
      <Badge variant="azure" size="sm" className="text-[10px] gap-1"><Check className="w-3 h-3" /> Akun terverifikasi</Badge>
      <Badge variant={studentSnapshot.status === 'APPROVED' ? 'success' : 'coral'} size="sm" className="text-[10px]">
        {studentSnapshot.status === 'APPROVED' ? 'Aktif' : studentSnapshot.status === 'REJECTED' ? 'Ditolak' : 'Menunggu Verifikasi'}
      </Badge>
    </>
  ) : effectiveCondition === 'teacher' ? (
    <>
      <Badge variant="azure" size="sm" className="text-[10px] gap-1"><Check className="w-3 h-3" /> Akun terverifikasi</Badge>
      <Badge variant="azure" size="sm" className="text-[10px]">PRSI Certified</Badge>
    </>
  ) : (
    <Badge variant="neutral" size="sm" className="text-[10px]">Belum terdaftar</Badge>
  );

  const waMessage = encodeURIComponent(`Halo Customer Service PT Tirya Lumba, saya *${currentName}* (${user.email}).\nSaya ingin menanyakan perihal akun saya.`);

  const previewBar = (
    <div className="flex flex-wrap items-center justify-between w-full gap-2">
      <span className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider">Pratinjau Kondisi Akun</span>
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
        {(['auto', 'guest', 'student', 'teacher'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-white text-[#0077B6] shadow-2xs dark:bg-slate-700 dark:text-slate-100'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            {tab === 'auto' ? 'Otomatis' : tab === 'guest' ? 'Sebelum Daftar' : tab === 'student' ? 'Murid' : 'Guru'}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <ProfileLayout
      previewBar={previewBar}
      sidebar={
        <ProfileIdentitySidebar
          name={currentName}
          email={user.email}
          photoUrl={user.profilePictureUrl}
          tagline={tagline}
          badges={badges}
          waMessage={waMessage}
          onLogout={logout}
        />
      }
    >
      {effectiveCondition === 'student' ? (
        <StudentContentView snapshot={studentSnapshot} email={user.email} />
      ) : effectiveCondition === 'teacher' ? (
        <TeacherContentView snapshot={teacherSnapshot} email={user.email} />
      ) : (
        <GuestContentView name={currentName} email={user.email} />
      )}
    </ProfileLayout>
  );
}

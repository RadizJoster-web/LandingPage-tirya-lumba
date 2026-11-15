import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { RegistrationSnapshot } from '@/types';
import { StatItem } from './ProfileStatsRow';

export function getProfileStats(
  userRole: string,
  snapshot?: RegistrationSnapshot | null,
): StatItem[] {
  if (!snapshot) {
    return [
      { label: 'Tipe Akun', value: 'Pengguna' },
      { label: 'Status Pendaftaran', value: 'Belum Terdaftar' },
      { label: 'Program Kursus', value: '–' },
      { label: 'Keanggotaan', value: 'Reguler' },
    ];
  }

  if (snapshot.kind === 'student') {
    return [
      { label: 'Tipe Akun', value: 'Murid' },
      { label: 'Paket Kursus', value: snapshot.packageType || 'Reguler' },
      { label: 'Sisa Pertemuan', value: `${snapshot.activeSessions ?? 0} Sesi` },
      { label: 'ID Pendaftaran', value: snapshot.registrationId || '–' },
    ];
  }

  return [
    { label: 'Tipe Akun', value: 'Pelatih' },
    { label: 'Lisensi Pelatih', value: snapshot.license ? 'PRSI / Resmi' : 'Standar' },
    { label: 'Sesi Mengajar', value: `${snapshot.schedules?.length || 0} Sesi` },
    { label: 'ID Pelatih', value: snapshot.registrationId || '–' },
  ];
}

export function renderStatusBadge(snapshot?: RegistrationSnapshot | null): React.ReactNode {
  if (!snapshot) {
    return (
      <Badge variant="neutral" size="sm" className="rounded-full px-3 py-1 text-xs">
        Belum Terdaftar
      </Badge>
    );
  }

  if (snapshot.status === 'PENDING') {
    return (
      <Badge variant="coral" size="sm" className="bg-amber-50 text-amber-800 border-amber-200 rounded-full px-3 py-1 text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        Menunggu Verifikasi
      </Badge>
    );
  }

  if (snapshot.status === 'REJECTED') {
    return (
      <Badge variant="coral" size="sm" className="bg-rose-50 text-rose-700 border-rose-200 rounded-full px-3 py-1 text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        Ditolak
      </Badge>
    );
  }

  const isStudent = snapshot.kind === 'student';
  const isZeroSession = isStudent && (snapshot.activeSessions ?? 0) === 0;

  return (
    <Badge
      variant={isZeroSession ? 'coral' : 'success'}
      size="sm"
      className="rounded-full px-3 py-1 text-xs"
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isZeroSession ? 'bg-amber-500' : 'bg-emerald-500'}`} />
      {isZeroSession ? 'Paket Selesai' : 'Terverifikasi & Aktif'}
    </Badge>
  );
}

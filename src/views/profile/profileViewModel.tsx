import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { RegistrationSnapshot } from '@/types';
import { StatItem } from './ProfileStatsRow';
import { formatRupiah, getSessionTime } from '@/lib/utils';

export function getProfileStats(
  userRole: string,
  snapshot?: RegistrationSnapshot | null,
): StatItem[] {
  if (!snapshot) {
    return [];
  }

  if (snapshot.kind === 'student') {
    return [
      {
        label: 'Sisa Pertemuan',
        value: `${snapshot.activeSessions ?? 0} Sesi`,
        highlight: (snapshot.activeSessions ?? 0) > 0,
      },
      {
        label: 'Paket Kursus',
        value: snapshot.packageType || 'Reguler',
      },
      {
        label: 'Biaya Kursus',
        value: snapshot.packagePrice ? formatRupiah(snapshot.packagePrice) : '–',
      },
      {
        label: 'Lokasi Kolam',
        value: snapshot.locationLabel ? snapshot.locationLabel.split(',')[0].slice(0, 18) : 'Kolam Mitra',
      },
    ];
  }

  const totalSchedules = snapshot.schedules?.length || 0;
  const totalStudents = snapshot.schedules?.reduce(
    (acc, curr) => acc + (curr.totalStudents ?? 0),
    0,
  ) ?? 0;

  return [
    {
      label: 'Sesi Mengajar',
      value: `${totalSchedules} Sesi`,
      highlight: true,
    },
    {
      label: 'Murid Aktif',
      value: `${totalStudents} Siswa`,
      highlight: totalStudents > 0,
    },
    {
      label: 'Pengalaman',
      value: snapshot.experience ? snapshot.experience.split(',')[0].slice(0, 15) : 'Berlisensi',
    },
    {
      label: 'Akreditasi',
      value: 'PRSI Standar',
    },
  ];
}

export function renderStatusBadge(snapshot?: RegistrationSnapshot | null): React.ReactNode {
  if (!snapshot) {
    return (
      <Badge variant="neutral" size="sm" className="rounded-full px-3 py-1 text-xs font-semibold">
        Belum Terdaftar
      </Badge>
    );
  }

  if (snapshot.status === 'PENDING') {
    return (
      <Badge
        variant="coral"
        size="sm"
        className="bg-amber-50 text-amber-800 border-amber-200/90 rounded-full px-3 py-1 text-xs font-semibold shadow-2xs"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse mr-1" />
        Menunggu Verifikasi
      </Badge>
    );
  }

  if (snapshot.status === 'REJECTED') {
    return (
      <Badge
        variant="coral"
        size="sm"
        className="bg-rose-50 text-rose-700 border-rose-200/90 rounded-full px-3 py-1 text-xs font-semibold shadow-2xs"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1" />
        Pendaftaran Ditolak
      </Badge>
    );
  }

  const isStudent = snapshot.kind === 'student';
  const isZeroSession = isStudent && (snapshot.activeSessions ?? 0) === 0;

  return (
    <Badge
      variant={isZeroSession ? 'coral' : 'success'}
      size="sm"
      className="rounded-full px-3.5 py-1 text-xs font-semibold shadow-2xs"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          isZeroSession ? 'bg-amber-500' : 'bg-emerald-500'
        }`}
      />
      {isZeroSession ? 'Paket Selesai (0 Sesi)' : 'Terverifikasi & Aktif'}
    </Badge>
  );
}

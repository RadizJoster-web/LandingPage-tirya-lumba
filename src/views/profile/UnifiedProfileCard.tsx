import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { RegistrationSnapshot } from '@/types';
import { ProfileStatsRow, StatItem } from './ProfileStatsRow';
import { ProfileNoticeRow } from './ProfileNoticeRow';
import { ProfilePublicInfoRow } from './ProfilePublicInfoRow';
import { ProfileProgramRow } from './ProfileProgramRow';
import { ProfileAttendanceRow } from './ProfileAttendanceRow';
import { ProfileSupportAndLogoutRow } from './ProfileSupportAndLogoutRow';

interface UnifiedProfileCardProps {
  name: string;
  email: string;
  photoUrl?: string | null;
  snapshot?: RegistrationSnapshot | null;
  stats: StatItem[];
  statusBadge: React.ReactNode;
  waMessage: string;
  onLogout: () => void;
}

export const UnifiedProfileCard: React.FC<UnifiedProfileCardProps> = ({
  name,
  email,
  photoUrl,
  snapshot,
  stats,
  statusBadge,
  waMessage,
  onLogout,
}) => {
  const isStudent = snapshot?.kind === 'student';
  const isApproved = snapshot?.status === 'APPROVED';
  const activeSessions = isStudent ? (snapshot.activeSessions ?? 0) : 0;
  const status = snapshot?.status ?? 'UNREGISTERED';

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white border border-gray-100 shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
      {/* Header Cover Banner */}
      <div className="relative h-36 sm:h-44 w-full bg-gradient-to-r from-sky-400 via-blue-200 to-cyan-100 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/10" />
      </div>

      <div className="px-6 sm:px-8 pb-8 pt-0">
        {/* Avatar & Status Badge */}
        <div className="flex items-end justify-between -mt-10 sm:-mt-12 mb-4">
          <Avatar
            name={name}
            src={photoUrl}
            size="lg"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-white shadow-md dark:ring-slate-900"
          />
          <div>{statusBadge}</div>
        </div>

        {/* Identity */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#1D3557] dark:text-slate-100">
              {name}
            </h1>
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00B4D8] text-white shadow-2xs"
              title="Akun Terverifikasi"
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">{email}</p>
        </div>

        {/* 4 Quick Stats Columns */}
        <ProfileStatsRow stats={stats} />

        {/* Inline Status Notices */}
        <ProfileNoticeRow
          status={status}
          isStudent={Boolean(isStudent)}
          activeSessions={activeSessions}
          rejectionReason={snapshot?.rejectionReason ?? undefined}
          waMessage={waMessage}
        />

        {/* Public Profile Information */}
        <ProfilePublicInfoRow
          fullName={snapshot?.fullName || name}
          phone={snapshot?.phone}
          email={email}
          address={snapshot?.address}
        />

        {/* Program & Schedule Information */}
        <ProfileProgramRow snapshot={snapshot} />

        {/* Attendance Log (Student Approved) */}
        {isStudent && isApproved && <ProfileAttendanceRow />}

        {/* Support & Logout Actions */}
        <ProfileSupportAndLogoutRow waMessage={waMessage} onLogout={onLogout} />

        {/* Card Bottom Footer */}
        <div className="pt-6 mt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" isFullRounded={false} className="text-xs text-slate-500">
              Kembali ke Beranda
            </Button>
          </Link>
          {!snapshot ? (
            <Link href="/daftar/murid">
              <Button variant="primary" size="sm" isFullRounded={false} className="text-xs font-semibold bg-[#1D3557] text-white hover:bg-[#1D3557]/90 px-5">
                Daftar Kursus
              </Button>
            </Link>
          ) : isStudent && activeSessions === 0 ? (
            <Link href="/daftar/murid">
              <Button variant="primary" size="sm" isFullRounded={false} className="text-xs font-semibold bg-[#1D3557] text-white hover:bg-[#1D3557]/90 px-5">
                Perpanjang Sesi
              </Button>
            </Link>
          ) : (
            <a href={`https://wa.me/6281234567890?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" isFullRounded={false} className="text-xs font-semibold bg-[#1D3557] text-white hover:bg-[#1D3557]/90 px-5">
                Hubungi Admin
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

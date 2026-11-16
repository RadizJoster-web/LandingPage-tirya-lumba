'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Award,
  ArrowRight,
  Settings,
  Mail,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
  const isInstructor = snapshot?.kind === 'instructor';
  const isApproved = snapshot?.status === 'APPROVED';
  const activeSessions = isStudent ? (snapshot.activeSessions ?? 0) : 0;
  const status = snapshot?.status ?? 'UNREGISTERED';

  // Tagline based on active role (clean, no duplicate package words)
  const tagline = isStudent
    ? 'Peserta Kursus Renang Aktif'
    : isInstructor
    ? 'Pelatih Renang Profesional'
    : null;

  // Primary Action Button for active snapshot
  const primaryActionPill =
    isStudent && activeSessions === 0 ? (
      <Link href="/daftar" className="block w-full sm:w-auto">
        <Button
          variant="primary"
          size="md"
          isFullRounded={true}
          className="w-full sm:w-auto rounded-full px-7 py-3 font-semibold text-xs sm:text-sm bg-[#0077B6] hover:bg-[#00B4D8] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Perpanjang Sesi</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    ) : isInstructor ? (
      <Link href="/guru/atur-ulang-jadwal" className="block w-full sm:w-auto">
        <Button
          variant="primary"
          size="md"
          isFullRounded={true}
          className="w-full sm:w-auto rounded-full px-7 py-3 font-semibold text-xs sm:text-sm bg-[#0077B6] hover:bg-[#00B4D8] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Atur Jadwal</span>
        </Button>
      </Link>
    ) : null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Identity Row - Seamlessly integrated with page aquatic gradient */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar
            name={name}
            src={photoUrl}
            size="lg"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-white/90 shadow-md dark:ring-slate-800 shrink-0"
          />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1D3557] tracking-tight dark:text-slate-100">
                {name}
              </h1>
              {/* Clean verification label instead of blue checkmark icon */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/80">
                Akun Terverifikasi
              </span>
              <div>{statusBadge}</div>
            </div>

            {tagline && (
              <p className="text-xs sm:text-sm text-slate-500 font-medium dark:text-slate-400">
                {tagline}
              </p>
            )}

            {/* Clean metadata row without redundant schedule or pool duplications */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5 text-xs text-slate-500 font-medium dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0077B6]" />
                <span>{email}</span>
              </div>
              {snapshot?.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0077B6]" />
                  <span>{snapshot.address}</span>
                </div>
              )}
              {isInstructor && snapshot?.license && (
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#0077B6]" />
                  <span>{snapshot.license}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right-side category chips (only for instructor accreditation if applicable) */}
        {isInstructor && (
          <div className="flex items-center gap-2 self-start sm:self-center">
            <Badge variant="azure" size="sm" className="rounded-full px-3 py-1 text-xs font-semibold">
              PRSI Certified
            </Badge>
          </div>
        )}
      </div>

      {/* Stats Row - Only shown when registration snapshot exists, no duplicate session hours */}
      {Boolean(snapshot) && stats.length > 0 && (
        <ProfileStatsRow stats={stats} actionButton={primaryActionPill} />
      )}

      {/* Status Notices (Pending, Rejected, Renewal) */}
      <ProfileNoticeRow
        status={status}
        isStudent={Boolean(isStudent)}
        activeSessions={activeSessions}
        rejectionReason={snapshot?.rejectionReason ?? undefined}
        waMessage={waMessage}
      />

      {/* Program & Schedule (Clean, Inline, Coach profile hidden by default with trigger button) */}
      <ProfileProgramRow snapshot={snapshot} />

      {/* Public / Student Personal Information */}
      <ProfilePublicInfoRow
        fullName={snapshot?.fullName || name}
        phone={snapshot?.phone}
        email={email}
        address={snapshot?.address}
        snapshot={snapshot}
      />

      {/* Attendance Log (Student Approved) */}
      {isStudent && isApproved && <ProfileAttendanceRow />}

      {/* Support & Logout Section */}
      <ProfileSupportAndLogoutRow waMessage={waMessage} onLogout={onLogout} />

      {/* Clean Bottom Navigation Link */}
      <div className="pt-6 mt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <Link
          href="/"
          className="hover:text-[#0077B6] transition-colors font-medium flex items-center gap-1"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Check,
  User as UserIcon,
  MapPin,
  Clock,
  Award,
  Briefcase,
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
import { getSessionTime } from '@/lib/utils';

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

  // Tagline based on active role
  const tagline = isStudent
    ? `Peserta Didik Resmi • Paket ${snapshot.packageType || 'Reguler'} • Tirya Lumba Aquatic`
    : isInstructor
    ? 'Pelatih Renang Profesional • PRSI Accredited • PT Tirya Lumba'
    : null;

  // Session time helper
  const sessionHours = isStudent
    ? getSessionTime(
        snapshot.firstMeetSession,
        snapshot.startTime,
        snapshot.endTime,
        snapshot.timeRange,
      )
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
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00B4D8] text-white shadow-2xs shrink-0"
                title="Akun Terverifikasi"
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <div>{statusBadge}</div>
            </div>

            {tagline && (
              <p className="text-xs sm:text-sm text-slate-500 font-medium dark:text-slate-400">
                {tagline}
              </p>
            )}

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5 text-xs text-slate-500 font-medium dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0077B6]" />
                <span>{email}</span>
              </div>
              {isStudent && (
                <>
                  <div className="flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-[#0077B6]" />
                    <span>Siswa Aktif</span>
                  </div>
                  {snapshot?.locationLabel && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0077B6]" />
                      <span>{snapshot.locationLabel}</span>
                    </div>
                  )}
                  {sessionHours && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0077B6]" />
                      <span>{sessionHours} WIB</span>
                    </div>
                  )}
                </>
              )}
              {isInstructor && (
                <>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#0077B6]" />
                    <span>{snapshot.license || 'Lisensi Resmi PRSI'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#0077B6]" />
                    <span>{snapshot.experience || 'Pelatih Berpengalaman'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0077B6]" />
                    <span>Tangerang Raya</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right-side category chips for active roles */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {isStudent && (
            <>
              <Badge variant="azure" size="sm" className="rounded-full px-3 py-1 text-xs font-semibold">
                {snapshot?.packageType || 'Reguler'}
              </Badge>
              <Badge variant="neutral" size="sm" className="rounded-full px-3 py-1 text-xs">
                Tirya Lumba
              </Badge>
            </>
          )}
          {isInstructor && (
            <>
              <Badge variant="azure" size="sm" className="rounded-full px-3 py-1 text-xs font-semibold">
                PRSI Certified
              </Badge>
              <Badge variant="neutral" size="sm" className="rounded-full px-3 py-1 text-xs">
                Pelatih Resmi
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Stats Row - Only shown when registration snapshot exists */}
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

      {/* Program & Schedule (Clean, Inline, No Popup) */}
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

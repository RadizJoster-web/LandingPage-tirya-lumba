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
  Share2,
  MessageCircle,
  ArrowRight,
  Settings,
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

  // Tagline based on role (inspired by reference "Designing for clarity & usability")
  const tagline = isStudent
    ? `Peserta Didik Resmi • Paket ${snapshot.packageType || 'Reguler'} • Tirya Lumba Aquatic`
    : isInstructor
    ? 'Pelatih Renang Profesional • PRSI Accredited • PT Tirya Lumba'
    : 'Calon Peserta Didik • Akun Terverifikasi';

  // Session time helper
  const sessionHours = isStudent
    ? getSessionTime(
        snapshot.firstMeetSession,
        snapshot.startTime,
        snapshot.endTime,
        snapshot.timeRange,
      )
    : null;

  // Signature Right-Side Pill Action Button (matching reference "Get in touch")
  const primaryActionPill = !snapshot ? (
    <Link href="/daftar/murid" className="block w-full sm:w-auto">
      <Button
        variant="primary"
        size="md"
        isFullRounded={true}
        className="w-full sm:w-auto rounded-full px-7 py-3 font-semibold text-xs sm:text-sm bg-[#1D3557] hover:bg-[#0077B6] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <span>Daftar Kursus</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Button>
    </Link>
  ) : isStudent && activeSessions === 0 ? (
    <Link href="/daftar/murid" className="block w-full sm:w-auto">
      <Button
        variant="primary"
        size="md"
        isFullRounded={true}
        className="w-full sm:w-auto rounded-full px-7 py-3 font-semibold text-xs sm:text-sm bg-[#1D3557] hover:bg-[#0077B6] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
        className="w-full sm:w-auto rounded-full px-7 py-3 font-semibold text-xs sm:text-sm bg-[#1D3557] hover:bg-[#0077B6] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <Settings className="w-3.5 h-3.5" />
        <span>Atur Jadwal</span>
      </Button>
    </Link>
  ) : (
    <a
      href={`https://wa.me/6281234567890?text=${waMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full sm:w-auto"
    >
      <Button
        variant="primary"
        size="md"
        isFullRounded={true}
        className="w-full sm:w-auto rounded-full px-7 py-3 font-semibold text-xs sm:text-sm bg-[#1D3557] hover:bg-[#0077B6] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>Hubungi CS</span>
      </Button>
    </a>
  );

  return (
    <div className="w-full max-w-3xl mx-auto rounded-[32px] bg-white/85 backdrop-blur-xl border border-white/80 shadow-2xl shadow-blue-950/10 dark:bg-slate-900/85 dark:border-slate-800/80 overflow-hidden transition-all duration-300">
      {/* Header Cover Banner with Misty Gradient Fade (inspired by reference image) */}
      <div className="relative h-44 sm:h-56 w-full bg-gradient-to-br from-[#0077B6] via-[#00B4D8] to-[#90E0EF] overflow-hidden">
        {/* Soft radial highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/25 via-transparent to-black/15" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute top-8 left-1/4 w-72 h-72 bg-[#0077B6]/30 rounded-full blur-3xl" />

        {/* Floating Quick Action Button on Top Right (like reference bookmark icon) */}
        <a
          href={`https://wa.me/6281234567890?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Hubungi Admin PT Tirya Lumba"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/85 backdrop-blur-md rounded-full p-2.5 shadow-md border border-white/80 hover:bg-white text-[#1D3557] hover:text-[#0077B6] transition-all duration-200 z-10"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        {/* Misty bottom gradient fade blending seamlessly into the white card surface */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-slate-900 dark:via-slate-900/50" />
      </div>

      <div className="px-6 sm:px-10 pb-10 pt-0 relative">
        {/* Avatar & Status Badge (overlapping banner) */}
        <div className="flex items-end justify-between -mt-14 sm:-mt-16 mb-4">
          <Avatar
            name={name}
            src={photoUrl}
            size="lg"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-white shadow-xl dark:ring-slate-900 shrink-0"
          />
          <div className="self-end pb-1">{statusBadge}</div>
        </div>

        {/* Identity & Headline (Inspired by reference) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1D3557] tracking-tight dark:text-slate-100">
                {name}
              </h1>
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00B4D8] text-white shadow-2xs shrink-0"
                title="Akun Terverifikasi Resmi"
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium dark:text-slate-400">
              {tagline}
            </p>

            {/* Metadata row with clean icons (matching reference meta line) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-slate-500 font-medium dark:text-slate-400">
              {isStudent ? (
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
              ) : isInstructor ? (
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
              ) : (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <UserIcon className="w-3.5 h-3.5 text-[#0077B6]" />
                  <span>Akun Publik Baru</span>
                </div>
              )}
            </div>
          </div>

          {/* Right-side category chips (matching reference "Tools" tags aesthetic) */}
          <div className="flex items-center gap-1.5 self-start md:self-center pt-1 md:pt-0">
            {isStudent && (
              <>
                <Badge variant="azure" size="sm" className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                  {snapshot?.packageType || 'Reguler'}
                </Badge>
                <Badge variant="neutral" size="sm" className="rounded-full px-2.5 py-0.5 text-[11px]">
                  Tirya Lumba
                </Badge>
              </>
            )}
            {isInstructor && (
              <>
                <Badge variant="azure" size="sm" className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                  PRSI Certified
                </Badge>
                <Badge variant="neutral" size="sm" className="rounded-full px-2.5 py-0.5 text-[11px]">
                  Pelatih Resmi
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Signature Divided Stats Row + Pill Button (THE EXACT REFERENCE PATTERN) */}
        <ProfileStatsRow stats={stats} actionButton={primaryActionPill} />

        {/* Status Notices (Pending, Rejected, Renewal) */}
        <ProfileNoticeRow
          status={status}
          isStudent={Boolean(isStudent)}
          activeSessions={activeSessions}
          rejectionReason={snapshot?.rejectionReason ?? undefined}
          waMessage={waMessage}
        />

        {/* Program & Schedule (NO POPUP - All Inline & Modern) */}
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

        {/* Card Bottom Nav */}
        <div className="pt-6 mt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <Link
            href="/"
            className="hover:text-[#0077B6] transition-colors font-medium flex items-center gap-1"
          >
            ← Kembali ke Beranda
          </Link>
          <span className="text-[11px]">PT Tirya Lumba Aquatic Portal</span>
        </div>
      </div>
    </div>
  );
};

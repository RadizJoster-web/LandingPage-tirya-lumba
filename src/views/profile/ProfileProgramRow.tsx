'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, MapPin, Calendar, Clock, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RegistrationSnapshot } from '@/types';
import { mediaUrl, formatSessionWithTime, getSessionTime } from '@/lib/utils';
import { InstructorProfileWidget } from './InstructorProfileWidget';
import { normalizeInstructorSchedules, groupSchedulesByDay } from './lib/scheduleHelper';
import { InstructorDayScheduleCard } from './InstructorDayScheduleCard';

interface ProfileProgramRowProps {
  snapshot?: RegistrationSnapshot | null;
}

export const ProfileProgramRow: React.FC<ProfileProgramRowProps> = ({ snapshot }) => {
  if (!snapshot) {
    return (
      <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="sm:w-1/3 space-y-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#00B4D8]" />
            <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
              Program Kursus
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Anda belum terdaftar dalam program pelatihan renang aktif.
          </p>
        </div>
        <div className="sm:w-2/3 flex flex-col sm:flex-row gap-3">
          <Link href="/daftar/murid" className="flex-1">
            <Button
              variant="primary"
              size="sm"
              isFullRounded={true}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold shadow-xs"
            >
              <span>Daftar sebagai Murid</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Link href="/daftar/guru" className="flex-1">
            <Button
              variant="outline"
              size="sm"
              isFullRounded={true}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold border-slate-200 text-[#1D3557] hover:bg-slate-50"
            >
              <span>Daftar sebagai Pelatih</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isStudent = snapshot.kind === 'student';

  if (isStudent) {
    const sessionHours = getSessionTime(
      snapshot.firstMeetSession,
      snapshot.startTime,
      snapshot.endTime,
      snapshot.timeRange,
    );
    const formattedSession = formatSessionWithTime(
      snapshot.firstMeetSession,
      snapshot.timeRange,
      snapshot.startTime,
      snapshot.endTime,
    );

    return (
      <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="sm:w-1/3 space-y-1">
          <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
            Program &amp; Jadwal Latihan
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Rincian paket kursus, lokasi kolam mitra resmi, dan pelatih pembimbing Anda.
          </p>
        </div>

        <div className="sm:w-2/3 space-y-4">
          {/* Card: Program & Schedule Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-1 dark:bg-slate-800/60 dark:border-slate-700/60">
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Paket Kursus Renang
              </span>
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
                  Paket {snapshot.packageType || 'Reguler'}
                </span>
                <Badge variant="azure" size="sm" className="text-[10px]">
                  4 Sesi / Bulan
                </Badge>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-1 dark:bg-slate-800/60 dark:border-slate-700/60">
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Lokasi Kolam Mitra
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D3557] truncate dark:text-slate-100">
                <MapPin className="w-3.5 h-3.5 text-[#0077B6] shrink-0" />
                <span className="truncate">{snapshot.locationLabel || 'Kolam Mitra'}</span>
              </div>
            </div>

            <div className="sm:col-span-2 p-3.5 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-1 dark:bg-slate-800/60 dark:border-slate-700/60">
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Jadwal &amp; Jam Sesi Resmi
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#1D3557] dark:text-slate-100">
                  <Calendar className="w-3.5 h-3.5 text-[#0077B6] shrink-0" />
                  <span>{formattedSession}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0077B6] bg-[#E0FBFC]/60 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                  <Clock className="w-3 h-3" />
                  <span>Pukul {sessionHours} WIB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inline Coach Profile - Completely Inline, No Popup! */}
          {snapshot.instructorName && (
            <div className="pt-1">
              <InstructorProfileWidget snapshot={snapshot} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Guru / Instructor View
  const cv = mediaUrl(snapshot.cvUrl);
  const normalizedSchedules = normalizeInstructorSchedules(
    snapshot.schedules,
    snapshot.scheduleLabels,
  );
  const groupedDays = groupSchedulesByDay(normalizedSchedules);

  return (
    <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="sm:w-1/3 space-y-1">
        <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
          Kualifikasi &amp; Jadwal Mengajar
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Sertifikasi resmi, pengalaman lapangan, dan matriks ketersediaan mengajar mingguan Anda.
        </p>
      </div>

      <div className="sm:w-2/3 space-y-4">
        {/* Kualifikasi Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-1 dark:bg-slate-800/60 dark:border-slate-700/60">
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Lisensi Kepelatihan
            </span>
            <p className="font-heading text-xs font-bold text-[#1D3557] dark:text-slate-100">
              {snapshot.license || 'Lisensi Resmi Pelatih Nasional'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-1 dark:bg-slate-800/60 dark:border-slate-700/60">
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Pengalaman Mengajar
            </span>
            <p className="text-xs font-semibold text-[#1D3557] dark:text-slate-100">
              {snapshot.experience || '–'}
            </p>
          </div>
        </div>

        {/* Biografi Guru */}
        {snapshot.shortBio && (
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 text-xs text-slate-600 leading-relaxed dark:bg-slate-800/40 dark:border-slate-700/60 dark:text-slate-300">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Biografi Pelatih
            </span>
            <p className="italic text-[11px] sm:text-xs">
              &ldquo;{snapshot.shortBio}&rdquo;
            </p>
          </div>
        )}

        {/* CV Link (Direct Link, no popup) */}
        {cv && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-sky-50/50 border border-sky-100 text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              Dokumen Curriculum Vitae (CV)
            </span>
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
            >
              <span>Buka Dokumen PDF</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Jadwal Mengajar Guru - Inline Cards */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
                Jadwal Mengajar Aktif ({normalizedSchedules.length} Sesi)
              </h4>
            </div>
            <Link href="/guru/atur-ulang-jadwal">
              <Button
                variant="outline"
                size="sm"
                isFullRounded={true}
                className="text-xs font-semibold border-slate-200 text-[#0077B6] hover:bg-[#E0FBFC]/40 flex items-center gap-1.5 px-3 py-1"
              >
                <Settings className="w-3 h-3" />
                <span>Atur Jadwal</span>
              </Button>
            </Link>
          </div>

          {groupedDays.length === 0 ? (
            <div className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 text-center text-xs text-slate-400">
              Belum ada slot mengajar yang terdaftar di sistem.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {groupedDays.map(({ day, items }) => (
                <InstructorDayScheduleCard key={day} day={day} items={items} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

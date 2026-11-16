'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Calendar,
  Settings,
  Sparkles,
  User,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RegistrationSnapshot } from '@/types';
import { mediaUrl, formatSessionWithTime } from '@/lib/utils';
import { InstructorProfileWidget } from './InstructorProfileWidget';
import { normalizeInstructorSchedules, groupSchedulesByDay } from './lib/scheduleHelper';
import { InstructorDayScheduleCard } from './InstructorDayScheduleCard';

interface ProfileProgramRowProps {
  snapshot?: RegistrationSnapshot | null;
}

export const ProfileProgramRow: React.FC<ProfileProgramRowProps> = ({ snapshot }) => {
  const [showCoach, setShowCoach] = useState(false);

  if (!snapshot) {
    return (
      <div className="py-6 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#00B4D8]" />
            <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
              Program Kursus Renang
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Anda belum terdaftar dalam program pelatihan renang aktif.
          </p>
        </div>
        <div className="shrink-0">
          <Link href="/daftar">
            <Button
              variant="primary"
              size="md"
              isFullRounded={true}
              className="rounded-full px-6 py-2.5 font-semibold text-xs sm:text-sm bg-[#0077B6] hover:bg-[#00B4D8] text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Pilih Jalur Pendaftaran</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isStudent = snapshot.kind === 'student';

  if (isStudent) {
    const sessionScheduleText = `${formatSessionWithTime(
      snapshot.firstMeetSession,
      snapshot.timeRange,
      snapshot.startTime,
      snapshot.endTime,
    )} WIB`;

    return (
      <div className="py-6 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="sm:w-1/3 space-y-1">
          <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
            Jadwal &amp; Program
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Informasi kelas pelatihan dan jadwal latihan resmi Anda.
          </p>
        </div>

        <div className="sm:w-2/3">
          {/* Dynamic grid: 1 column when coach is hidden, 2 columns when coach element appears side-by-side */}
          <div
            className={`grid gap-4 items-start transition-all duration-300 ${
              showCoach ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {/* Unified Schedule Card without redundant repetition */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-slate-200/70 shadow-2xs backdrop-blur-xs space-y-4 dark:bg-slate-800/60 dark:border-slate-700/60">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60">
                <span className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
                  Paket {snapshot.packageType || 'Reguler'}
                </span>
                <Badge variant="azure" size="sm" className="text-[10px]">
                  4 Sesi / Bulan
                </Badge>
              </div>

              <div className="space-y-3 text-xs">
                {/* Single clean schedule row */}
                <div className="space-y-1">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Jadwal Pertemuan Rutin
                  </span>
                  <div className="flex items-center gap-2 font-bold text-[#1D3557] dark:text-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-[#0077B6] shrink-0" />
                    <span>{sessionScheduleText}</span>
                  </div>
                </div>

                {/* Pool Location */}
                <div className="space-y-1">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Kolam Renang Latihan
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-[#0077B6] shrink-0" />
                    <span>{snapshot.locationLabel || 'Kolam Renang Mitra'}</span>
                  </div>
                </div>

                {/* Instructor row with action button */}
                {snapshot.instructorName && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="space-y-0.5">
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Pelatih Pembimbing
                      </span>
                      <p className="font-bold text-xs text-[#1D3557] dark:text-slate-100">
                        {snapshot.instructorName}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      isFullRounded={true}
                      onClick={() => setShowCoach(!showCoach)}
                      className={`text-xs font-semibold px-3 py-1.5 transition-all flex items-center gap-1.5 self-start sm:self-auto ${
                        showCoach
                          ? 'bg-[#0077B6] text-white border-[#0077B6] hover:bg-[#00B4D8]'
                          : 'border-[#00B4D8]/60 text-[#0077B6] hover:bg-[#E0FBFC]/50'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{showCoach ? 'Tutup Profil' : 'Lihat Profil Pelatih'}</span>
                      {showCoach ? (
                        <ChevronLeft className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Side element displaying instructor profile when triggered */}
            {showCoach && snapshot.instructorName && (
              <div className="w-full">
                <InstructorProfileWidget
                  snapshot={snapshot}
                  onClose={() => setShowCoach(false)}
                />
              </div>
            )}
          </div>
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
    <div className="py-6 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="sm:w-1/3 space-y-1">
        <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
          Kualifikasi &amp; Jadwal Mengajar
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Sertifikasi resmi dan matriks ketersediaan mengajar mingguan Anda.
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

        {/* CV Link */}
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

        {/* Jadwal Mengajar Guru */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
              Jadwal Mengajar Aktif ({normalizedSchedules.length} Sesi)
            </h4>
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

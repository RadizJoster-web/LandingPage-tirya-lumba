'use client';

import React from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Award, Briefcase, FileText, CheckCircle2 } from 'lucide-react';

interface InstructorProfileWidgetProps {
  snapshot: StudentRegistrationSnapshot;
}

export const InstructorProfileWidget: React.FC<InstructorProfileWidgetProps> = ({
  snapshot,
}) => {
  if (!snapshot.instructorName) {
    return null;
  }

  const license =
    snapshot.instructorLicense || 'Sertifikasi Pelatih Renang Nasional (PRSI Certified)';
  const experience =
    snapshot.instructorExperience ||
    'Berpengalaman melatih teknik renang dasar pemula hingga pembinaan atlet';
  const bio =
    snapshot.instructorBio ||
    'Dedikasi tinggi dalam mendampingi peserta didik dengan metode bertahap, aman, dan menyenangkan.';

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white/90 via-sky-50/40 to-blue-50/20 p-5 sm:p-6 shadow-xs backdrop-blur-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
      {/* Top Header Row: Coach Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <Avatar
            name={snapshot.instructorName}
            src={snapshot.instructorProfilePictureUrl}
            size="lg"
            className="w-14 h-14 rounded-full ring-2 ring-white shadow-sm shrink-0 dark:ring-slate-800"
          />
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0077B6] dark:text-sky-300">
                Pelatih Renang Resmi Anda
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00B4D8]" />
            </div>
            <h4 className="font-heading text-base sm:text-lg font-bold text-[#1D3557] truncate dark:text-slate-100">
              {snapshot.instructorName}
            </h4>
            <p className="text-xs text-slate-500 truncate dark:text-slate-400">
              {experience}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <Badge variant="azure" size="sm" className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
            PRSI Verified
          </Badge>
          <Badge variant="neutral" size="sm" className="rounded-full px-2.5 py-0.5 text-[11px]">
            Pelatih Utama
          </Badge>
        </div>
      </div>

      {/* Inline Credentials & Bio - No Popup! */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-white/80 border border-slate-100 space-y-1 shadow-2xs dark:bg-slate-800/60 dark:border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#0077B6]" />
            <span>Lisensi &amp; Akreditasi</span>
          </div>
          <p className="font-semibold text-[#1D3557] dark:text-slate-200">
            {license}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white/80 border border-slate-100 space-y-1 shadow-2xs dark:bg-slate-800/60 dark:border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-[#0077B6]" />
            <span>Rekam Jejak Pengajaran</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            {experience}
          </p>
        </div>
      </div>

      {bio && (
        <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100/80 text-xs text-slate-600 leading-relaxed dark:bg-slate-800/40 dark:border-slate-700/60 dark:text-slate-300">
          <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
            <FileText className="w-3 h-3 text-[#0077B6]" />
            <span>Biografi Kepelatihan</span>
          </div>
          <p className="italic text-[11px] sm:text-xs">
            &ldquo;{bio}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
};

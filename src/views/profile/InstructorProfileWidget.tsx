'use client';

import React from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Award, Briefcase, FileText, CheckCircle2, X } from 'lucide-react';

interface InstructorProfileWidgetProps {
  snapshot: StudentRegistrationSnapshot;
  onClose?: () => void;
}

export const InstructorProfileWidget: React.FC<InstructorProfileWidgetProps> = ({
  snapshot,
  onClose,
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
    <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-white/95 via-sky-50/50 to-blue-50/30 p-5 shadow-sm backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800 space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Top Header Row: Coach Identity & Close button */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Avatar
            name={snapshot.instructorName}
            src={snapshot.instructorProfilePictureUrl}
            size="lg"
            className="w-12 h-12 rounded-full ring-2 ring-white shadow-xs shrink-0 dark:ring-slate-800"
          />
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0077B6] dark:text-sky-300">
                Profil Pelatih Resmi
              </span>
              <CheckCircle2 className="w-3 h-3 text-[#00B4D8]" />
            </div>
            <h4 className="font-heading text-sm sm:text-base font-bold text-[#1D3557] truncate dark:text-slate-100">
              {snapshot.instructorName}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Badge variant="azure" size="sm" className="rounded-full px-2 py-0.5 text-[10px] font-semibold">
            PRSI Verified
          </Badge>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              title="Tutup Panel Pelatih"
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Qualifications list */}
      <div className="space-y-2 text-xs">
        <div className="p-2.5 rounded-xl bg-white/80 border border-slate-100/90 space-y-0.5 shadow-2xs dark:bg-slate-800/60 dark:border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            <Award className="w-3 h-3 text-[#0077B6]" />
            <span>Lisensi &amp; Akreditasi</span>
          </div>
          <p className="font-semibold text-[#1D3557] dark:text-slate-200 text-xs">
            {license}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-white/80 border border-slate-100/90 space-y-0.5 shadow-2xs dark:bg-slate-800/60 dark:border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            <Briefcase className="w-3 h-3 text-[#0077B6]" />
            <span>Rekam Jejak Kepelatihan</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-xs leading-relaxed">
            {experience}
          </p>
        </div>

        {bio && (
          <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100/80 text-xs text-slate-600 leading-relaxed dark:bg-slate-800/40 dark:border-slate-700/60 dark:text-slate-300">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
              <FileText className="w-3 h-3 text-[#0077B6]" />
              <span>Biografi Pendampingan</span>
            </div>
            <p className="italic text-[11px]">
              &ldquo;{bio}&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

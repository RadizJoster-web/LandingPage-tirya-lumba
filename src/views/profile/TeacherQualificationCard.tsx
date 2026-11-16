import React from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import { InstructorRegistrationSnapshot } from '@/types';
import { mediaUrl } from '@/lib/utils';

interface TeacherQualificationCardProps {
  snapshot: InstructorRegistrationSnapshot;
}

export const TeacherQualificationCard: React.FC<TeacherQualificationCardProps> = ({ snapshot }) => {
  const cv = mediaUrl(snapshot.cvUrl);

  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
      <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100 flex items-center gap-2">
        <Award className="w-5 h-5 text-[#0077B6]" />
        <span>Kualifikasi</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <span className="block text-[11px] font-medium text-slate-400">Lisensi Resmi</span>
          <span className="font-semibold text-[#1D3557] dark:text-slate-200 text-sm mt-0.5 block">
            {snapshot.license || 'Lisensi Pelatih Nasional'}
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-slate-400">Pengalaman Mengajar</span>
          <span className="font-semibold text-[#1D3557] dark:text-slate-200 text-sm mt-0.5 block">
            {snapshot.experience || '–'}
          </span>
        </div>

        {/* Biografi selebar kartu */}
        <div className="sm:col-span-2 pt-1 border-t border-gray-100 dark:border-slate-800">
          <span className="block text-[11px] font-medium text-slate-400">Biografi Singkat</span>
          <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {snapshot.shortBio || 'Pelatih renang berlisensi resmi dengan dedikasi tinggi membina teknik dan keselamatan berenang.'}
          </p>
        </div>

        {/* CV Link */}
        <div className="sm:col-span-2 pt-1">
          <span className="block text-[11px] font-medium text-slate-400 mb-1">Curriculum Vitae</span>
          {cv ? (
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
            >
              <span>Buka Dokumen CV Pelatih (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-slate-400 italic">Dokumen CV belum diunggah</span>
          )}
        </div>
      </div>
    </section>
  );
};

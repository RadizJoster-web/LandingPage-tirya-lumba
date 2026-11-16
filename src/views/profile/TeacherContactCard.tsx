import React from 'react';
import { InstructorRegistrationSnapshot } from '@/types';

interface TeacherContactCardProps {
  snapshot: InstructorRegistrationSnapshot;
  email: string;
}

export const TeacherContactCard: React.FC<TeacherContactCardProps> = ({
  snapshot,
  email,
}) => {
  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
      <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
        Data Kontak
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <span className="block text-[11px] font-medium text-slate-400">Nama Lengkap</span>
          <span className="font-semibold text-[#1D3557] dark:text-slate-200 text-sm mt-0.5 block">
            {snapshot.fullName || '–'}
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-slate-400">Email Akun</span>
          <span className="font-semibold text-[#1D3557] dark:text-slate-200 text-sm mt-0.5 block font-mono">
            {email}
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-slate-400">Nomor WhatsApp</span>
          <span className="font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5 block">
            {snapshot.phone || '–'}
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-slate-400">Domisili Tempat Tinggal</span>
          <span className="font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5 block">
            {snapshot.address || '–'}
          </span>
        </div>
      </div>
    </section>
  );
};

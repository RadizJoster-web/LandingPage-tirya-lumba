import React from 'react';
import { InstructorRegistrationSnapshot } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { DetailField } from './DetailField';
import { ArrowUpRight } from 'lucide-react';

export const InstructorDetail: React.FC<{ snapshot: InstructorRegistrationSnapshot }> = ({
  snapshot,
}) => {
  const cv = mediaUrl(snapshot.cvUrl);

  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
      <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
          Kualifikasi &amp; Berkas Kepelatihan
        </h3>
        {snapshot.shortBio && (
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            {snapshot.shortBio}
          </p>
        )}
      </div>

      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DetailField label="Lisensi Resmi" value={snapshot.license || '–'} />
        <DetailField label="Pengalaman Mengajar" value={snapshot.experience || '–'} />
        <DetailField label="Domisili Tempat Tinggal" value={snapshot.address || '–'} />
        <DetailField
          label="Dokumen CV"
          value={
            cv ? (
              <a
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
              >
                <span>Lihat Dokumen PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              '–'
            )
          }
        />
      </dl>
    </section>
  );
};

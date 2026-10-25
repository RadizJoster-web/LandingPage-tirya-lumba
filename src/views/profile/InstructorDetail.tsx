import React from 'react';
import { InstructorRegistrationSnapshot } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { DetailField } from './DetailField';

export const InstructorDetail: React.FC<{ snapshot: InstructorRegistrationSnapshot }> = ({
  snapshot,
}) => {
  const cv = mediaUrl(snapshot.cvUrl);

  return (
    <section className="rounded-3xl bg-white/85 p-6 ring-1 ring-slate-100 sm:p-8">
      <div>
        <h2 className="font-heading text-lg font-extrabold text-[#1D3557]">
          Kualifikasi & Berkas Pelatih
        </h2>
        {snapshot.shortBio ? (
          <p className="mt-1 text-xs leading-relaxed text-slate-600">{snapshot.shortBio}</p>
        ) : null}
      </div>

      <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DetailField label="Lisensi" value={snapshot.license || '-'} />
        <DetailField label="Pengalaman Mengajar" value={snapshot.experience || '-'} />
        <DetailField label="Domisili" value={snapshot.address || '-'} />
        <DetailField
          label="Berkas CV"
          value={
            cv ? (
              <a
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0077B6] underline underline-offset-2"
              >
                Lihat CV (PDF) ↗
              </a>
            ) : (
              'Belum tersedia'
            )
          }
        />
      </dl>
    </section>
  );
};

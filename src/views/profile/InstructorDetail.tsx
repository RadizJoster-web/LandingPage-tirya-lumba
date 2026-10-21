import React from 'react';
import Link from 'next/link';
import { InstructorRegistrationSnapshot } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { DetailField } from './DetailField';

export const InstructorDetail: React.FC<{ snapshot: InstructorRegistrationSnapshot }> = ({
  snapshot,
}) => {
  const cv = mediaUrl(snapshot.cvUrl);

  return (
    <section className="rounded-3xl bg-white/85 p-6 ring-1 ring-slate-100 sm:p-8">
      <div className="flex items-center gap-4">
        <Avatar name={snapshot.fullName} src={snapshot.profilePictureUrl} size="lg" />
        <div>
          <h2 className="font-heading text-lg font-extrabold text-[#1D3557]">
            Kualifikasi Pelatih
          </h2>
          <p className="text-xs text-slate-500">{snapshot.shortBio}</p>
        </div>
      </div>

      <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <DetailField label="Lisensi" value={snapshot.license} />
        <DetailField label="Pengalaman" value={snapshot.experience} />
        <DetailField label="Domisili" value={snapshot.address} />
        <DetailField
          label="Berkas CV"
          value={
            cv ? (
              <a
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077B6] underline"
              >
                Lihat CV
              </a>
            ) : (
              'Belum tersedia'
            )
          }
        />
      </dl>

      <div className="mt-7 border-t border-slate-100 pt-5">
        <h3 className="font-heading text-sm font-bold text-[#1D3557]">
          Jadwal Mengajar yang Dideklarasikan ({snapshot.scheduleLabels.length})
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {snapshot.scheduleLabels.map((label) => (
            <li
              key={label}
              className="rounded-full bg-[#E0FBFC]/70 px-3 py-1 text-xs font-medium text-[#0077B6]"
            >
              🗓️ {label}
            </li>
          ))}
        </ul>
        <Link href="/guru/atur-ulang-jadwal" className="mt-4 inline-block">
          <Button variant="secondary" size="sm" isFullRounded={true}>
            Atur Ulang Jadwal Mengajar
          </Button>
        </Link>
      </div>
    </section>
  );
};

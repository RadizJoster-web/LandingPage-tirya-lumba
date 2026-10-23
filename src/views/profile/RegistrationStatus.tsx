import React from 'react';
import Link from 'next/link';
import { RegistrationSnapshot } from '@/types';
import { CS_WHATSAPP } from '@/lib/constants';
import { formatDateId } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ProfileHeader } from './ProfileHeader';
import { DetailField } from './DetailField';
import { StudentDetail } from './StudentDetail';
import { InstructorDetail } from './InstructorDetail';

interface RegistrationStatusProps {
  snapshot: RegistrationSnapshot;
  /** Email akun login (payload pendaftaran pelatih tidak memuat email). */
  email: string;
}

const STATUS_LABEL: Record<string, { text: string; tone: string }> = {
  PENDING: { text: 'Menunggu Verifikasi Admin', tone: 'bg-amber-100 text-amber-800' },
  APPROVED: { text: 'Disetujui', tone: 'bg-emerald-100 text-emerald-800' },
  REJECTED: { text: 'Ditolak', tone: 'bg-red-100 text-red-700' },
};

/**
 * Ringkasan pendaftaran terakhir. API belum menyediakan endpoint baca status
 * pendaftaran, jadi isi halaman berasal dari respons submit + data yang dikirim klien.
 */
export const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ snapshot, email }) => {
  const status = STATUS_LABEL[snapshot.status] ?? {
    text: snapshot.status,
    tone: 'bg-slate-100 text-slate-700',
  };
  const isStudent = snapshot.kind === 'student';

  const waMessage = encodeURIComponent(`Halo Admin Tirya Lumba, saya *${snapshot.fullName}*, Saya ingin meninjau pendaftaran saya.\n*ID pendaftaran:* ${snapshot.registrationId} `,
  );

  return (
    <main className="min-h-[80vh] bg-gradient-to-b from-[#E0FBFC]/70 via-[#F8F9FA] to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-5">
        <ProfileHeader
          name={snapshot.fullName}
          email={email}
          photoUrl={snapshot.profilePictureUrl}
          eyebrow={isStudent ? 'Pendaftaran Murid' : 'Pendaftaran Pelatih'}
        >
          <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${status.tone}`}>
            {status.text}
          </span>
        </ProfileHeader>

        <section className="rounded-3xl bg-white/85 p-6 ring-1 ring-slate-100 sm:p-8">
          <h2 className="font-heading text-lg font-extrabold text-[#1D3557]">Ringkasan</h2>
          <dl className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <DetailField
              label="ID Pendaftaran"
              value={<span className="font-mono text-xs">{snapshot.registrationId}</span>}
            />
            <DetailField label="Nama" value={snapshot.fullName} />
            <DetailField label="No. WhatsApp" value={snapshot.phone} />
            <DetailField
              label="Dikirim"
              value={formatDateId(new Date(snapshot.submittedAt).toISOString())}
            />
          </dl>
        </section>

        {isStudent ? (
          <StudentDetail snapshot={snapshot} />
        ) : (
          <InstructorDetail snapshot={snapshot} />
        )}

        {snapshot.uploadNotice && (
          <div className="rounded-2xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-900 ring-1 ring-amber-200">
            ⚠️ {snapshot.uploadNotice}
          </div>
        )}

        <section className="rounded-3xl bg-[#E0FBFC]/50 p-6 ring-1 ring-[#00B4D8]/15 sm:p-8">
          <h2 className="font-heading text-lg font-extrabold text-[#1D3557]">
            Ada pertanyaan atau perlu revisi data?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Hubungi tim admin melalui WhatsApp dengan menyertakan ID pendaftaran Anda.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" isFullRounded={true} className="w-full sm:w-auto">
                Hubungi Admin via WhatsApp
              </Button>
            </a>
            <Link href={isStudent ? '/daftar/murid' : '/daftar/guru'}>
              <Button variant="outline" size="md" isFullRounded={true} className="w-full sm:w-auto">
                Ajukan Pendaftaran Baru
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

import React from 'react';
import Link from 'next/link';
import {
  InstructorRegistrationSnapshot,
  RegistrationSnapshot,
  StudentRegistrationSnapshot,
} from '@/types';
import { CS_WHATSAPP } from '@/lib/constants';
import { formatDateId, formatRupiah, mediaUrl } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface RegistrationStatusProps {
  snapshot: RegistrationSnapshot;
}

const STATUS_LABEL: Record<string, { text: string; variant: 'azure' | 'success' | 'coral' | 'neutral' }> = {
  PENDING: { text: 'Menunggu Verifikasi Admin', variant: 'azure' },
  APPROVED: { text: 'Disetujui', variant: 'success' },
  REJECTED: { text: 'Ditolak', variant: 'coral' },
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-[#1D3557] text-right">{value}</span>
    </div>
  );
}

/**
 * Ringkasan pendaftaran terakhir. API belum menyediakan endpoint baca status
 * pendaftaran, jadi isi halaman berasal dari respons submit + data yang dikirim klien.
 */
export const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ snapshot }) => {
  const status = STATUS_LABEL[snapshot.status] ?? {
    text: snapshot.status,
    variant: 'neutral' as const,
  };
  const isStudent = snapshot.kind === 'student';

  const waMessage = encodeURIComponent(
    `Halo Admin PT Tirya Lumba, saya ${isStudent ? snapshot.fullName : snapshot.fullName} (ID pendaftaran: ${snapshot.registrationId}). Saya ingin menanyakan status pendaftaran saya.`,
  );

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card variant="dashboard" className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-200">
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-[#1D3557]">
                Pendaftaran {isStudent ? 'Murid' : 'Pelatih'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Dikirim {formatDateId(new Date(snapshot.submittedAt).toISOString())}
              </p>
            </div>
            <Badge variant={status.variant}>{status.text}</Badge>
          </div>

          <div className="mt-5">
            <Row label="ID Pendaftaran" value={<span className="font-mono text-xs">{snapshot.registrationId}</span>} />
            <Row label="Nama" value={snapshot.fullName} />
            <Row label="No. WhatsApp" value={snapshot.phone} />
          </div>
        </Card>

        {isStudent ? (
          <StudentDetail snapshot={snapshot} />
        ) : (
          <InstructorDetail snapshot={snapshot} />
        )}

        {snapshot.uploadNotice && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            ⚠️ {snapshot.uploadNotice}
          </div>
        )}

        <Card variant="dashboard" className="p-6 space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#1D3557]">
            Ada pertanyaan atau perlu revisi data?
          </h2>
          <p className="text-sm text-slate-600">
            Hubungi tim admin melalui WhatsApp dengan menyertakan ID pendaftaran Anda. Tim admin akan membantu
            memverifikasi berkas maupun memperbarui jadwal Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="primary" size="md">
                Hubungi Admin via WhatsApp
              </Button>
            </a>
            <Link href={isStudent ? '/daftar/murid' : '/daftar/guru'}>
              <Button variant="outline" size="md">
                Ajukan Pendaftaran Baru
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

const StudentDetail: React.FC<{ snapshot: StudentRegistrationSnapshot }> = ({ snapshot }) => {
  const photo = mediaUrl(snapshot.profilePictureUrl);
  const paymentLabel =
    snapshot.paymentMethod === 'BANK_TRANSFER'
      ? 'Transfer Bank'
      : snapshot.paymentMethod === 'CASH'
        ? 'Tunai'
        : 'QRIS';

  return (
    <Card variant="dashboard" className="p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-4">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- URL dinamis dari server.
          <img
            src={photo}
            alt={`Foto ${snapshot.fullName}`}
            className="w-16 h-16 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <span className="w-16 h-16 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl">
            🏊
          </span>
        )}
        <div>
          <h2 className="font-heading font-bold text-lg text-[#1D3557]">Data Pendaftaran Kelas</h2>
          <p className="text-xs text-slate-500">
            Status kelas akan aktif setelah admin menyetujui pendaftaran ini.
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        <Row label="Kolam Renang" value={snapshot.locationLabel || '-'} />
        <Row label="Paket Kelas" value={snapshot.packageType || '-'} />
        <Row label="Guru / Pelatih" value={snapshot.instructorName || '-'} />
        <Row
          label="Pertemuan Pertama"
          value={`${formatDateId(snapshot.firstMeetDate)} • ${snapshot.firstMeetSession}`}
        />
        <Row label="Metode Pembayaran" value={paymentLabel} />
        <Row label="Total" value={formatRupiah(snapshot.packagePrice)} />
        <Row label="Ukuran T-Shirt" value={snapshot.tshirtSize} />
        <Row label="Domisili" value={snapshot.address} />
        <Row label="Sekolah / Kantor" value={snapshot.schoolOrOffice} />
      </div>
    </Card>
  );
};

const InstructorDetail: React.FC<{ snapshot: InstructorRegistrationSnapshot }> = ({ snapshot }) => {
  const photo = mediaUrl(snapshot.profilePictureUrl);
  const cv = mediaUrl(snapshot.cvUrl);

  return (
    <Card variant="dashboard" className="p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-4">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- URL dinamis dari server.
          <img
            src={photo}
            alt={`Foto ${snapshot.fullName}`}
            className="w-16 h-16 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <span className="w-16 h-16 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-2xl">
            🧑‍🏫
          </span>
        )}
        <div>
          <h2 className="font-heading font-bold text-lg text-[#1D3557]">Kualifikasi Pelatih</h2>
          <p className="text-xs text-slate-500">{snapshot.shortBio}</p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        <Row label="Lisensi" value={snapshot.license} />
        <Row label="Pengalaman" value={snapshot.experience} />
        <Row label="Domisili" value={snapshot.address} />
        <Row
          label="Berkas CV"
          value={
            cv ? (
              <a href={cv} target="_blank" rel="noopener noreferrer" className="text-[#0077B6] underline">
                Lihat CV
              </a>
            ) : (
              'Belum tersedia'
            )
          }
        />
      </div>

      <div>
        <h3 className="font-heading font-bold text-sm text-[#1D3557] mb-2">
          Jadwal Mengajar yang Dideklarasikan ({snapshot.scheduleLabels.length})
        </h3>
        <ul className="space-y-2">
          {snapshot.scheduleLabels.map((label) => (
            <li
              key={label}
              className="text-sm text-[#1D3557] bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
            >
              🗓️ {label}
            </li>
          ))}
        </ul>
        <Link href="/guru/atur-ulang-jadwal" className="inline-block mt-4">
          <Button variant="secondary" size="sm">
            Atur Ulang Jadwal Mengajar
          </Button>
        </Link>
      </div>
    </Card>
  );
};

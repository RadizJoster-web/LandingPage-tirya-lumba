import React from 'react';
import Link from 'next/link';
import { RegistrationSnapshot } from '@/types';
import { CS_WHATSAPP } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { ProfileHeader } from './ProfileHeader';
import { BlurredDashboard } from './BlurredDashboard';
import { StudentDetail } from './StudentDetail';
import { InstructorDetail } from './InstructorDetail';
import { ScheduleHighlightCard } from './ScheduleHighlightCard';
import { StudentScheduleCard } from './StudentScheduleCard';

interface RegistrationStatusProps {
  snapshot: RegistrationSnapshot;
  email: string;
}

export const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ snapshot, email }) => {
  const isStudent = snapshot.kind === 'student';
  const isPending = snapshot.status === 'PENDING';
  const isApproved = snapshot.status === 'APPROVED';
  const isRejected = snapshot.status === 'REJECTED';

  const waMessage = encodeURIComponent(
    `Halo Customer Service Tirya Lumba, saya *${snapshot.fullName}* (${email}).\nSaya ingin menanyakan perihal status pendaftaran saya.\n*ID Pendaftaran:* ${snapshot.registrationId}${
      snapshot.rejectionReason ? `\n*Catatan Admin:* ${snapshot.rejectionReason}` : ''
    }`,
  );

  return (
    <main className="min-h-[80vh] bg-gradient-to-b from-[#E0FBFC]/70 via-[#F8F9FA] to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Profil Utama: Foto, Nama, Email, dan Status Badge */}
        <ProfileHeader
          name={snapshot.fullName}
          email={email}
          photoUrl={snapshot.profilePictureUrl}
          eyebrow={isStudent ? 'Pendaftaran Murid' : 'Pendaftaran Pelatih'}
        >
          {isPending && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/90 px-3.5 py-1 text-xs font-bold text-amber-900 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Menunggu Verifikasi Admin
            </span>
          )}
          {isApproved && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-bold shadow-xs ${
                isStudent && (snapshot.activeSessions ?? 0) === 0
                  ? 'border-amber-300 bg-amber-100 text-amber-900'
                  : 'border-emerald-300 bg-emerald-100/90 text-emerald-900'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isStudent && (snapshot.activeSessions ?? 0) === 0
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />
              {isStudent && (snapshot.activeSessions ?? 0) === 0
                ? 'Paket Selesai (0 Sesi)'
                : 'Terverifikasi & Aktif'}
            </span>
          )}
          {isRejected && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-100/90 px-3.5 py-1 text-xs font-bold text-red-900 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Pendaftaran Ditolak
            </span>
          )}
        </ProfileHeader>

        {/* ========================================================
            1. TAMPILAN STATUS PENDING (MENUNGGU APROVAL)
            Tampilan seperti sebelum daftar (dengan BlurredDashboard),
            tetapi tombol daftar dihilangkan.
           ======================================================== */}
        {isPending && (
          <section className="rounded-3xl bg-white/85 p-6 ring-1 ring-slate-100 sm:p-8 space-y-5">
            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-lg font-extrabold text-[#1D3557]">
                  Buka dasbor Anda
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-0.5 text-xs font-semibold text-amber-800">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  Sedang Ditinjau
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Pendaftaran {isStudent ? 'murid' : 'pelatih'} Anda telah berhasil dikirim. Dasbor
                akan aktif setelah admin memverifikasi pendaftaran Anda.
              </p>
            </div>

            {/* Kerangka Dasbor Blur Persis Seperti Tampilan Sebelum Daftar */}
            <div className="mt-2">
              <BlurredDashboard message="Dasbor murid / pelatih aktif setelah pendaftaran diverifikasi admin" />
            </div>

            {/* Kotak Info Status (Tombol daftar murid/pelatih DIHILANGKAN agar tidak bisa daftar ulang) */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5">
              <div className="flex items-start gap-3.5">
                <span className="text-2xl">⏳</span>
                <div className="flex-1 space-y-2">
                  <h3 className="font-heading font-bold text-sm text-amber-950">
                    Pendaftaran Berhasil Dikirim & Menunggu Verifikasi
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90">
                    Berkas dan jadwal yang Anda pilih telah tersimpan dengan aman di sistem. Tim
                    admin PT Tirya Lumba sedang meninjau kualifikasi dan ketersediaan Anda. Anda{' '}
                    <strong>tidak perlu mendaftar ulang</strong>.
                  </p>
                  <div className="pt-1 flex items-center gap-3">
                    <a
                      href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" size="sm" isFullRounded={true}>
                        💬 Hubungi CS via WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            2. TAMPILAN STATUS REJECTED (DITOLAK)
           ======================================================== */}
        {isRejected && (
          <section className="overflow-hidden rounded-3xl border-2 border-red-300 bg-gradient-to-br from-red-50/90 via-red-50/40 to-rose-50/60 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-2xl text-red-600 shadow-inner">
                ❌
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <span className="inline-block rounded-md bg-red-200/70 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-red-900">
                    Status: Pendaftaran Ditolak
                  </span>
                  <h2 className="mt-1 font-heading text-xl font-extrabold text-red-950 sm:text-2xl">
                    Pendaftaran Anda Belum Dapat Disetujui
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                    Mohon maaf, pendaftaran{' '}
                    <strong className="text-slate-900">{isStudent ? 'murid' : 'pelatih'}</strong>{' '}
                    Anda belum dapat kami setujui saat ini karena berkas atau informasi yang diberikan
                    memerlukan perbaikan.
                  </p>
                </div>

                {/* Kotak Alasan Penolakan dari Admin */}
                <div className="rounded-2xl border-2 border-red-200 bg-white/95 p-4 shadow-xs">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-700">
                    Alasan dari Admin:
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-red-900 italic">
                    "{snapshot.rejectionReason || 'Berkas atau kualifikasi belum memenuhi persyaratan.'}"
                  </p>
                </div>

                {/* Opsi Aksi Khusus Status Ditolak: WhatsApp CS & Ajukan Pendaftaran Ulang */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="danger" size="md" isFullRounded={true}>
                      💬 Hubungi CS via WhatsApp
                    </Button>
                  </a>
                  <Link href={isStudent ? '/daftar/murid' : '/daftar/guru'}>
                    <Button
                      variant="outline"
                      size="md"
                      isFullRounded={true}
                      className="border-red-300 text-red-800 hover:bg-red-50"
                    >
                      📝 Ajukan Pendaftaran Ulang
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BANNER AJAKAN DAFTAR ULANG JIKA SESI LATIHAN MURID TELAH HABIS (0 SESI) */}
        {isApproved && isStudent && (snapshot.activeSessions ?? 0) === 0 && (
          <section className="overflow-hidden rounded-3xl border-2 border-[#00B4D8] bg-gradient-to-br from-[#E0FBFC] via-white to-sky-50/50 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0077B6] text-2xl text-white shadow-xs">
                  🏊‍♂️
                </div>
                <div>
                  <span className="inline-block rounded-md bg-[#0077B6] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                    Sesi Latihan Telah Habis
                  </span>
                  <h2 className="mt-1 font-heading text-lg font-extrabold text-[#1D3557] sm:text-xl">
                    Waktunya Melanjutkan Latihan Renang Anda!
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                    Paket latihan Anda sebelumnya telah selesai (0 pertemuan tersisa). Silakan
                    lakukan pendaftaran ulang untuk memilih paket dan jadwal latihan baru. Data diri
                    Anda telah tersimpan dan akan terisi secara otomatis.
                  </p>
                </div>
              </div>

              <Link href="/daftar/murid" className="shrink-0 self-start sm:self-auto">
                <Button
                  variant="primary"
                  size="md"
                  isFullRounded={true}
                  className="w-full sm:w-auto shadow-md"
                >
                  🔄 Daftar Ulang Sekarang
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* KARTU HIGHLIGHT JADWAL PELATIH (Dikelompokkan per hari, jam & hari primary, disusul lokasi) */}
        {!isStudent && (
          <ScheduleHighlightCard
            schedules={snapshot.schedules}
            scheduleLabels={snapshot.scheduleLabels ?? []}
          />
        )}

        {/* KARTU JADWAL & PENGINGAT LATIHAN MURID */}
        {isStudent && (
          <StudentScheduleCard snapshot={snapshot} />
        )}

        {/* Detail Rincian Murid atau Pelatih */}
        {isStudent ? (
          <StudentDetail snapshot={snapshot} />
        ) : (
          <InstructorDetail snapshot={snapshot} />
        )}

        {/* Bantuan & Kontak WhatsApp */}
        <section className="rounded-3xl bg-[#E0FBFC]/50 p-6 ring-1 ring-[#00B4D8]/20 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#1D3557]">
                Perlu Bantuan atau Konfirmasi?
              </h3>
              <p className="text-xs text-slate-600">
                Hubungi Customer Service Tirya Lumba via WhatsApp untuk pertanyaan seputar jadwal
                atau status verifikasi pendaftaran Anda.
              </p>
            </div>
            <a
              href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button variant="primary" size="md" isFullRounded={true} className="w-full sm:w-auto">
                💬 Chat WhatsApp CS
              </Button>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

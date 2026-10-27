import React from 'react';
import Link from 'next/link';
import { RegistrationSnapshot } from '@/types';
import { CS_WHATSAPP } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProfileHeader } from './ProfileHeader';
import { BlurredDashboard } from './BlurredDashboard';
import { StudentDetail } from './StudentDetail';
import { InstructorDetail } from './InstructorDetail';
import { ScheduleHighlightCard } from './ScheduleHighlightCard';
import { StudentScheduleCard } from './StudentScheduleCard';
import { InstructorProfileWidget } from './InstructorProfileWidget';
import { StudentAttendanceHistory } from './StudentAttendanceHistory';
import { Clock, AlertCircle, RefreshCw, MessageCircle, ArrowRight } from 'lucide-react';

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
    `Halo Customer Service PT Tirya Lumba, saya *${snapshot.fullName}* (${email}).\nSaya ingin menanyakan status pendaftaran saya.\n*ID Pendaftaran:* ${snapshot.registrationId}${
      snapshot.rejectionReason ? `\n*Catatan Admin:* ${snapshot.rejectionReason}` : ''
    }`,
  );

  return (
    <main className="min-h-[85vh] bg-[#F3F4F6] px-4 py-10 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Profil Utama */}
        <ProfileHeader
          name={snapshot.fullName}
          email={email}
          photoUrl={snapshot.profilePictureUrl}
          eyebrow={isStudent ? 'Pendaftaran Murid' : 'Pendaftaran Pelatih'}
        >
          {isPending && (
            <Badge variant="coral" size="sm" className="bg-amber-50 text-amber-800 border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Menunggu Verifikasi
            </Badge>
          )}
          {isApproved && (
            <Badge
              variant={isStudent && (snapshot.activeSessions ?? 0) === 0 ? 'coral' : 'success'}
              size="sm"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isStudent && (snapshot.activeSessions ?? 0) === 0 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
              {isStudent && (snapshot.activeSessions ?? 0) === 0 ? 'Paket Selesai (0 Sesi)' : 'Terverifikasi & Aktif'}
            </Badge>
          )}
          {isRejected && (
            <Badge variant="coral" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F59]" />
              Pendaftaran Ditolak
            </Badge>
          )}
        </ProfileHeader>

        {/* 1. STATUS PENDING (Sedang Ditinjau) */}
        {isPending && (
          <section className="rounded-xl bg-white p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-5 dark:bg-slate-900 dark:border-slate-800">
            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
                  Status Pengajuan Berkas
                </h2>
                <Badge variant="azure" size="sm">
                  Sedang Ditinjau
                </Badge>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Pendaftaran {isStudent ? 'murid' : 'pelatih'} Anda telah berhasil tersimpan di sistem. Dasbor akan aktif penuh setelah diverifikasi admin.
              </p>
            </div>

            <div className="mt-2">
              <BlurredDashboard message="Dasbor jadwal latihan aktif setelah verifikasi admin selesai" />
            </div>

            {/* Amber Status Banner */}
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <h3 className="font-heading font-bold text-sm text-amber-950">
                    Pendaftaran Berhasil Dikirim &amp; Menunggu Verifikasi
                  </h3>
                  <p className="text-xs leading-relaxed text-amber-900/90">
                    Data kesiswaan dan bukti pembayaran Anda sedang dalam proses peninjauan oleh tim admin PT Tirya Lumba. Anda <strong>tidak perlu mendaftar ulang</strong>.
                  </p>
                  <div className="pt-1">
                    <a
                      href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        isFullRounded={false}
                        className="flex items-center gap-1.5 font-semibold"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Hubungi CS via WhatsApp</span>
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. STATUS REJECTED (Ditolak) */}
        {isRejected && (
          <section className="rounded-xl border border-rose-200 bg-rose-50/50 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <AlertCircle className="w-6 h-6 text-[#FF6F59] shrink-0 mt-0.5" />
              <div className="flex-1 space-y-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">
                    Status: Pendaftaran Ditolak
                  </span>
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1D3557] mt-0.5">
                    Pendaftaran Anda Belum Dapat Disetujui
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Mohon maaf, berkas atau jadwal pendaftaran {isStudent ? 'murid' : 'pelatih'} Anda memerlukan perbaikan sebelum dapat diverifikasi.
                  </p>
                </div>

                {/* Kotak Alasan Penolakan dari Admin */}
                <div className="rounded-lg bg-white p-4 border border-rose-200/80 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Catatan Resmi dari Admin:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-rose-900 italic">
                    "{snapshot.rejectionReason || 'Berkas atau kualifikasi belum memenuhi persyaratan.'}"
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="danger"
                      size="sm"
                      isFullRounded={false}
                      className="flex items-center gap-1.5 font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Hubungi CS via WhatsApp</span>
                    </Button>
                  </a>
                  <Link href={isStudent ? '/daftar/murid' : '/daftar/guru'}>
                    <Button
                      variant="outline"
                      size="sm"
                      isFullRounded={false}
                      className="border-rose-300 text-rose-800 hover:bg-rose-100 flex items-center gap-1.5 font-semibold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Ajukan Pendaftaran Ulang</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. BANNER PERPANJANGAN PAKET (activeSessions === 0) */}
        {isApproved && isStudent && (snapshot.activeSessions ?? 0) === 0 && (
          <section className="rounded-xl border-2 border-[#00B4D8] bg-gradient-to-r from-[#E0FBFC] via-white to-sky-50/50 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="space-y-1.5">
                <Badge variant="azure" size="sm">
                  Sesi Latihan Telah Selesai
                </Badge>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1D3557]">
                  Waktunya Melanjutkan Latihan Renang Anda!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                  Paket latihan Anda sebelumnya telah rampung (0 pertemuan tersisa). Silakan lakukan pendaftaran ulang untuk memilih paket baru. Data diri Anda terisi secara otomatis.
                </p>
              </div>

              <Link href="/daftar/murid" className="shrink-0 self-start sm:self-auto">
                <Button
                  variant="primary"
                  size="md"
                  isFullRounded={false}
                  className="font-semibold flex items-center gap-2 shadow-sm"
                >
                  <span>Daftar Ulang Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* 4. ACTIVE INSTRUCTOR SCHEDULE HIGHLIGHT */}
        {!isStudent && (
          <ScheduleHighlightCard
            schedules={snapshot.schedules}
            scheduleLabels={snapshot.scheduleLabels ?? []}
          />
        )}

        {/* 5. ACTIVE STUDENT BENTO DASHBOARD */}
        {isStudent && isApproved && (
          <InstructorProfileWidget snapshot={snapshot} />
        )}

        {isStudent && (
          <StudentScheduleCard snapshot={snapshot} />
        )}

        {isStudent && isApproved && (
          <StudentAttendanceHistory />
        )}

        {/* Consolidated Details (Student or Instructor) */}
        {isStudent ? (
          <StudentDetail snapshot={snapshot} />
        ) : (
          <InstructorDetail snapshot={snapshot} />
        )}

        {/* Bantuan & Kontak WhatsApp */}
        <section className="rounded-xl bg-white border border-gray-200/90 p-5 sm:p-6 shadow-xs dark:bg-slate-900 dark:border-slate-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-heading font-bold text-sm text-[#1D3557] dark:text-slate-100">
                Pertanyaan seputar Jadwal atau Status?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tim Customer Service kami siap membantu konfirmasi sesi latihan dan perubahan jadwal Anda.
              </p>
            </div>
            <a
              href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button
                variant="outline"
                size="sm"
                isFullRounded={false}
                className="flex items-center gap-1.5 border-slate-300 text-[#0077B6] hover:bg-[#E0FBFC]/50"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat WhatsApp CS</span>
              </Button>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

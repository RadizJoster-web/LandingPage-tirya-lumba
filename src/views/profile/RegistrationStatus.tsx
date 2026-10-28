import React from 'react';
import { RegistrationSnapshot } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ProfileHeader } from './ProfileHeader';
import { StudentDetail } from './StudentDetail';
import { InstructorDetail } from './InstructorDetail';
import { ScheduleHighlightCard } from './ScheduleHighlightCard';
import { StudentScheduleCard } from './StudentScheduleCard';
import { InstructorProfileWidget } from './InstructorProfileWidget';
import { StudentAttendanceHistory } from './StudentAttendanceHistory';
import { StatusPendingSection } from './StatusPendingSection';
import { StatusRejectedSection } from './StatusRejectedSection';
import { SessionRenewalBanner } from './SessionRenewalBanner';
import { ProfileContactSupport } from './ProfileContactSupport';

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

        {isPending && <StatusPendingSection isStudent={isStudent} />}

        {isRejected && (
          <StatusRejectedSection
            isStudent={isStudent}
            rejectionReason={snapshot.rejectionReason ?? undefined}
            waMessage={waMessage}
          />
        )}

        {isApproved && isStudent && (snapshot.activeSessions ?? 0) === 0 && (
          <SessionRenewalBanner />
        )}

        {!isStudent && (
          <ScheduleHighlightCard
            schedules={snapshot.schedules}
            scheduleLabels={snapshot.scheduleLabels ?? []}
          />
        )}

        {isStudent && isApproved && (
          <InstructorProfileWidget snapshot={snapshot} />
        )}

        {isStudent && (
          <StudentScheduleCard snapshot={snapshot} />
        )}

        {isStudent && isApproved && (
          <StudentAttendanceHistory />
        )}

        {isStudent ? (
          <StudentDetail snapshot={snapshot} />
        ) : (
          <InstructorDetail snapshot={snapshot} />
        )}

        <ProfileContactSupport waMessage={waMessage} />
      </div>
    </main>
  );
};

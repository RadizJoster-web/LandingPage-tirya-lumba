import React, { useState } from 'react';
import { UserSession, StudentRegistration } from '@/types';
import { INITIAL_POOLS, INITIAL_INSTRUCTORS } from '@/lib/constants';
import { DashboardHeader } from './DashboardHeader';
import { StudentWidgets } from './StudentWidgets';
import { SessionHistory } from './SessionHistory';
import { RenewBanner } from './RenewBanner';
import { LicenseModal } from './LicenseModal';

interface StudentDashboardProps {
  user: UserSession;
  reg: StudentRegistration;
  onStatusChange: (status: 'approved' | 'rejected') => void;
  onUpdateCompletedSessions: (count: number) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  reg,
  onStatusChange,
  onUpdateCompletedSessions,
}) => {
  const [licenseModal, setLicenseModal] = useState<string | null>(null);

  const pool = INITIAL_POOLS.find((p) => p.id === reg.poolId) || INITIAL_POOLS[0];
  const coach = INITIAL_INSTRUCTORS.find((c) => c.name === reg.coachName) || INITIAL_INSTRUCTORS[0];
  const activeSessions = Math.max(0, reg.totalSessions - reg.completedSessions);

  const startDateObj = reg.startDate ? new Date(reg.startDate) : new Date();
  const sessionDates = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(startDateObj);
    d.setDate(d.getDate() + 7 * i);
    return d;
  });

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-6xl mx-auto space-y-8">
        <DashboardHeader
          title="Dasbor Profil Siswa"
          badgeText="Murid Aktif"
          userInfo={`${reg.name} · ${user.email} · ${reg.phone}`}
          status={reg.status}
          onStatusChange={onStatusChange}
        />

        <StudentWidgets
          reg={reg}
          pool={pool}
          coach={coach}
          activeSessions={activeSessions}
          onShowLicense={() => setLicenseModal(coach.license)}
        />

        {activeSessions === 0 && <RenewBanner coachName={coach.name} />}

        <SessionHistory
          completedSessions={reg.completedSessions}
          totalSessions={reg.totalSessions}
          sessionDates={sessionDates}
          startTime={reg.startTime}
          coachName={coach.name}
          onIncrement={() => onUpdateCompletedSessions(Math.min(8, reg.completedSessions + 1))}
          onReset={() => onUpdateCompletedSessions(0)}
        />

        {licenseModal && (
          <LicenseModal
            coachName={coach.name}
            license={licenseModal}
            onClose={() => setLicenseModal(null)}
          />
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { RegistrationSnapshot } from '@/types';
import { useAuth } from '@/lib/auth';
import { UnifiedProfileCard } from './UnifiedProfileCard';
import { getProfileStats, renderStatusBadge } from './profileViewModel';

interface RegistrationStatusProps {
  snapshot: RegistrationSnapshot;
  email: string;
}

export const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ snapshot, email }) => {
  const { logout } = useAuth();
  const stats = getProfileStats(snapshot.kind, snapshot);
  const statusBadge = renderStatusBadge(snapshot);

  const waMessage = encodeURIComponent(
    `Halo Customer Service PT Tirya Lumba, saya *${snapshot.fullName}* (${email}).\nSaya ingin menanyakan status pendaftaran saya.\n*ID Pendaftaran:* ${snapshot.registrationId}${
      snapshot.rejectionReason ? `\n*Catatan Admin:* ${snapshot.rejectionReason}` : ''
    }`,
  );

  return (
    <main className="min-h-[85vh] bg-[#F8FAFC] px-4 py-8 sm:py-12 sm:px-6 lg:px-8 dark:bg-slate-950 flex justify-center items-center">
      <UnifiedProfileCard
        name={snapshot.fullName}
        email={email}
        photoUrl={snapshot.profilePictureUrl}
        snapshot={snapshot}
        stats={stats}
        statusBadge={statusBadge}
        waMessage={waMessage}
        onLogout={logout}
      />
    </main>
  );
};

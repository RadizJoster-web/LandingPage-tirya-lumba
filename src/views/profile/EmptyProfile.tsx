import React from 'react';
import { useAuth } from '@/lib/auth';
import { UnifiedProfileCard } from './UnifiedProfileCard';
import { getProfileStats, renderStatusBadge } from './profileViewModel';

interface EmptyProfileProps {
  name: string;
  email: string;
  photoUrl?: string | null;
}

export const EmptyProfile: React.FC<EmptyProfileProps> = ({ name, email, photoUrl }) => {
  const { logout } = useAuth();
  const stats = getProfileStats('USER', null);
  const statusBadge = renderStatusBadge(null);

  const waMessage = encodeURIComponent(
    `Halo Customer Service PT Tirya Lumba, saya *${name}* (${email}).\nSaya ingin menanyakan informasi pendaftaran kursus renang.`,
  );

  return (
    <main className="min-h-[85vh] bg-[#F8FAFC] px-4 py-8 sm:py-12 sm:px-6 lg:px-8 dark:bg-slate-950 flex justify-center items-center">
      <UnifiedProfileCard
        name={name}
        email={email}
        photoUrl={photoUrl}
        snapshot={null}
        stats={stats}
        statusBadge={statusBadge}
        waMessage={waMessage}
        onLogout={logout}
      />
    </main>
  );
};

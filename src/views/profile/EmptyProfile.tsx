'use client';

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
    <main className="min-h-screen bg-gradient-to-br from-[#0077B6]/10 via-[#E0FBFC]/40 to-[#00B4D8]/15 relative overflow-hidden py-10 sm:py-16 px-4 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950/20">
      {/* Ambient glowing aquatic orbs for transparent layered depth */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#0077B6]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full">
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
      </div>
    </main>
  );
};

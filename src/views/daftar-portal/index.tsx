'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { PortalHeader } from './PortalHeader';
import { MuridPortalCard } from './MuridPortalCard';
import { GuruPortalCard } from './GuruPortalCard';

export default function DaftarPortalParent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <PortalHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <MuridPortalCard />
          <GuruPortalCard />
        </div>
      </div>
    </div>
  );
}

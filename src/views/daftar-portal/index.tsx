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
        <div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/40 via-white to-[#F8F9FA]">
      <div className="max-w-4xl mx-auto text-center">
        <PortalHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
          <MuridPortalCard />
          <GuruPortalCard />
        </div>
      </div>
    </div>
  );
}

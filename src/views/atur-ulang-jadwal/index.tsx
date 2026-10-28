'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { toErrorMessage } from '@/lib/http';
import { RescheduleHeader } from './RescheduleHeader';
import { RescheduleTokenBanner } from './RescheduleTokenBanner';
import { RescheduleForm } from './RescheduleForm';
import { useRescheduleData } from './lib/useRescheduleData';
import { submitReschedule } from './lib/api';
import { CheckCircle2 } from 'lucide-react';

export default function AturUlangJadwalParent() {
  const router = useRouter();
  const { user, registration, isLoading: authLoading, refreshRegistration } = useAuth();
  const {
    areas,
    rescheduleData,
    selectedLocationIds,
    selectedSlots,
    sessionMap,
    errorMsg,
    setErrorMsg,
    isPageLoading,
    activeStudentSlots,
    poolsByArea,
    selectedPools,
    handleToggleLocation,
    handleToggleSlot,
  } = useRescheduleData();

  const [notification, setNotification] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!authLoading && (!user || (user.role !== 'INSTRUCTOR' && registration?.kind !== 'instructor'))) {
      router.push('/profile');
    }
  }, [user, registration, authLoading, router]);

  const canReschedule = Boolean(rescheduleData?.canReschedule);
  const remainingTokens = rescheduleData?.remainingTokens ?? 0;
  const lastRescheduledFormatted = rescheduleData?.lastRescheduledAt
    ? new Date(rescheduleData.lastRescheduledAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Belum pernah atur ulang';

  const nextAvailableFormatted = rescheduleData?.nextAvailableAt
    ? new Date(rescheduleData.nextAvailableAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '-';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setNotification('');

    if (!canReschedule) {
      setErrorMsg('Kesempatan atur ulang jadwal bulan ini sudah terpakai. Harap tunggu periode berikutnya.');
      return;
    }

    if (selectedSlots.length < 1) {
      setErrorMsg('Guru wajib memilih minimal satu sesi jadwal mengajar.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payloadSchedules = selectedSlots.map((slotKey) => {
        const [locationId, dayOfWeek, sessionName] = slotKey.split('|');
        return { locationId, dayOfWeek, sessionName };
      });

      await submitReschedule(payloadSchedules);
      await refreshRegistration();

      setNotification('Jadwal mengajar berhasil diperbarui. Mengalihkan ke profil...');
      setTimeout(() => router.push('/profile'), 1500);
    } catch (err) {
      setErrorMsg(toErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isPageLoading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto space-y-6">
        <RescheduleHeader />

        {notification && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        <RescheduleTokenBanner
          canReschedule={canReschedule}
          remainingTokens={remainingTokens}
          lastRescheduledFormatted={lastRescheduledFormatted}
          nextAvailableFormatted={nextAvailableFormatted}
        />

        <RescheduleForm
          areas={areas}
          poolsByArea={poolsByArea}
          selectedLocationIds={selectedLocationIds}
          onToggleLocation={handleToggleLocation}
          selectedPools={selectedPools}
          sessionMap={sessionMap}
          selectedSlots={selectedSlots}
          onToggleSlot={handleToggleSlot}
          activeStudentSlots={activeStudentSlots}
          errorMsg={errorMsg}
          isSubmitting={isSubmitting}
          canReschedule={canReschedule}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/profile')}
        />
      </div>
    </div>
  );
}

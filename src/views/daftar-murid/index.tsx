'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { MuridWizardLayout } from './MuridWizardLayout';
import { MuridFormSteps } from './MuridFormSteps';
import { useMuridForm } from './useMuridForm';
import { useMuridSubmit } from './lib/useMuridSubmit';

export default function DaftarMuridParent() {
  const router = useRouter();
  const {
    user,
    registration,
    isLoading: authLoading,
    persistRegistration,
    refreshRegistration,
  } = useAuth();

  const studentSnapshot =
    registration?.kind === 'student' ? registration : null;

  const [photoUrl, setPhotoUrl] = useState(
    studentSnapshot?.profilePictureUrl ?? user?.profilePictureUrl ?? '',
  );
  const [paymentProofUrl, setPaymentProofUrl] = useState('');

  const form = useMuridForm(user?.email ?? '', studentSnapshot, user);

  const { handleNextStep1, handleNextStep2, handleSubmit } = useMuridSubmit({
    form,
    photoUrl,
    setPhotoUrl,
    paymentProofUrl,
    setPaymentProofUrl,
    persistRegistration,
    refreshRegistration,
  });

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (studentSnapshot?.profilePictureUrl && !photoUrl) {
      setPhotoUrl(studentSnapshot.profilePictureUrl);
    }
  }, [studentSnapshot, photoUrl]);

  if (authLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <MuridWizardLayout step={form.step} errorMsg={form.errorMsg}>
      <MuridFormSteps
        form={form}
        areas={form.areas}
        sessions={form.sessions}
        sessionLoading={form.sessionLoading}
        instructors={form.instructors}
        instructorLoading={form.instructorLoading}
        isLoadingData={form.isLoadingData}
        savedPhotoUrl={photoUrl}
        savedPaymentProofUrl={paymentProofUrl}
        onNextStep1={handleNextStep1}
        onNextStep2={handleNextStep2}
        onSubmit={handleSubmit}
      />
    </MuridWizardLayout>
  );
}

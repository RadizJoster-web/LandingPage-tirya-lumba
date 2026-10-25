'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import {
  RegistrationResult,
  StudentRegistrationPayload,
} from '@/types';
import { request, toErrorMessage } from '@/lib/http';
import { MuridWizardLayout } from './MuridWizardLayout';
import { MuridFormSteps } from './MuridFormSteps';
import { useMuridForm } from './useMuridForm';
import {
  buildStudentPayload,
  createStudentSnapshot,
} from './registrationHelper';

async function uploadStudentPhoto(file: File) {
  const form = new FormData();
  form.append('profilePicture', file);
  const res = await request<{ profilePictureUrl?: string }>(
    '/upload-file/student/profile',
    { method: 'POST', body: form },
  );
  const url = res.data?.profilePictureUrl ?? '';
  return { url, urlReported: Boolean(url) };
}

async function uploadPaymentProof(file: File) {
  const form = new FormData();
  form.append('paymentProof', file);
  form.append('profilePicture', file);
  const res = await request<{ paymentProofUrl?: string; profilePictureUrl?: string }>(
    '/upload-file/student/payment',
    { method: 'POST', body: form },
  );
  const url = res.data?.paymentProofUrl ?? res.data?.profilePictureUrl ?? '';
  return { url, urlReported: Boolean(url) };
}

async function submitStudent(payload: StudentRegistrationPayload) {
  const res = await request<RegistrationResult>('/register/student', {
    method: 'POST',
    body: payload,
  });
  return res.data;
}

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
  const [paymentProofUrl, setPaymentProofUrl] = useState(
    studentSnapshot?.paymentProofUrl ?? '',
  );

  const form = useMuridForm(user?.email ?? '', studentSnapshot, user);

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (studentSnapshot?.profilePictureUrl && !photoUrl) {
      setPhotoUrl(studentSnapshot.profilePictureUrl);
    }
    if (studentSnapshot?.paymentProofUrl && !paymentProofUrl) {
      setPaymentProofUrl(studentSnapshot.paymentProofUrl);
    }
  }, [studentSnapshot, photoUrl, paymentProofUrl]);

  const handleNextStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');

    const hasPhoto = Boolean(form.photoFile || photoUrl);
    if (
      !form.locationId ||
      !form.packageId ||
      !form.firstMeetDate ||
      !form.sessionName ||
      !form.instructorId ||
      !hasPhoto
    ) {
      form.setErrorMsg(
        'Pastikan kolam, paket, tanggal, sesi, guru, dan foto 4x6 sudah dipilih.',
      );
      return;
    }

    form.setIsSubmitting(true);
    try {
      if (form.photoFile) {
        const photo = await uploadStudentPhoto(form.photoFile);
        setPhotoUrl(photo.url);
      }
      form.setStep(3);
    } catch (err) {
      form.setErrorMsg(`Gagal mengunggah foto profil 4x6: ${toErrorMessage(err)}`);
    } finally {
      form.setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');

    const hasPaymentProof = Boolean(form.paymentProofFile || paymentProofUrl);
    if (!hasPaymentProof) {
      form.setErrorMsg('Bukti pembayaran wajib diunggah.');
      return;
    }

    form.setIsSubmitting(true);
    try {
      let finalProofUrl = paymentProofUrl;
      let reported = Boolean(paymentProofUrl);

      if (form.paymentProofFile) {
        const proof = await uploadPaymentProof(form.paymentProofFile);
        finalProofUrl = proof.url;
        reported = proof.urlReported;
      }

      const payload = buildStudentPayload(form, photoUrl, finalProofUrl);
      const res = await submitStudent(payload);

      persistRegistration(
        createStudentSnapshot(form, payload, res, reported),
      );
      await refreshRegistration();

      router.push('/profile');
    } catch (err) {
      form.setErrorMsg(`Gagal memproses pendaftaran murid: ${toErrorMessage(err)}`);
    } finally {
      form.setIsSubmitting(false);
    }
  };

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
        onNextStep2={handleNextStep2}
        onSubmit={handleSubmit}
      />
    </MuridWizardLayout>
  );
}

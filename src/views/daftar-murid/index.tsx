'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import {
  Area,
  AvailableInstructor,
  LessonPackage,
  Location,
  RegistrationResult,
  SessionSlot,
  StudentRegistrationPayload,
} from '@/types';
import { request, toErrorMessage } from '@/lib/http';
import { MuridWizardLayout } from './MuridWizardLayout';
import { MuridFormSteps } from './MuridFormSteps';
import { useMuridForm } from './useMuridForm';
import { useMuridData } from './useMuridData';
import {
  buildStudentPayload,
  createStudentSnapshot,
} from './registrationHelper';

async function fetchMaster() {
  const [a, l, p] = await Promise.all([
    request<Area[]>('/areas', {
      method: 'GET',
      revalidate: 3600,
      tag: 'areas',
    }),
    request<Location[]>('/locations', {
      method: 'GET',
      revalidate: 3600,
      tag: 'locations',
    }),
    request<LessonPackage[]>('/packages', {
      method: 'GET',
      revalidate: 3600,
      tag: 'packages',
    }),
  ]);
  return { areas: a.data, locations: l.data, packages: p.data };
}

async function fetchSessions(locationId: string, dayOfWeek: string) {
  const q = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${q}`, { method: 'GET' });
  return res.data;
}

async function fetchInstructors(p: {
  locationId: string;
  dayOfWeek: string;
  sessionName: string;
  packageType?: 'REGULER' | 'PRIVAT';
}) {
  const q = new URLSearchParams({
    locationId: p.locationId,
    dayOfWeek: p.dayOfWeek,
    sessionName: p.sessionName,
    ...(p.packageType ? { packageType: p.packageType } : {}),
  });
  const res = await request<AvailableInstructor[]>(
    `/instructor/available?${q}`,
    { method: 'GET' },
  );
  return res.data;
}

async function uploadStudentPhoto(file: File) {
  const form = new FormData();
  form.append('profilePicture', file);
  const res = await request<{ profilePictureUrl?: string }>(
    '/upload-file/student/profil',
    { method: 'POST', body: form },
  );
  const url = res.data?.profilePictureUrl ?? '';
  return { url, urlReported: Boolean(url) };
}

async function uploadPaymentProof(file: File) {
  const form = new FormData();
  form.append('profilePicture', file);
  const res = await request<{ profilePictureUrl?: string }>(
    '/upload-file/student/payment',
    { method: 'POST', body: form },
  );
  const url = res.data?.profilePictureUrl ?? '';
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
  const { user, isLoading: authLoading, persistRegistration } = useAuth();
  const [photoUrl, setPhotoUrl] = useState('');
  const [tempLocs, setTempLocs] = useState<Location[]>([]);
  const [tempPkgs, setTempPkgs] = useState<LessonPackage[]>([]);
  const [tempInsts, setTempInsts] = useState<AvailableInstructor[]>([]);

  const form = useMuridForm(user?.email ?? '', tempLocs, tempPkgs, tempInsts);
  const handleError = useCallback(
    (msg: string) => form.setErrorMsg(msg),
    [form],
  );
  const data = useMuridData({
    locationId: form.locationId,
    firstMeetDate: form.firstMeetDate,
    sessionName: form.sessionName,
    packageType: form.selectedPackage?.type === 'Privat' ? 'PRIVAT' : 'REGULER',
    fetchMaster,
    fetchSessions,
    fetchInstructors,
    onError: handleError,
  });

  useEffect(() => {
    setTempLocs(data.locations);
    setTempPkgs(data.packages);
    setTempInsts(data.instructors);
  }, [data.locations, data.packages, data.instructors]);

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  const handleNextStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');
    if (
      !form.locationId ||
      !form.packageId ||
      !form.firstMeetDate ||
      !form.sessionName ||
      !form.instructorId ||
      !form.photoFile
    ) {
      form.setErrorMsg(
        'Pastikan kolam, paket, tanggal, sesi, guru, dan foto 4x6 sudah dipilih.',
      );
      return;
    }
    form.setIsSubmitting(true);
    try {
      const photo = await uploadStudentPhoto(form.photoFile);
      setPhotoUrl(photo.url);
      form.setStep(3);
    } catch (err) {
      form.setErrorMsg(toErrorMessage(err));
    } finally {
      form.setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');
    if (!form.paymentProofFile) {
      form.setErrorMsg('Bukti pembayaran wajib diunggah.');
      return;
    }
    form.setIsSubmitting(true);
    try {
      const proof = await uploadPaymentProof(form.paymentProofFile);
      const payload = buildStudentPayload(form, photoUrl, proof.url);
      const res = await submitStudent(payload);
      persistRegistration(
        createStudentSnapshot(form, payload, res, proof.urlReported),
      );
      router.push('/profile');
    } catch (err) {
      form.setErrorMsg(toErrorMessage(err));
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
        areas={data.areas}
        sessions={data.sessions}
        sessionLoading={data.sessionLoading}
        instructors={data.instructors}
        instructorLoading={data.instructorLoading}
        isLoadingData={data.isLoadingData}
        onNextStep2={handleNextStep2}
        onSubmit={handleSubmit}
      />
    </MuridWizardLayout>
  );
}

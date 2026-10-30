'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Area, Location, SessionSlot } from '@/types';
import { toErrorMessage } from '@/lib/http';
import { GuruWizardLayout } from './GuruWizardLayout';
import { GuruFormSteps } from './GuruFormSteps';
import { useGuruForm } from './useGuruForm';
import { useGuruUpload } from './useGuruUpload';
import {
  buildInstructorPayload,
  buildInstructorSnapshot,
} from './lib/buildInstructorSnapshot';
import {
  fetchMasterData,
  fetchSessions,
  uploadCv,
  uploadProfilePicture,
  submitInstructor,
} from './lib/api';

export default function DaftarGuruParent() {
  const router = useRouter();
  const { user, isLoading: authLoading, persistRegistration } = useAuth();
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [sessionMap, setSessionMap] = useState<Record<string, SessionSlot[]>>({});
  const form = useGuruForm(locations);

  const { isCvUploading, isPhotoUploading, handleCvChange, handlePhotoChange } =
    useGuruUpload({
      uploadCv,
      uploadProfilePicture,
      setCvFile: form.setCvFile,
      setCvUrl: form.setCvUrl,
      setPhotoFile: form.setPhotoFile,
      setProfilePictureUrl: form.setProfilePictureUrl,
      setErrorMsg: form.setErrorMsg,
    });

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    let active = true;
    fetchMasterData()
      .then((data) => {
        if (active) {
          setAreas(data.areas);
          setLocations(data.locations);
        }
      })
      .catch((err) => {
        if (active) form.setErrorMsg(toErrorMessage(err));
      });
    return () => {
      active = false;
    };
  }, []);

  const pendingIds = form.selectedLocationIds.filter((id) => !sessionMap[id]);
  useEffect(() => {
    if (pendingIds.length === 0) return;
    let active = true;
    Promise.all(
      pendingIds.map(async (locId) => {
        const slots = await fetchSessions(locId).catch(() => []);
        return [locId, slots] as const;
      }),
    )
      .then((entries) => {
        if (active) {
          setSessionMap((prev) => ({
            ...prev,
            ...Object.fromEntries(entries),
          }));
        }
      })
      .catch((err) => {
        if (active) form.setErrorMsg(toErrorMessage(err));
      });
    return () => {
      active = false;
    };
  }, [form.selectedLocationIds, sessionMap]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');
    if (
      form.selectedLocationIds.length === 0 ||
      form.schedules.length === 0 ||
      !form.cvUrl ||
      !form.profilePictureUrl
    ) {
      form.setErrorMsg(
        'Pastikan kolam, jadwal, berkas CV, dan foto profil sudah lengkap.',
      );
      return;
    }
    form.setIsSubmitting(true);
    try {
      const payload = buildInstructorPayload(form);
      const res = await submitInstructor(payload);
      persistRegistration(
        buildInstructorSnapshot({
          payload,
          result: res,
          scheduleLabels: form.scheduleLabels,
        }),
      );
      router.push('/profile?sukses=1');
    } catch (err) {
      form.setErrorMsg(toErrorMessage(err));
      form.setIsSubmitting(false);
    }
  };

  return (
    <GuruWizardLayout step={form.step} errorMsg={form.errorMsg}>
      <GuruFormSteps
        form={form}
        areas={areas}
        locations={locations}
        sessionMap={sessionMap}
        sessionsLoading={pendingIds.length > 0}
        isPhotoUploading={isPhotoUploading}
        isCvUploading={isCvUploading}
        onPhotoChange={handlePhotoChange}
        onCvChange={handleCvChange}
        onSubmit={handleSubmit}
      />
    </GuruWizardLayout>
  );
}

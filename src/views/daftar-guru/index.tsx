'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { DAYS_ID } from '@/lib/constants';
import {
  Area,
  InstructorRegistrationPayload,
  Location,
  RegistrationResult,
  SessionSlot,
} from '@/types';
import { ApiError, request, toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { StepIndicator } from '@/pages/daftar-murid/StepIndicator';
import { StepBiodataGuru } from './StepBiodataGuru';
import { StepKualifikasi } from './StepKualifikasi';
import { StepKolamJadwal } from './StepKolamJadwal';
import { useGuruForm } from './useGuruForm';

async function fetchMasterData(): Promise<{
  areas: Area[];
  locations: Location[];
}> {
  const [a, l] = await Promise.all([
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
  ]);
  return { areas: a.data, locations: l.data };
}

async function fetchSessions(
  locationId: string,
  dayOfWeek: string,
): Promise<SessionSlot[]> {
  const query = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${query}`, {
    method: 'GET',
  });
  return res.data;
}

async function uploadCv(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await request<{ cvUrl?: string }>('/upload-file/instructor/cv', {
    method: 'POST',
    body: form,
  });
  if (!res.data?.cvUrl) {
    throw new ApiError('Server tidak mengembalikan URL CV.', 200);
  }
  return res.data.cvUrl;
}

async function uploadProfilePicture(file: File): Promise<string> {
  const form = new FormData();
  form.append('profilePicture', file);
  const res = await request<{ profilePictureUrl?: string }>(
    '/upload-file/instructor/profile',
    {
      method: 'POST',
      body: form,
    },
  );
  if (!res.data?.profilePictureUrl) {
    throw new ApiError('Server tidak mengembalikan URL foto profil.', 200);
  }
  return res.data.profilePictureUrl;
}

async function submitInstructor(
  payload: InstructorRegistrationPayload,
): Promise<RegistrationResult> {
  const res = await request<RegistrationResult>('/register/instructor', {
    method: 'POST',
    body: payload,
  });
  return res.data;
}

export default function DaftarGuruParent() {
  const router = useRouter();
  const { user, isLoading: authLoading, persistRegistration } = useAuth();
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [sessionMap, setSessionMap] = useState<Record<string, SessionSlot[]>>(
    {},
  );
  const [isCvUploading, setIsCvUploading] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const cvUploadId = useRef(0);
  const photoUploadId = useRef(0);
  const form = useGuruForm(locations);

  const handleCvChange = async (file: File | null) => {
    const uploadId = ++cvUploadId.current;
    form.setCvFile(file);
    form.setCvUrl('');
    form.setErrorMsg('');
    if (!file) {
      setIsCvUploading(false);
      return;
    }

    setIsCvUploading(true);
    try {
      const url = await uploadCv(file);
      if (uploadId === cvUploadId.current) form.setCvUrl(url);
    } catch (err) {
      if (uploadId === cvUploadId.current)
        form.setErrorMsg(toErrorMessage(err));
    } finally {
      if (uploadId === cvUploadId.current) setIsCvUploading(false);
    }
  };

  const handlePhotoChange = async (file: File | null) => {
    const uploadId = ++photoUploadId.current;
    form.setPhotoFile(file);
    form.setProfilePictureUrl('');
    form.setErrorMsg('');
    if (!file) {
      setIsPhotoUploading(false);
      return;
    }

    setIsPhotoUploading(true);
    try {
      const url = await uploadProfilePicture(file);
      if (uploadId === photoUploadId.current) form.setProfilePictureUrl(url);
    } catch (err) {
      if (uploadId === photoUploadId.current)
        form.setErrorMsg(toErrorMessage(err));
    } finally {
      if (uploadId === photoUploadId.current) setIsPhotoUploading(false);
    }
  };

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
        const perDay = await Promise.all(
          DAYS_ID.map((d) => fetchSessions(locId, d).catch(() => [])),
        );
        return [locId, perDay.flat()] as const;
      }),
    )
      .then((entries) => {
        if (active)
          setSessionMap((prev) => ({
            ...prev,
            ...Object.fromEntries(entries),
          }));
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
      const res = await submitInstructor({
        fullName: form.name,
        phone: form.phone,
        birthDate: form.birthDate,
        gender: form.gender,
        address: form.domicile,
        shortBio: form.shortBio,
        license: form.license,
        experience: form.experience,
        schedules: form.schedules,
        profilePictureUrl: form.profilePictureUrl,
        cvUrl: form.cvUrl,
      });
      persistRegistration({
        kind: 'instructor',
        fullName: form.name,
        phone: form.phone,
        birthDate: form.birthDate,
        gender: form.gender,
        address: form.domicile,
        shortBio: form.shortBio,
        license: form.license,
        experience: form.experience,
        schedules: form.schedules,
        profilePictureUrl: form.profilePictureUrl,
        cvUrl: form.cvUrl,
        registrationId: res.registrationId,
        status: res.status,
        submittedAt: Date.now(),
        scheduleLabels: form.scheduleLabels,
      });
      router.push('/profile?sukses=1');
    } catch (err) {
      form.setErrorMsg(toErrorMessage(err));
      form.setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-2xl mx-auto">
        <Card variant="form" className="p-6 sm:p-10 shadow-sm">
          <StepIndicator step={form.step} errorMsg={form.errorMsg} />
          {form.step === 1 && (
            <StepBiodataGuru
              name={form.name}
              setName={form.setName}
              birthDate={form.birthDate}
              setBirthDate={form.setBirthDate}
              currentAge={form.currentAge}
              gender={form.gender}
              setGender={form.setGender}
              phone={form.phone}
              setPhone={form.setPhone}
              domicile={form.domicile}
              setDomicile={form.setDomicile}
              photoFileName={form.photoFile?.name ?? ''}
              onPhotoChange={handlePhotoChange}
              isPhotoUploading={isPhotoUploading}
              onSubmit={form.handleNextStep1}
            />
          )}
          {form.step === 2 && (
            <StepKualifikasi
              license={form.license}
              setLicense={form.setLicense}
              experience={form.experience}
              setExperience={form.setExperience}
              shortBio={form.shortBio}
              setShortBio={form.setShortBio}
              cvFileName={form.cvFile?.name ?? ''}
              onCvChange={handleCvChange}
              isCvUploading={isCvUploading}
              onSubmit={form.handleNextStep2}
              onBack={() => form.setStep(1)}
            />
          )}
          {form.step === 3 && (
            <StepKolamJadwal
              areas={areas}
              locations={locations}
              selectedLocationIds={form.selectedLocationIds}
              onToggleLocation={form.handleToggleLocation}
              sessionMap={sessionMap}
              sessionsLoading={pendingIds.length > 0}
              selectedSlots={form.selectedSlots}
              onToggleSlot={form.handleToggleSlot}
              slotCount={form.schedules.length}
              errorMsg={form.errorMsg}
              isSubmitting={form.isSubmitting}
              onSubmit={handleSubmit}
              onBack={() => form.setStep(2)}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

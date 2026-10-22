'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { paymentMethodToApi } from '@/lib/utils';
import { Area, AvailableInstructor, LessonPackage, Location, RegistrationResult, SessionSlot, StudentRegistrationPayload } from '@/types';
import { request, toErrorMessage } from '@/lib/http';
import { Card } from '@/components/ui/Card';
import { StepIndicator } from './StepIndicator';
import { StepBiodata } from './StepBiodata';
import { StepKelasJadwal } from './StepKelasJadwal';
import { StepPembayaran } from './StepPembayaran';
import { useMuridForm } from './useMuridForm';
import { useMuridData } from './useMuridData';
import { buildStudentSnapshot } from './registrationHelper';

async function fetchMaster() {
  const [a, l, p] = await Promise.all([
    request<Area[]>('/areas', { method: 'GET', revalidate: 3600, tag: 'areas' }),
    request<Location[]>('/locations', { method: 'GET', revalidate: 3600, tag: 'locations' }),
    request<LessonPackage[]>('/packages', { method: 'GET', revalidate: 3600, tag: 'packages' }),
  ]);
  return { areas: a.data, locations: l.data, packages: p.data };
}

async function fetchSessions(locationId: string, dayOfWeek: string) {
  const q = new URLSearchParams({ locationId, dayOfWeek });
  const res = await request<SessionSlot[]>(`/sessions?${q}`, { method: 'GET' });
  return res.data;
}

async function fetchInstructors(p: { locationId: string; dayOfWeek: string; sessionName: string; packageType?: 'REGULER' | 'PRIVAT' }) {
  const q = new URLSearchParams({ locationId: p.locationId, dayOfWeek: p.dayOfWeek, sessionName: p.sessionName, ...(p.packageType ? { packageType: p.packageType } : {}) });
  const res = await request<AvailableInstructor[]>(`/instructor/available?${q}`, { method: 'GET' });
  return res.data;
}

async function uploadStudentPhoto(file: File) {
  const form = new FormData();
  form.append('profilePicture', file);
  const res = await request<{ profilePictureUrl?: string }>('/upload-file/student/profil', { method: 'POST', body: form });
  const url = res.data?.profilePictureUrl ?? '';
  return { url, urlReported: Boolean(url) };
}

async function uploadPaymentProof(file: File) {
  const form = new FormData();
  form.append('profilePicture', file);
  const res = await request<{ profilePictureUrl?: string }>('/upload-file/student/payment', { method: 'POST', body: form });
  const url = res.data?.profilePictureUrl ?? '';
  return { url, urlReported: Boolean(url) };
}

async function submitStudent(payload: StudentRegistrationPayload) {
  const res = await request<RegistrationResult>('/register/student', { method: 'POST', body: payload });
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
  const handleError = useCallback((msg: string) => form.setErrorMsg(msg), [form]);
  const data = useMuridData({
    locationId: form.locationId, firstMeetDate: form.firstMeetDate, sessionName: form.sessionName,
    packageType: form.selectedPackage?.type === 'Privat' ? 'PRIVAT' : 'REGULER',
    fetchMaster, fetchSessions, fetchInstructors, onError: handleError,
  });

  useEffect(() => { setTempLocs(data.locations); setTempPkgs(data.packages); setTempInsts(data.instructors); }, [data.locations, data.packages, data.instructors]);
  useEffect(() => { if (!authLoading && !user) router.push('/login'); }, [user, authLoading, router]);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');
    if (!form.name || !form.birthPlace || !form.birthDate || !form.address || !form.phone || !form.schoolOrOffice) {
      form.setErrorMsg('Mohon lengkapi seluruh kolom biodata bertanda bintang (*).');
      return;
    }
    form.setStep(2);
  };

  const handleNextStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');
    if (!form.locationId || !form.packageId || !form.firstMeetDate || !form.sessionName || !form.instructorId || !form.photoFile) {
      form.setErrorMsg('Pastikan kolam, paket, tanggal, sesi, guru, dan foto 4x6 sudah dipilih.');
      return;
    }
    form.setIsSubmitting(true);
    try {
      const photo = await uploadStudentPhoto(form.photoFile);
      setPhotoUrl(photo.url);
      form.setStep(3);
    } catch (err) { form.setErrorMsg(toErrorMessage(err)); } finally { form.setIsSubmitting(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');
    if (!form.paymentProofFile) { form.setErrorMsg('Bukti pembayaran wajib diunggah.'); return; }
    form.setIsSubmitting(true);
    try {
      const proof = await uploadPaymentProof(form.paymentProofFile);
      const payload: StudentRegistrationPayload = {
        profilePictureUrl: photoUrl, fullName: form.name, birthPlace: form.birthPlace, birthDate: form.birthDate,
        gender: form.gender, address: form.address, phone: form.phone, email: form.userEmail,
        schoolOrOffice: form.schoolOrOffice, tshirtSize: form.shirtSize, locationId: form.locationId,
        packageId: form.packageId, firstMeetDate: form.firstMeetDate, firstMeetSession: form.sessionName,
        instructorId: form.instructorId, paymentMethod: paymentMethodToApi(form.paymentMethod), paymentProofUrl: proof.url,
      };
      const res = await submitStudent(payload);
      persistRegistration(buildStudentSnapshot({
        payload, result: res, locationLabel: form.selectedLocation?.name ?? '', packageType: form.selectedPackage?.type ?? '',
        packagePrice: form.grandTotal, instructorName: form.selectedInstructor?.fullName ?? '', photoFileName: form.photoFile?.name, proofUrlReported: proof.urlReported,
      }));
      router.push('/profile');
    } catch (err) { form.setErrorMsg(toErrorMessage(err)); } finally { form.setIsSubmitting(false); }
  };

  if (authLoading || !user) return <div className="min-h-[70vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/40 via-white to-[#F8F9FA]">
      <div className="max-w-2xl mx-auto">
        <Card variant="form" className="p-6 sm:p-8">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E0FBFC] text-[#0077B6] mb-3"><span>🏊</span> Pendaftaran Murid Baru</div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6]">Formulir Pendaftaran Murid</h1>
            <p className="mt-1 text-sm text-slate-500">Data kolam, paket, sesi, dan guru diambil langsung dari server PT Tirya Lumba.</p>
          </div>
          <StepIndicator step={form.step} errorMsg={form.errorMsg} />
          <div key={form.step} className="mt-8 animate-fade-in-up">
            {form.step === 1 && <StepBiodata name={form.name} setName={form.setName} birthPlace={form.birthPlace} setBirthPlace={form.setBirthPlace} birthDate={form.birthDate} setBirthDate={form.setBirthDate} currentAge={form.currentAge} gender={form.gender} setGender={form.setGender} address={form.address} setAddress={form.setAddress} phone={form.phone} setPhone={form.setPhone} email={form.userEmail} schoolOrOffice={form.schoolOrOffice} setSchoolOrOffice={form.setSchoolOrOffice} shirtSize={form.shirtSize} setShirtSize={form.setShirtSize} onSubmit={handleNextStep1} />}
            {form.step === 2 && <StepKelasJadwal areas={data.areas} areaId={form.areaId} setAreaId={form.setAreaId} areaLocations={form.areaLocations} locationId={form.locationId} onSelectLocation={form.onSelectLocation} locationPackages={form.locationPackages} packageId={form.packageId} setPackageId={form.setPackageId} firstMeetDate={form.firstMeetDate} setFirstMeetDate={form.setFirstMeetDate} sessions={data.sessions} sessionLoading={data.sessionLoading} sessionName={form.sessionName} setSessionName={form.setSessionName} instructors={data.instructors} instructorLoading={data.instructorLoading} instructorId={form.instructorId} setInstructorId={form.setInstructorId} photoFileName={form.photoFile?.name ?? ''} onPhotoChange={form.setPhotoFile} isLoadingData={data.isLoadingData} errorMsg={form.errorMsg} onSubmit={handleNextStep2} onBack={() => form.setStep(1)} />}
            {form.step === 3 && <StepPembayaran name={form.name} locationName={form.selectedLocation?.name ?? '-'} packageType={form.selectedPackage?.type ?? '-'} instructorName={form.selectedInstructor?.fullName ?? '-'} firstMeetDate={form.firstMeetDate} sessionName={form.sessionName} packagePrice={form.coursePrice} paymentMethod={form.paymentMethod} setPaymentMethod={form.setPaymentMethod} paymentProofName={form.paymentProofFile?.name ?? ''} onPaymentProofChange={form.setPaymentProofFile} isSubmitting={form.isSubmitting} errorMsg={form.errorMsg} onSubmit={handleSubmit} onBack={() => form.setStep(2)} />}
          </div>
        </Card>
      </div>
    </div>
  );
}

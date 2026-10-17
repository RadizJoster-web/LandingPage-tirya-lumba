'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { paymentMethodToApi } from '@/lib/utils';
import { registerStudent, toErrorMessage, uploadPaymentProof, uploadStudentPhoto } from '@/services/api';
import { Card } from '@/components/ui/Card';
import { StepIndicator } from './StepIndicator';
import { StepBiodata } from './StepBiodata';
import { StepKelasJadwal } from './StepKelasJadwal';
import { StepPembayaran } from './StepPembayaran';
import { useMuridForm } from './useMuridForm';

export default function DaftarMuridParent() {
  const router = useRouter();
  const { user, isLoading: authLoading, persistRegistration } = useAuth();
  const form = useMuridForm(user?.email ?? '');

  // URL berkas hasil unggah; disimpan terpisah dari data form karena berasal dari server.
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');
    if (
      !form.name ||
      !form.birthPlace ||
      !form.birthDate ||
      !form.address ||
      !form.phone ||
      !form.schoolOrOffice
    ) {
      form.setErrorMsg('Mohon lengkapi seluruh kolom biodata bertanda bintang (*).');
      return;
    }
    form.setStep(2);
  };

  /** Step 2 → unggah foto 4x6 lebih dulu supaya URL-nya ikut dikirim saat submit. */
  const handleNextStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setErrorMsg('');

    if (!form.locationId || !form.packageId) {
      form.setErrorMsg('Pilih kolam renang dan paket les terlebih dahulu.');
      return;
    }
    if (!form.firstMeetDate || !form.sessionName) {
      form.setErrorMsg('Tentukan tanggal dan sesi pertemuan pertama.');
      return;
    }
    if (!form.instructorId) {
      form.setErrorMsg('Pilih guru / pelatih renang yang tersedia.');
      return;
    }
    if (!form.photoFile) {
      form.setErrorMsg('Foto 4x6 murid wajib diunggah.');
      return;
    }

    form.setIsSubmitting(true);
    try {
      const photo = await uploadStudentPhoto(form.photoFile);
      setPhotoUrl(photo.url);
      if (!photo.urlReported) {
        form.setErrorMsg(
          'Foto terunggah, tetapi server tidak mengembalikan URL foto. Lanjutkan dan kirim ulang foto via WhatsApp CS saat verifikasi.',
        );
      }
      form.setStep(3);
    } catch (error) {
      form.setErrorMsg(toErrorMessage(error));
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

      const result = await registerStudent({
        profilePictureUrl: photoUrl,
        fullName: form.name,
        birthPlace: form.birthPlace,
        birthDate: form.birthDate,
        gender: form.gender,
        address: form.address,
        phone: form.phone,
        email: form.userEmail,
        schoolOrOffice: form.schoolOrOffice,
        tshirtSize: form.shirtSize,
        locationId: form.locationId,
        packageId: form.packageId,
        firstMeetDate: form.firstMeetDate,
        firstMeetSession: form.sessionName,
        instructorId: form.instructorId,
        paymentMethod: paymentMethodToApi(form.paymentMethod),
        paymentProofUrl: proof.url,
      });

      persistRegistration({
        kind: 'student',
        profilePictureUrl: photoUrl,
        fullName: form.name,
        birthPlace: form.birthPlace,
        birthDate: form.birthDate,
        gender: form.gender,
        address: form.address,
        phone: form.phone,
        email: form.userEmail,
        schoolOrOffice: form.schoolOrOffice,
        tshirtSize: form.shirtSize,
        locationId: form.locationId,
        packageId: form.packageId,
        firstMeetDate: form.firstMeetDate,
        firstMeetSession: form.sessionName,
        instructorId: form.instructorId,
        paymentMethod: paymentMethodToApi(form.paymentMethod),
        paymentProofUrl: proof.url,
        registrationId: result.registrationId,
        status: result.status,
        submittedAt: Date.now(),
        locationLabel: form.selectedLocation?.name ?? '',
        packageType: form.selectedPackage?.type ?? '',
        packagePrice: form.grandTotal,
        instructorName: form.selectedInstructor?.fullName ?? '',
        photoFileName: form.photoFile?.name,
        uploadNotice:
          !proof.urlReported || !photoUrl
            ? 'Beberapa berkas tidak mengembalikan URL dari server. Kirim berkas pendaftaran via WhatsApp CS agar admin dapat memverifikasi.'
            : undefined,
      });

      router.push('/profile');
    } catch (error) {
      form.setErrorMsg(toErrorMessage(error));
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
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/40 via-white to-[#F8F9FA]">
      <div className="max-w-2xl mx-auto">
        <Card variant="landing" className="p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E0FBFC] text-[#0077B6] mb-3">
              <span>🏊</span> Pendaftaran Murid Baru
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6]">
              Formulir Pendaftaran Murid
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Data kolam, paket, sesi, dan guru diambil langsung dari server PT Tirya Lumba.
            </p>
          </div>

          <StepIndicator step={form.step} errorMsg={form.errorMsg} />

          <div className="mt-8 animate-fade-in-up">
            {form.step === 1 && (
              <StepBiodata
                name={form.name}
                setName={form.setName}
                birthPlace={form.birthPlace}
                setBirthPlace={form.setBirthPlace}
                birthDate={form.birthDate}
                setBirthDate={form.setBirthDate}
                currentAge={form.currentAge}
                gender={form.gender}
                setGender={form.setGender}
                address={form.address}
                setAddress={form.setAddress}
                phone={form.phone}
                setPhone={form.setPhone}
                email={form.userEmail}
                schoolOrOffice={form.schoolOrOffice}
                setSchoolOrOffice={form.setSchoolOrOffice}
                shirtSize={form.shirtSize}
                setShirtSize={form.setShirtSize}
                onSubmit={handleNextStep1}
              />
            )}

            {form.step === 2 && (
              <StepKelasJadwal
                areas={form.areas}
                areaId={form.areaId}
                setAreaId={form.setAreaId}
                areaLocations={form.areaLocations}
                locationId={form.locationId}
                onSelectLocation={form.setLocationId}
                locationPackages={form.locationPackages}
                packageId={form.packageId}
                setPackageId={form.setPackageId}
                firstMeetDate={form.firstMeetDate}
                setFirstMeetDate={form.setFirstMeetDate}
                sessions={form.sessions}
                sessionLoading={form.sessionLoading}
                sessionName={form.sessionName}
                setSessionName={form.setSessionName}
                instructors={form.instructors}
                instructorLoading={form.instructorLoading}
                instructorId={form.instructorId}
                setInstructorId={form.setInstructorId}
                photoFileName={form.photoFile?.name ?? ''}
                onPhotoChange={form.setPhotoFile}
                isLoadingData={form.isLoadingData}
                errorMsg={form.errorMsg}
                onSubmit={handleNextStep2}
                onBack={() => form.setStep(1)}
              />
            )}

            {form.step === 3 && (
              <StepPembayaran
                name={form.name}
                locationName={form.selectedLocation?.name ?? ''}
                packageType={form.selectedPackage?.type ?? ''}
                instructorName={form.selectedInstructor?.fullName ?? ''}
                firstMeetDate={form.firstMeetDate}
                sessionName={form.sessionName}
                packagePrice={form.grandTotal}
                paymentMethod={form.paymentMethod}
                setPaymentMethod={form.setPaymentMethod}
                paymentProofName={form.paymentProofFile?.name ?? ''}
                onPaymentProofChange={form.setPaymentProofFile}
                isSubmitting={form.isSubmitting}
                errorMsg={form.errorMsg}
                onSubmit={handleSubmit}
                onBack={() => form.setStep(2)}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

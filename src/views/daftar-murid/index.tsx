'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { StudentRegistration } from '@/types';
import { Card } from '@/components/ui/Card';
import { StepIndicator } from './StepIndicator';
import { StepBiodata } from './StepBiodata';
import { StepKelasJadwal } from './StepKelasJadwal';
import { StepPembayaran } from './StepPembayaran';
import { useMuridForm } from './useMuridForm';

export default function DaftarMuridParent() {
  const router = useRouter();
  const { user, saveStudentRegistration, isLoading: authLoading } = useAuth();
  const form = useMuridForm();

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.birthPlace || !form.birthDate || !form.address || !form.phone || !form.schoolOrOffice) {
      form.setErrorMsg('Mohon lengkapi seluruh kolom bertanda bintang (*)');
      return;
    }
    form.setErrorMsg('');
    form.setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.startDate || !form.startTime || !form.coachName || form.photoFiles.length === 0) {
      form.setErrorMsg('Mohon lengkapi tanggal, jam, pelatih, dan minimal 1 foto 4x6.');
      return;
    }
    form.setErrorMsg('');
    form.setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (files.length > 5 || files.some((f) => f.size > 100 * 1024 * 1024)) {
      form.setErrorMsg('Maksimal 5 berkas foto, ukuran per berkas maksimal 100MB.');
      return;
    }
    form.setErrorMsg('');
    form.setPhotoFiles(files);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.paymentProofFile) {
      form.setErrorMsg('Mohon unggah bukti pembayaran transfer/QRIS atau foto serah terima tunai.');
      return;
    }
    form.setIsSubmitting(true);
    try {
      const studentData: StudentRegistration = {
        name: form.name, birthPlace: form.birthPlace, birthDate: form.birthDate,
        age: form.currentAge, gender: form.gender, address: form.address, phone: form.phone,
        email: user?.email || '', schoolOrOffice: form.schoolOrOffice, shirtSize: form.shirtSize,
        poolId: form.poolId, classType: form.classType, startDate: form.startDate,
        startTime: form.startTime, coachName: form.coachName, photoNames: form.photoFiles.map((f) => f.name),
        paymentMethod: form.paymentMethod, paymentProofUrl: form.paymentProofFile.name,
        totalPrice: form.grandTotal, status: 'approved', completedSessions: 0, totalSessions: 8, registeredAt: Date.now(),
      };
      saveStudentRegistration(studentData);
      router.push('/profile');
    } catch {
      form.setErrorMsg('Terjadi kesalahan saat memproses formulir.');
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
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/30 to-[#F8F9FA]">
      <div className="max-w-3xl mx-auto">
        <Card variant="landing" className="p-6 sm:p-10 shadow-xl">
          <div className="mb-8">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6] mb-2">
              Pendaftaran Murid Baru
            </h1>
            <p className="text-sm text-slate-500">Lengkapi 3 langkah mudah untuk memulai kursus renang Anda</p>
            <StepIndicator step={form.step} errorMsg={form.errorMsg} />
          </div>

          {form.step === 1 && (
            <StepBiodata
              name={form.name} setName={form.setName} birthPlace={form.birthPlace} setBirthPlace={form.setBirthPlace}
              birthDate={form.birthDate} setBirthDate={form.setBirthDate} currentAge={form.currentAge}
              gender={form.gender} setGender={form.setGender} address={form.address} setAddress={form.setAddress}
              phone={form.phone} setPhone={form.setPhone} email={user.email} schoolOrOffice={form.schoolOrOffice}
              setSchoolOrOffice={form.setSchoolOrOffice} shirtSize={form.shirtSize} setShirtSize={form.setShirtSize}
              onSubmit={handleNextStep1}
            />
          )}

          {form.step === 2 && (
            <StepKelasJadwal
              poolId={form.poolId} setPoolId={form.setPoolId} classType={form.classType} setClassType={form.setClassType}
              startDate={form.startDate} setStartDate={form.setStartDate} startTime={form.startTime} setStartTime={form.setStartTime}
              coachName={form.coachName} setCoachName={form.setCoachName} availableCoaches={form.availableCoaches}
              photoFiles={form.photoFiles} handleFileChange={handleFileChange} onSubmit={handleNextStep2}
              onBack={() => form.setStep(1)}
            />
          )}

          {form.step === 3 && (
            <StepPembayaran
              name={form.name} selectedPool={form.selectedPool} coachName={form.coachName} classType={form.classType}
              coursePrice={form.coursePrice} adminFee={form.adminFee} grandTotal={form.grandTotal}
              paymentMethod={form.paymentMethod} setPaymentMethod={form.setPaymentMethod}
              paymentProofFile={form.paymentProofFile} setPaymentProofFile={form.setPaymentProofFile}
              isSubmitting={form.isSubmitting} onSubmit={handleSubmitBooking} onBack={() => form.setStep(2)}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { calculateAge } from '@/lib/utils';
import { CoachRegistration } from '@/types';
import { Card } from '@/components/ui/Card';
import { StepIndicator } from '@/pages/daftar-murid/StepIndicator';
import { StepBiodataGuru } from './StepBiodataGuru';
import { StepKualifikasi } from './StepKualifikasi';
import { StepKolamJadwal } from './StepKolamJadwal';

export default function DaftarGuruParent() {
  const router = useRouter();
  const { user, saveCoachRegistration, isLoading: authLoading } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMsg, setErrorMsg] = useState('');

  // Step 1 State
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [phone, setPhone] = useState('');
  const [domicile, setDomicile] = useState('');

  // Step 2 State
  const [license, setLicense] = useState('');
  const [teachingExperience, setTeachingExperience] = useState('');
  const [cvFileName, setCvFileName] = useState('');

  // Step 3 State
  const [selectedPoolIds, setSelectedPoolIds] = useState<number[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const currentAge = calculateAge(birthDate);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate || !phone || !domicile) {
      setErrorMsg('Mohon lengkapi seluruh kolom formulir.');
      return;
    }
    setErrorMsg('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!license || !teachingExperience) {
      setErrorMsg('Mohon cantumkan lisensi dan pengalaman mengajar Anda.');
      return;
    }
    setErrorMsg('');
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePoolSelection = (id: number) => {
    setSelectedPoolIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleSlot = (dayIdx: number, sessionIdx: number) => {
    const key = `${dayIdx}|${sessionIdx}`;
    setAvailableSlots((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const handleSubmitCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPoolIds.length === 0 || availableSlots.length === 0) {
      setErrorMsg('Pilih minimal 1 kolam dan 1 sesi waktu ketersediaan mengajar.');
      return;
    }

    setIsSubmitting(true);
    try {
      const coachData: CoachRegistration = {
        name, birthDate, age: currentAge, gender, phone, domicile, license,
        teachingExperience, cvFileName: cvFileName || 'CV_Pelatih.pdf',
        selectedPoolIds, availableSlots, status: 'approved', rescheduleRequests: [],
        registeredAt: Date.now(),
      };
      saveCoachRegistration(coachData);
      router.push('/profile');
    } catch {
      setErrorMsg('Terjadi kesalahan saat memproses pendaftaran.');
    } finally {
      setIsSubmitting(false);
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
              Pendaftaran Pelatih / Guru
            </h1>
            <p className="text-sm text-slate-500">
              Bergabung bersama keluarga besar pelatih profesional PT Tirya Lumba
            </p>
            <StepIndicator
              step={step}
              labels={['Biodata', 'Kualifikasi', 'Kolam & Jadwal']}
              errorMsg={errorMsg}
            />
          </div>

          {step === 1 && (
            <StepBiodataGuru
              name={name} setName={setName} birthDate={birthDate} setBirthDate={setBirthDate}
              currentAge={currentAge} gender={gender} setGender={setGender} phone={phone}
              setPhone={setPhone} domicile={domicile} setDomicile={setDomicile} onSubmit={handleNextStep1}
            />
          )}

          {step === 2 && (
            <StepKualifikasi
              license={license} setLicense={setLicense} teachingExperience={teachingExperience}
              setTeachingExperience={setTeachingExperience} cvFileName={cvFileName}
              setCvFileName={setCvFileName} onSubmit={handleNextStep2} onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepKolamJadwal
              selectedPoolIds={selectedPoolIds} togglePoolSelection={togglePoolSelection}
              availableSlots={availableSlots} toggleSlot={toggleSlot} isSubmitting={isSubmitting}
              onSubmit={handleSubmitCoach} onBack={() => setStep(2)}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

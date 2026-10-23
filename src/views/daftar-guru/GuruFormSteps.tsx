import React from 'react';
import { Area, Location, SessionSlot } from '@/types';
import { StepBiodataGuru } from './StepBiodataGuru';
import { StepKualifikasi } from './StepKualifikasi';
import { StepKolamJadwal } from './StepKolamJadwal';
import { useGuruForm } from './useGuruForm';

interface GuruFormStepsProps {
  form: ReturnType<typeof useGuruForm>;
  areas: Area[];
  locations: Location[];
  sessionMap: Record<string, SessionSlot[]>;
  sessionsLoading: boolean;
  isPhotoUploading: boolean;
  isCvUploading: boolean;
  onPhotoChange: (file: File | null) => void;
  onCvChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const GuruFormSteps: React.FC<GuruFormStepsProps> = ({
  form,
  areas,
  locations,
  sessionMap,
  sessionsLoading,
  isPhotoUploading,
  isCvUploading,
  onPhotoChange,
  onCvChange,
  onSubmit,
}) => {
  return (
    <>
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
          onPhotoChange={onPhotoChange}
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
          onCvChange={onCvChange}
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
          sessionsLoading={sessionsLoading}
          selectedSlots={form.selectedSlots}
          onToggleSlot={form.handleToggleSlot}
          slotCount={form.schedules.length}
          errorMsg={form.errorMsg}
          isSubmitting={form.isSubmitting}
          onSubmit={onSubmit}
          onBack={() => form.setStep(2)}
        />
      )}
    </>
  );
};

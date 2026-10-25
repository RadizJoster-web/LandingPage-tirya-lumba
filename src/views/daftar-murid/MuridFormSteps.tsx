import React from 'react';
import { Area, AvailableInstructor, SessionSlot } from '@/types';
import { StepBiodata } from './StepBiodata';
import { StepKelasJadwal } from './StepKelasJadwal';
import { StepPembayaran } from './StepPembayaran';
import { useMuridForm } from './useMuridForm';

interface MuridFormStepsProps {
  form: ReturnType<typeof useMuridForm>;
  areas: Area[];
  sessions: SessionSlot[];
  sessionLoading: boolean;
  instructors: AvailableInstructor[];
  instructorLoading: boolean;
  isLoadingData: boolean;
  onNextStep2: (e: React.FormEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const MuridFormSteps: React.FC<MuridFormStepsProps> = ({
  form,
  areas,
  sessions,
  sessionLoading,
  instructors,
  instructorLoading,
  isLoadingData,
  onNextStep2,
  onSubmit,
}) => {
  return (
    <div key={form.step} className="mt-8 animate-fade-in-up">
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
          onSubmit={form.handleNextStep1}
        />
      )}
      {form.step === 2 && (
        <StepKelasJadwal
          areas={areas}
          areaId={form.areaId}
          setAreaId={form.onSelectArea}
          areaLocations={form.areaLocations}
          locationId={form.locationId}
          onSelectLocation={form.onSelectLocation}
          locationPackages={form.locationPackages}
          packageId={form.packageId}
          setPackageId={form.setPackageId}
          firstMeetDate={form.firstMeetDate}
          setFirstMeetDate={form.setFirstMeetDate}
          sessions={sessions}
          sessionLoading={sessionLoading}
          sessionName={form.sessionName}
          setSessionName={form.setSessionName}
          instructors={instructors}
          instructorLoading={instructorLoading}
          instructorId={form.instructorId}
          setInstructorId={form.setInstructorId}
          photoFileName={form.photoFile?.name ?? ''}
          onPhotoChange={form.setPhotoFile}
          isLoadingData={isLoadingData}
          errorMsg={form.errorMsg}
          onSubmit={onNextStep2}
          onBack={() => form.setStep(1)}
        />
      )}
      {form.step === 3 && (
        <StepPembayaran
          name={form.name}
          locationName={form.selectedLocation?.name ?? '-'}
          packageType={form.selectedPackage?.type ?? '-'}
          instructorName={form.selectedInstructor?.fullName ?? '-'}
          firstMeetDate={form.firstMeetDate}
          sessionName={form.sessionName}
          packagePrice={form.coursePrice}
          paymentMethod={form.paymentMethod}
          setPaymentMethod={form.setPaymentMethod}
          paymentProofName={form.paymentProofFile?.name ?? ''}
          onPaymentProofChange={form.setPaymentProofFile}
          isSubmitting={form.isSubmitting}
          errorMsg={form.errorMsg}
          onSubmit={onSubmit}
          onBack={() => form.setStep(2)}
        />
      )}
    </div>
  );
};

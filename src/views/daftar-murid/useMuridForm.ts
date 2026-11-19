import { useEffect, useMemo, useState } from 'react';
import { AuthUser, StudentRegistrationSnapshot } from '@/types';
import { calculateAge } from '@/lib/utils';
import { useMuridData } from './useMuridData';
import { useBiodataState } from './lib/useBiodataState';
import { useClassSelectionState } from './lib/useClassSelectionState';
import { saveDraft, loadDraft, clearDraft } from '@/lib/draftStorage';

export const MURID_DRAFT_KEY = 'tl_draft_murid';

export function useMuridForm(
  userEmail: string,
  initialSnapshot?: StudentRegistrationSnapshot | null,
  currentUser?: AuthUser | null,
) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bio = useBiodataState(initialSnapshot, currentUser);
  const sel = useClassSelectionState(setErrorMsg);

  // Restore draft on mount
  useEffect(() => {
    const d = loadDraft<any>(MURID_DRAFT_KEY);
    if (!d) return;
    if (d.step) setStep(d.step);
    if (d.name) bio.setName(d.name);
    if (d.birthPlace) bio.setBirthPlace(d.birthPlace);
    if (d.birthDate) bio.setBirthDate(d.birthDate);
    if (d.gender) bio.setGender(d.gender);
    if (d.address) bio.setAddress(d.address);
    if (d.phone) bio.setPhone(d.phone);
    if (d.schoolOrOffice) bio.setSchoolOrOffice(d.schoolOrOffice);
    if (d.shirtSize) bio.setShirtSize(d.shirtSize);
    if (d.areaId) sel.setAreaId(d.areaId);
    if (d.locationId) sel.setLocationId(d.locationId);
    if (d.packageId) sel.setPackageId(d.packageId);
    if (d.firstMeetDate) sel.setFirstMeetDate(d.firstMeetDate);
    if (d.sessionName) sel.setSessionName(d.sessionName);
    if (d.instructorId) sel.setInstructorId(d.instructorId);
    if (d.paymentMethod) sel.setPaymentMethod(d.paymentMethod);
  }, []);

  const persistDraft = (nextStep?: 1 | 2 | 3, extra?: Record<string, unknown>) => {
    saveDraft(MURID_DRAFT_KEY, {
      step: nextStep ?? step,
      name: bio.name,
      birthPlace: bio.birthPlace,
      birthDate: bio.birthDate,
      gender: bio.gender,
      address: bio.address,
      phone: bio.phone,
      schoolOrOffice: bio.schoolOrOffice,
      shirtSize: bio.shirtSize,
      areaId: sel.areaId,
      locationId: sel.locationId,
      packageId: sel.packageId,
      firstMeetDate: sel.firstMeetDate,
      sessionName: sel.sessionName,
      instructorId: sel.instructorId,
      paymentMethod: sel.paymentMethod,
      ...extra,
    });
  };

  const data = useMuridData({
    locationId: sel.locationId,
    firstMeetDate: sel.firstMeetDate,
    sessionName: sel.sessionName,
    packageId: sel.packageId,
    onError: setErrorMsg,
  });

  useEffect(() => {
    if (sel.locationId && !sel.areaId && data.locations.length > 0) {
      const matchedLoc = data.locations.find((l) => l.id === sel.locationId);
      if (matchedLoc?.areaId) sel.setAreaId(matchedLoc.areaId);
    }
  }, [sel.locationId, sel.areaId, data.locations, sel]);

  const currentAge = useMemo(() => calculateAge(bio.birthDate), [bio.birthDate]);

  const areaLocations = useMemo(
    () => data.locations.filter((loc) => !sel.areaId || loc.areaId === sel.areaId),
    [data.locations, sel.areaId],
  );

  const locationPackages = useMemo(
    () => data.packages.filter((pkg) => (pkg.locationId ?? pkg.location?.id) === sel.locationId),
    [data.packages, sel.locationId],
  );

  const selectedLocation = useMemo(
    () => data.locations.find((l) => l.id === sel.locationId),
    [data.locations, sel.locationId],
  );

  const selectedPackage = useMemo(
    () => data.packages.find((p) => p.id === sel.packageId),
    [data.packages, sel.packageId],
  );

  const selectedInstructor = useMemo(
    () => data.instructors.find((i) => i.instructorId === sel.instructorId),
    [data.instructors, sel.instructorId],
  );

  const coursePrice = selectedPackage?.price ?? selectedLocation?.regularPrice ?? 0;
  const adminFee = coursePrice > 0 ? 5000 : 0;
  const grandTotal = coursePrice + adminFee;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!bio.name || !bio.birthPlace || !bio.birthDate || !bio.address || !bio.phone || !bio.schoolOrOffice) {
      setErrorMsg('Mohon lengkapi seluruh kolom biodata bertanda bintang (*).');
      return;
    }
    persistDraft(2);
    setStep(2);
  };

  return {
    step, setStep, errorMsg, setErrorMsg, isSubmitting, setIsSubmitting,
    userEmail, ...bio, currentAge, handleNextStep1, ...sel,
    areas: data.areas, locations: data.locations, packages: data.packages,
    isLoadingData: data.isLoadingData, sessions: data.sessions,
    sessionLoading: data.sessionLoading, instructors: data.instructors,
    instructorLoading: data.instructorLoading, areaLocations, locationPackages,
    selectedLocation, selectedPackage, selectedInstructor, coursePrice,
    adminFee, grandTotal, persistDraft,
    clearDraft: () => clearDraft(MURID_DRAFT_KEY),
  };
}

export type UseMuridFormReturn = ReturnType<typeof useMuridForm>;

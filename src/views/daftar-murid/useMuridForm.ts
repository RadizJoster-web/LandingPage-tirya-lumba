import { useMemo, useState } from 'react';
import { AvailableInstructor, LessonPackage, Location, PaymentMethod, ShirtSize } from '@/types';
import { calculateAge } from '@/lib/utils';

export function useMuridForm(
  userEmail: string,
  locations: Location[],
  packages: LessonPackage[],
  instructors: AvailableInstructor[],
) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1
  const [name, setName] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Laki-Laki' | 'Perempuan'>('Laki-Laki');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolOrOffice, setSchoolOrOffice] = useState('');
  const [shirtSize, setShirtSize] = useState<ShirtSize>('M');

  // Step 2
  const [areaId, setAreaId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [firstMeetDate, setFirstMeetDate] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Step 3
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('QRIS');
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);

  const currentAge = useMemo(() => calculateAge(birthDate), [birthDate]);
  const areaLocations = useMemo(() => locations.filter((loc) => !areaId || loc.areaId === areaId), [locations, areaId]);
  const locationPackages = useMemo(() => packages.filter((pkg) => (pkg.locationId ?? pkg.location?.id) === locationId), [packages, locationId]);

  const selectedLocation = useMemo(() => locations.find((l) => l.id === locationId), [locations, locationId]);
  const selectedPackage = useMemo(() => packages.find((p) => p.id === packageId), [packages, packageId]);
  const selectedInstructor = useMemo(() => instructors.find((i) => i.instructorId === instructorId), [instructors, instructorId]);

  const coursePrice = selectedPackage?.price ?? selectedLocation?.regularPrice ?? 0;
  const adminFee = coursePrice > 0 ? 5000 : 0;
  const grandTotal = coursePrice + adminFee;

  const onSelectLocation = (id: string) => {
    setLocationId(id);
    setPackageId('');
    setSessionName('');
    setInstructorId('');
  };

  return {
    step, setStep, errorMsg, setErrorMsg, isSubmitting, setIsSubmitting, userEmail,
    name, setName, birthPlace, setBirthPlace, birthDate, setBirthDate, currentAge,
    gender, setGender, address, setAddress, phone, setPhone, schoolOrOffice, setSchoolOrOffice,
    shirtSize, setShirtSize,
    areaId, setAreaId, locationId, onSelectLocation, packageId, setPackageId,
    firstMeetDate, setFirstMeetDate, sessionName, setSessionName,
    instructorId, setInstructorId, photoFile, setPhotoFile,
    paymentMethod, setPaymentMethod, paymentProofFile, setPaymentProofFile,
    areaLocations, locationPackages, selectedLocation, selectedPackage, selectedInstructor,
    coursePrice, adminFee, grandTotal,
  };
}

import { useMemo, useState } from 'react';
import { PaymentMethod, ShirtSize } from '@/types';
import { calculateAge } from '@/lib/utils';
import { useMuridData } from './useMuridData';

export function useMuridForm(userEmail: string) {
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

  // Data fetching hook
  const data = useMuridData({
    locationId,
    firstMeetDate,
    sessionName,
    packageId,
    onError: setErrorMsg,
  });

  const currentAge = useMemo(() => calculateAge(birthDate), [birthDate]);

  const areaLocations = useMemo(
    () => data.locations.filter((loc) => !areaId || loc.areaId === areaId),
    [data.locations, areaId],
  );

  const locationPackages = useMemo(
    () =>
      data.packages.filter(
        (pkg) => (pkg.locationId ?? pkg.location?.id) === locationId,
      ),
    [data.packages, locationId],
  );

  const selectedLocation = useMemo(
    () => data.locations.find((l) => l.id === locationId),
    [data.locations, locationId],
  );

  const selectedPackage = useMemo(
    () => data.packages.find((p) => p.id === packageId),
    [data.packages, packageId],
  );

  const selectedInstructor = useMemo(
    () => data.instructors.find((i) => i.instructorId === instructorId),
    [data.instructors, instructorId],
  );

  const coursePrice =
    selectedPackage?.price ?? selectedLocation?.regularPrice ?? 0;
  const adminFee = coursePrice > 0 ? 5000 : 0;
  const grandTotal = coursePrice + adminFee;

  const onSelectArea = (id: string) => {
    setAreaId(id);
    setLocationId('');
    setPackageId('');
    setSessionName('');
    setInstructorId('');
  };

  const onSelectLocation = (id: string) => {
    setLocationId(id);
    setPackageId('');
    setSessionName('');
    setInstructorId('');
  };

  /** Validasi onChange tanggal pertemuan pertama: jika sebelum hari ini, kosongkan input & tampilkan error */
  const onSelectFirstMeetDate = (val: string) => {
    if (!val) {
      setFirstMeetDate('');
      setSessionName('');
      setInstructorId('');
      return;
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    if (val < todayStr) {
      setErrorMsg('Tanggal rencana pertemuan pertama tidak boleh sebelum hari ini.');
      setFirstMeetDate('');
      setSessionName('');
      setInstructorId('');
      return;
    }

    setErrorMsg('');
    setFirstMeetDate(val);
    setSessionName('');
    setInstructorId('');
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (
      !name ||
      !birthPlace ||
      !birthDate ||
      !address ||
      !phone ||
      !schoolOrOffice
    ) {
      setErrorMsg(
        'Mohon lengkapi seluruh kolom biodata bertanda bintang (*).',
      );
      return;
    }
    setStep(2);
  };

  return {
    // Wizard step & submission
    step,
    setStep,
    errorMsg,
    setErrorMsg,
    isSubmitting,
    setIsSubmitting,
    userEmail,

    // Step 1 values & handlers
    name,
    setName,
    birthPlace,
    setBirthPlace,
    birthDate,
    setBirthDate,
    currentAge,
    gender,
    setGender,
    address,
    setAddress,
    phone,
    setPhone,
    schoolOrOffice,
    setSchoolOrOffice,
    shirtSize,
    setShirtSize,
    handleNextStep1,

    // Step 2 values & handlers
    areaId,
    setAreaId,
    onSelectArea,
    locationId,
    setLocationId,
    onSelectLocation,
    packageId,
    setPackageId,
    firstMeetDate,
    setFirstMeetDate: onSelectFirstMeetDate,
    onSelectFirstMeetDate,
    sessionName,
    setSessionName,
    instructorId,
    setInstructorId,
    photoFile,
    setPhotoFile,

    // Step 3 values & handlers
    paymentMethod,
    setPaymentMethod,
    paymentProofFile,
    setPaymentProofFile,

    // Master & dynamic data
    areas: data.areas,
    locations: data.locations,
    packages: data.packages,
    isLoadingData: data.isLoadingData,
    sessions: data.sessions,
    sessionLoading: data.sessionLoading,
    instructors: data.instructors,
    instructorLoading: data.instructorLoading,

    // Derived values
    areaLocations,
    locationPackages,
    selectedLocation,
    selectedPackage,
    selectedInstructor,
    coursePrice,
    adminFee,
    grandTotal,
  };
}

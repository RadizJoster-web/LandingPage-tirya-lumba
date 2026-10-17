import { useEffect, useMemo, useState } from 'react';
import {
  Area,
  AvailableInstructor,
  LessonPackage,
  Location,
  SessionSlot,
} from '@/types';
import {
  getAllLocations,
  getAreas,
  getAvailableInstructors,
  getPackages,
  getSessions,
  toErrorMessage,
} from '@/services/api';
import { calculateAge, dayNameFromDate } from '@/lib/utils';

/**
 * State form pendaftaran murid. Pilihan yang bergantung pada pilihan lain
 * (paket, sesi, guru) disimpan bersama kunci pilihannya, sehingga otomatis
 * dianggap kosong ketika kolam/tanggal/sesi berubah tanpa perlu efek tambahan.
 */
export function useMuridForm(userEmail: string) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Master data dari API
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [packages, setPackages] = useState<LessonPackage[]>([]);

  // Step 1
  const [name, setName] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Laki-Laki' | 'Perempuan'>('Laki-Laki');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolOrOffice, setSchoolOrOffice] = useState('');
  const [shirtSize, setShirtSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');

  // Step 2 — pilihan kolam, paket, jadwal, guru
  const [areaId, setAreaId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [firstMeetDate, setFirstMeetDate] = useState('');
  const [packagePick, setPackagePick] = useState<{ key: string; id: string } | null>(null);
  const [sessionPick, setSessionPick] = useState<{ key: string; name: string } | null>(null);
  const [instructorPick, setInstructorPick] = useState<{ key: string; id: string } | null>(null);
  const [sessionState, setSessionState] = useState<{ key: string; rows: SessionSlot[] } | null>(null);
  const [instructorState, setInstructorState] = useState<{
    key: string;
    rows: AvailableInstructor[];
  } | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Step 3
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank' | 'Cash'>('QRIS');
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [areaRows, locationRows, packageRows] = await Promise.all([
          getAreas(),
          getAllLocations(),
          getPackages(),
        ]);
        if (!active) return;
        setAreas(areaRows);
        setLocations(locationRows);
        setPackages(packageRows);
      } catch (error) {
        if (active) setErrorMsg(toErrorMessage(error));
      } finally {
        if (active) setIsLoadingData(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const dayOfWeek = dayNameFromDate(firstMeetDate);
  const sessionKey = locationId && dayOfWeek ? `${locationId}|${dayOfWeek}` : '';
  const instructorKey =
    sessionKey && sessionPick && sessionPick.key === sessionKey && packagePick?.key === locationId
      ? `${sessionKey}|${sessionPick.name}|${packagePick.id}`
      : '';

  const sessions = sessionState?.key === sessionKey ? sessionState.rows : [];
  const sessionLoading = Boolean(sessionKey) && sessionState?.key !== sessionKey;
  const sessionName = sessionPick?.key === sessionKey ? sessionPick.name : '';
  const instructors = instructorState?.key === instructorKey ? instructorState.rows : [];
  const instructorLoading = Boolean(instructorKey) && instructorState?.key !== instructorKey;
  const instructorId = instructorPick?.key === instructorKey ? instructorPick.id : '';
  const packageId = packagePick?.key === locationId ? packagePick.id : '';

  const areaLocations = useMemo(
    () => locations.filter((location) => location.areaId === areaId),
    [locations, areaId],
  );

  const locationPackages = useMemo(
    () => packages.filter((item) => item.locationId === locationId),
    [packages, locationId],
  );

  const selectedLocation = locations.find((location) => location.id === locationId);
  const selectedPackage = packages.find((item) => item.id === packageId);
  const selectedInstructor = instructors.find((item) => item.instructorId === instructorId);

  /** Sesi jam tersedia untuk kolam + hari terpilih. */
  useEffect(() => {
    if (!sessionKey) return;
    const [locationKey, day] = sessionKey.split('|');
    let active = true;
    getSessions(locationKey, day)
      .then((rows) => {
        if (active) setSessionState({ key: sessionKey, rows });
      })
      .catch((error) => {
        if (active) {
          setSessionState({ key: sessionKey, rows: [] });
          setErrorMsg(toErrorMessage(error));
        }
      });
    return () => {
      active = false;
    };
  }, [sessionKey]);

  /** Guru difilter server berdasarkan lokasi, hari, sesi, dan kapasitas paket. */
  useEffect(() => {
    if (!instructorKey) return;
    const [locationKey, day, session, packageKey] = instructorKey.split('|');
    const pkg = packages.find((item) => item.id === packageKey);
    let active = true;
    getAvailableInstructors({
      locationId: locationKey,
      dayOfWeek: day,
      sessionName: session,
      packageType: packageTypeOf(pkg?.type ?? ''),
    })
      .then((rows) => {
        if (active) setInstructorState({ key: instructorKey, rows });
      })
      .catch((error) => {
        if (active) {
          setInstructorState({ key: instructorKey, rows: [] });
          setErrorMsg(toErrorMessage(error));
        }
      });
    return () => {
      active = false;
    };
  }, [instructorKey, packages]);

  return {
    step,
    setStep,
    errorMsg,
    setErrorMsg,
    isLoadingData,
    areas,
    areaLocations,
    areaId,
    setAreaId,
    locations,
    name,
    setName,
    birthPlace,
    setBirthPlace,
    birthDate,
    setBirthDate,
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
    currentAge: calculateAge(birthDate),
    userEmail,
    locationId,
    setLocationId,
    locationPackages,
    selectedLocation,
    selectedPackage,
    packageId,
    setPackageId: (id: string) => setPackagePick({ key: locationId, id }),
    firstMeetDate,
    setFirstMeetDate,
    sessions,
    sessionLoading,
    sessionName,
    setSessionName: (name: string) => setSessionPick({ key: sessionKey, name }),
    instructors,
    instructorLoading,
    instructorId,
    setInstructorId: (id: string) => setInstructorPick({ key: instructorKey, id }),
    selectedInstructor,
    photoFile,
    setPhotoFile,
    paymentMethod,
    setPaymentMethod,
    paymentProofFile,
    setPaymentProofFile,
    isSubmitting,
    setIsSubmitting,
    grandTotal: selectedPackage?.price ?? 0,
  };
}

/** API hanya mengenal kapasitas REGULER dan PRIVAT; tipe lain diperlakukan Reguler. */
export function packageTypeOf(type: string): 'REGULER' | 'PRIVAT' {
  return type.toUpperCase() === 'PRIVAT' ? 'PRIVAT' : 'REGULER';
}

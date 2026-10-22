import { useMemo, useState } from 'react';
import { Gender, InstructorScheduleInput, Location } from '@/types';
import { calculateAge } from '@/lib/utils';

export function useGuruForm(locations: Location[]) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender>('Laki-Laki');
  const [phone, setPhone] = useState('');
  const [domicile, setDomicile] = useState('');
  const currentAge = useMemo(() => calculateAge(birthDate), [birthDate]);

  // Step 2
  const [license, setLicense] = useState('');
  const [experience, setExperience] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUrl, setCvUrl] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  // Step 3
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const schedules = useMemo<InstructorScheduleInput[]>(
    () =>
      selectedSlots.map((key) => {
        const [locationId, dayOfWeek, sessionName] = key.split('|');
        return { locationId, dayOfWeek, sessionName };
      }),
    [selectedSlots],
  );

  const scheduleLabels = useMemo(
    () =>
      schedules.map((schedule) => {
        const loc = locations.find((item) => item.id === schedule.locationId);
        return `${loc?.name ?? 'Kolam'} — ${schedule.dayOfWeek}, ${schedule.sessionName}`;
      }),
    [schedules, locations],
  );

  const handleToggleLocation = (id: string) => {
    setErrorMsg('');
    setSelectedLocationIds((prev) => {
      if (prev.includes(id)) {
        setSelectedSlots((slots) =>
          slots.filter((key) => !key.startsWith(`${id}|`)),
        );
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleToggleSlot = (key: string) => {
    setSelectedSlots((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name || !birthDate || !phone || !domicile) {
      setErrorMsg('Mohon lengkapi seluruh kolom biodata bertanda bintang (*).');
      return;
    }
    if (!profilePictureUrl) {
      setErrorMsg('Foto profil wajib diunggah sebelum melanjutkan.');
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!license || !experience || !shortBio) {
      setErrorMsg('Mohon lengkapi data kualifikasi Anda.');
      return;
    }
    if (!cvFile || !cvUrl) {
      setErrorMsg('Berkas CV (PDF) wajib diunggah sebelum melanjutkan.');
      return;
    }
    setStep(3);
  };

  return {
    step,
    setStep,
    errorMsg,
    setErrorMsg,
    isSubmitting,
    setIsSubmitting,
    name,
    setName,
    birthDate,
    setBirthDate,
    currentAge,
    gender,
    setGender,
    phone,
    setPhone,
    domicile,
    setDomicile,
    license,
    setLicense,
    experience,
    setExperience,
    shortBio,
    setShortBio,
    cvFile,
    setCvFile,
    cvUrl,
    setCvUrl,
    photoFile,
    setPhotoFile,
    profilePictureUrl,
    setProfilePictureUrl,
    selectedLocationIds,
    selectedSlots,
    schedules,
    scheduleLabels,
    handleToggleLocation,
    handleToggleSlot,
    handleNextStep1,
    handleNextStep2,
  };
}

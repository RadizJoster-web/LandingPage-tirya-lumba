import { useEffect, useMemo, useState } from 'react';
import { Gender, InstructorScheduleInput, Location } from '@/types';
import { calculateAge } from '@/lib/utils';
import { saveDraft, loadDraft, clearDraft } from '@/lib/draftStorage';

const DRAFT_KEY = 'tl_draft_guru';

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

  // Pulihkan draf saat halaman dimuat / direfresh
  useEffect(() => {
    const d = loadDraft<any>(DRAFT_KEY);
    if (!d) return;
    if (d.step) setStep(d.step);
    if (d.name) setName(d.name);
    if (d.birthDate) setBirthDate(d.birthDate);
    if (d.gender) setGender(d.gender);
    if (d.phone) setPhone(d.phone);
    if (d.domicile) setDomicile(d.domicile);
    if (d.license) setLicense(d.license);
    if (d.experience) setExperience(d.experience);
    if (d.shortBio) setShortBio(d.shortBio);
    if (d.cvUrl) setCvUrl(d.cvUrl);
    if (d.profilePictureUrl) setProfilePictureUrl(d.profilePictureUrl);
    if (Array.isArray(d.selectedLocationIds)) setSelectedLocationIds(d.selectedLocationIds);
    if (Array.isArray(d.selectedSlots)) setSelectedSlots(d.selectedSlots);
  }, []);

  const persistCurrentDraft = (nextStep: 1 | 2 | 3) => {
    saveDraft(DRAFT_KEY, {
      step: nextStep,
      name, birthDate, gender, phone, domicile,
      license, experience, shortBio, cvUrl, profilePictureUrl,
      selectedLocationIds, selectedSlots,
    });
  };

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
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      if (prev.includes(id)) {
        setSelectedSlots((slots) => slots.filter((key) => !key.startsWith(`${id}|`)));
      }
      return next;
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
    if (!profilePictureUrl && !photoFile) {
      setErrorMsg('Foto profil wajib diunggah sebelum melanjutkan.');
      return;
    }
    persistCurrentDraft(2);
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!license || !experience || !shortBio) {
      setErrorMsg('Mohon lengkapi data kualifikasi Anda.');
      return;
    }
    if (!cvUrl && !cvFile) {
      setErrorMsg('Berkas CV (PDF) wajib diunggah sebelum melanjutkan.');
      return;
    }
    persistCurrentDraft(3);
    setStep(3);
  };

  return {
    step, setStep, errorMsg, setErrorMsg, isSubmitting, setIsSubmitting,
    name, setName, birthDate, setBirthDate, currentAge, gender, setGender,
    phone, setPhone, domicile, setDomicile, license, setLicense, experience,
    setExperience, shortBio, setShortBio, cvFile, setCvFile, cvUrl, setCvUrl,
    photoFile, setPhotoFile, profilePictureUrl, setProfilePictureUrl,
    selectedLocationIds, selectedSlots, schedules, scheduleLabels,
    handleToggleLocation, handleToggleSlot, handleNextStep1, handleNextStep2,
    clearDraft: () => clearDraft(DRAFT_KEY),
  };
}

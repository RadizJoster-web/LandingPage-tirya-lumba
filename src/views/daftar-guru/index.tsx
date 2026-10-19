'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { calculateAge } from '@/lib/utils';
import { DAYS_ID } from '@/lib/constants';
import { Area, Gender, InstructorScheduleInput, Location, SessionSlot } from '@/types';
import {
  getAllLocations,
  getAreas,
  getSessions,
  registerInstructor,
  toErrorMessage,
  uploadInstructorFiles,
} from '@/services/api';
import { Card } from '@/components/ui/Card';
import { StepIndicator } from '@/pages/daftar-murid/StepIndicator';
import { StepBiodataGuru } from './StepBiodataGuru';
import { StepKualifikasi } from './StepKualifikasi';
import { StepKolamJadwal } from './StepKolamJadwal';

export default function DaftarGuruParent() {
  const router = useRouter();
  const { user, isLoading: authLoading, persistRegistration } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 — biodata
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender>('Laki-Laki');
  const [phone, setPhone] = useState('');
  const [domicile, setDomicile] = useState('');

  // Step 2 — kualifikasi & berkas
  const [license, setLicense] = useState('');
  const [experience, setExperience] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Step 3 — kolam + grid jadwal
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const [sessionMap, setSessionMap] = useState<Record<string, SessionSlot[]>>({});
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    let active = true;
    Promise.all([getAreas(), getAllLocations()])
      .then(([areaRows, locationRows]) => {
        if (!active) return;
        setAreas(areaRows);
        setLocations(locationRows);
      })
      .catch((error) => {
        if (active) setErrorMsg(toErrorMessage(error));
      });
    return () => {
      active = false;
    };
  }, []);

  /**
   * Muat sesi 7 hari untuk setiap kolam terpilih, lalu bentuk grid hari × sesi.
   * shortcut: API hanya menyediakan /sessions?locationId&dayOfWeek, jadi satu kolam
   * butuh 7 permintaan; pecah per hari bila backend menambah filter sesi massal.
   */
  const pendingLocationIds = selectedLocationIds.filter((id) => !sessionMap[id]);
  const sessionsLoading = pendingLocationIds.length > 0;

  useEffect(() => {
    const pending = selectedLocationIds.filter((id) => !sessionMap[id]);
    if (pending.length === 0) return;

    let active = true;
    Promise.all(
      pending.map(async (locationId) => {
        const perDay = await Promise.all(
          DAYS_ID.map((day) => getSessions(locationId, day).catch(() => [] as SessionSlot[])),
        );
        return [locationId, perDay.flat()] as const;
      }),
    )
      .then((entries) => {
        if (!active) return;
        setSessionMap((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
      })
      .catch((error) => {
        if (active) setErrorMsg(toErrorMessage(error));
      });

    return () => {
      active = false;
    };
  }, [selectedLocationIds, sessionMap]);

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
        const location = locations.find((item) => item.id === schedule.locationId);
        return `${location?.name ?? 'Kolam'} — ${schedule.dayOfWeek}, ${schedule.sessionName}`;
      }),
    [schedules, locations],
  );

  const handleToggleLocation = (id: string) => {
    setErrorMsg('');
    setSelectedLocationIds((prev) => {
      if (prev.includes(id)) {
        // Jadwal pada kolam yang dilepas ikut dibuang agar payload tetap konsisten.
        setSelectedSlots((slots) => slots.filter((key) => !key.startsWith(`${id}|`)));
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
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!license || !experience || !shortBio) {
      setErrorMsg('Mohon lengkapi data kualifikasi Anda.');
      return;
    }
    if (!cvFile) {
      setErrorMsg('Berkas CV / sertifikat (PDF) wajib diunggah.');
      return;
    }
    if (!photoFile) {
      setErrorMsg('Foto profil pelatih wajib diunggah.');
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (selectedLocationIds.length === 0) {
      setErrorMsg('Pilih minimal satu kolam yang Anda sanggupi.');
      return;
    }
    if (schedules.length === 0) {
      setErrorMsg('Centang minimal satu jadwal mengajar pada tabel hari dan sesi.');
      return;
    }
    if (!cvFile || !photoFile) {
      setErrorMsg('CV dan foto profil wajib diunggah.');
      return;
    }

    setIsSubmitting(true);
    try {
      const uploads = await uploadInstructorFiles({ cv: cvFile, profilePicture: photoFile });

      const result = await registerInstructor({
        fullName: name,
        phone,
        birthDate,
        gender,
        address: domicile,
        shortBio,
        license,
        experience,
        schedules,
        profilePictureUrl: uploads.profilePicture.url,
        cvUrl: uploads.cv.url,
      });

      persistRegistration({
        kind: 'instructor',
        fullName: name,
        phone,
        birthDate,
        gender,
        address: domicile,
        shortBio,
        license,
        experience,
        schedules,
        profilePictureUrl: uploads.profilePicture.url,
        cvUrl: uploads.cv.url,
        registrationId: result.registrationId,
        status: result.status,
        submittedAt: Date.now(),
        scheduleLabels,
        uploadNotice:
          !uploads.cv.urlReported || !uploads.profilePicture.urlReported
            ? 'Server tidak mengembalikan URL CV/foto. Kirim ulang berkas tersebut via WhatsApp CS agar admin dapat memverifikasi.'
            : undefined,
      });

      console.log(result)

      router.push('/profile');
    } catch (error) {
      setErrorMsg(toErrorMessage(error));
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
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/40 via-white to-[#F8F9FA]">
      <div className="max-w-3xl mx-auto">
        <Card variant="form" className="p-6 sm:p-8">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E0FBFC] text-[#0077B6] mb-3">
              <span>🧑‍🏫</span> Pendaftaran Guru / Pelatih
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6]">
              Formulir Pendaftaran Pelatih
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Pilih kolam dan centang jadwal mengajar Anda; admin akan memverifikasi berkas dan jadwal tersebut.
            </p>
          </div>

          <StepIndicator
            step={step}
            labels={['Biodata', 'Kualifikasi & Berkas', 'Kolam & Jadwal']}
            errorMsg={errorMsg}
          />

          {/* key memaksa React memasang ulang div agar animasi masuk diputar tiap ganti langkah. */}
          <div key={step} className="mt-8 animate-fade-in-up">
            {step === 1 && (
              <StepBiodataGuru
                name={name}
                setName={setName}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                currentAge={calculateAge(birthDate)}
                gender={gender}
                setGender={setGender}
                phone={phone}
                setPhone={setPhone}
                domicile={domicile}
                setDomicile={setDomicile}
                onSubmit={handleNextStep1}
              />
            )}

            {step === 2 && (
              <StepKualifikasi
                license={license}
                setLicense={setLicense}
                experience={experience}
                setExperience={setExperience}
                shortBio={shortBio}
                setShortBio={setShortBio}
                cvFileName={cvFile?.name ?? ''}
                onCvChange={setCvFile}
                photoFileName={photoFile?.name ?? ''}
                onPhotoChange={setPhotoFile}
                onSubmit={handleNextStep2}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <StepKolamJadwal
                areas={areas}
                locations={locations}
                selectedLocationIds={selectedLocationIds}
                onToggleLocation={handleToggleLocation}
                sessionMap={sessionMap}
                sessionsLoading={sessionsLoading}
                selectedSlots={selectedSlots}
                onToggleSlot={handleToggleSlot}
                slotCount={schedules.length}
                errorMsg={errorMsg}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onBack={() => setStep(2)}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { calculateAge } from '@/lib/utils';
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

  // Step 3 — deklarasi jadwal
  const [areas, setAreas] = useState<Area[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [areaId, setAreaId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [sessionState, setSessionState] = useState<{ key: string; rows: SessionSlot[] } | null>(null);
  const [schedules, setSchedules] = useState<InstructorScheduleInput[]>([]);

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
        if (areaRows.length > 0) setAreaId(areaRows[0].id);
      })
      .catch((error) => {
        if (active) setErrorMsg(toErrorMessage(error));
      });
    return () => {
      active = false;
    };
  }, []);

  const sessionKey = locationId && dayOfWeek ? `${locationId}|${dayOfWeek}` : '';
  const sessions = sessionState?.key === sessionKey ? sessionState.rows : [];
  const sessionLoading = Boolean(sessionKey) && sessionState?.key !== sessionKey;

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

  const areaLocations = useMemo(
    () => locations.filter((location) => location.areaId === areaId),
    [locations, areaId],
  );

  const scheduleLabels = useMemo(
    () =>
      schedules.map((schedule) => {
        const location = locations.find((item) => item.id === schedule.locationId);
        return `${location?.name ?? 'Kolam'} — ${schedule.dayOfWeek}, ${schedule.sessionName}`;
      }),
    [schedules, locations],
  );

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

  const handleAddSchedule = () => {
    setErrorMsg('');
    const duplicate = schedules.some(
      (schedule) =>
        schedule.locationId === locationId &&
        schedule.dayOfWeek === dayOfWeek &&
        schedule.sessionName === sessionName,
    );
    if (duplicate) {
      setErrorMsg('Jadwal tersebut sudah ada dalam daftar.');
      return;
    }
    setSchedules([...schedules, { locationId, dayOfWeek, sessionName }]);
    setSessionName('');
  };

  const handleRemoveSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (schedules.length === 0) {
      setErrorMsg('Deklarasikan minimal satu jadwal mengajar.');
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
      <div className="max-w-2xl mx-auto">
        <Card variant="landing" className="p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E0FBFC] text-[#0077B6] mb-3">
              <span>🧑‍🏫</span> Pendaftaran Guru / Pelatih
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6]">
              Formulir Pendaftaran Pelatih
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Deklarasikan jadwal mengajar Anda; admin akan memverifikasi berkas dan jadwal tersebut.
            </p>
          </div>

          <StepIndicator
            step={step}
            labels={['Biodata', 'Kualifikasi & Berkas', 'Jadwal Mengajar']}
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
                areaId={areaId}
                setAreaId={setAreaId}
                areaLocations={areaLocations}
                locationId={locationId}
                setLocationId={setLocationId}
                dayOfWeek={dayOfWeek}
                setDayOfWeek={setDayOfWeek}
                sessions={sessions}
                sessionLoading={sessionLoading}
                sessionName={sessionName}
                setSessionName={setSessionName}
                schedules={schedules}
                onAddSchedule={handleAddSchedule}
                onRemoveSchedule={handleRemoveSchedule}
                scheduleLabels={scheduleLabels}
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

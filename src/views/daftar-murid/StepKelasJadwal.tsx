import React from 'react';
import { MuridStep2Props } from './types';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CoachSelector } from './CoachSelector';
import { PoolPackagePicker } from './PoolPackagePicker';

export const StepKelasJadwal: React.FC<MuridStep2Props> = ({
  areas,
  areaId,
  setAreaId,
  areaLocations,
  locationId,
  onSelectLocation,
  locationPackages,
  packageId,
  setPackageId,
  firstMeetDate,
  setFirstMeetDate,
  sessions,
  sessionLoading,
  sessionName,
  setSessionName,
  instructors,
  instructorLoading,
  instructorId,
  setInstructorId,
  photoFileName,
  onPhotoChange,
  isLoadingData,
  onSubmit,
  onBack,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <PoolPackagePicker
        areas={areas}
        areaId={areaId}
        setAreaId={setAreaId}
        areaLocations={areaLocations}
        locationId={locationId}
        onSelectLocation={onSelectLocation}
        locationPackages={locationPackages}
        packageId={packageId}
        setPackageId={setPackageId}
        isLoadingData={isLoadingData}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Rencana Pertemuan Pertama *"
          type="date"
          min={todayStr}
          value={firstMeetDate}
          onChange={(e) => setFirstMeetDate(e.target.value)}
          required
        />

        <Select
          label="Sesi Jam Latihan *"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          disabled={!firstMeetDate || sessionLoading}
          helperText={
            !firstMeetDate
              ? 'Pilih tanggal pertemuan terlebih dahulu.'
              : sessionLoading
                ? 'Memuat sesi tersedia…'
                : sessions.length === 0
                  ? 'Belum ada sesi terdaftar pada hari itu.'
                  : undefined
          }
        >
          <option value="">-- Pilih Sesi --</option>
          {sessions.map((session) => (
            <option key={session.id} value={session.sessionName}>
              {session.sessionName} ({session.startTime} - {session.endTime})
            </option>
          ))}
        </Select>
      </div>

      <CoachSelector
        sessionReady={Boolean(locationId && firstMeetDate && sessionName)}
        availableCoaches={instructors}
        isLoading={instructorLoading}
        coachId={instructorId}
        setCoachId={setInstructorId}
      />

      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          Foto 4x6 Murid * (JPG/PNG maks 5 MB)
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-slate-600 border border-gray-300 rounded-lg px-3 py-2 bg-white file:mr-3 file:px-3 file:py-1.5 file:rounded-full file:border-0 file:bg-[#E0FBFC] file:text-[#0077B6] file:font-semibold file:cursor-pointer"
        />
        {photoFileName && (
          <p className="text-xs text-emerald-600 font-semibold mt-1.5">
            ✓ {photoFileName}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button type="button" variant="outline" size="md" onClick={onBack}>
          ← Kembali
        </Button>
        <Button type="submit" variant="primary" size="md" className="flex-1 sm:flex-none">
          Lanjut ke Pembayaran →
        </Button>
      </div>
    </form>
  );
};

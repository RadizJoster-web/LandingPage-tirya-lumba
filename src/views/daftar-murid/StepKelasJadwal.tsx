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
  isLoadingData,
  onSubmit,
  onBack,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
          label="Tanggal Mulai Les Pertama *"
          type="date"
          min={todayStr}
          value={firstMeetDate}
          onChange={(e) => setFirstMeetDate(e.target.value)}
          required
        />

        <Select
          label="Pilih Jam Sesi Latihan *"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          disabled={!firstMeetDate || sessionLoading}
          required
        >
          <option value="">
            {sessionLoading
              ? 'Memuat sesi tersedia...'
              : !firstMeetDate
                ? 'Pilih tanggal mulai terlebih dahulu'
                : 'Pilih sesi jam latihan'}
          </option>
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

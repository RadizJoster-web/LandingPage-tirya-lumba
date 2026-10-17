import React from 'react';
import { MuridStep2Props } from './types';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CoachSelector } from './CoachSelector';

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
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Select
        label="Wilayah Kolam Renang *"
        value={areaId}
        onChange={(e) => setAreaId(e.target.value)}
        disabled={isLoadingData}
        helperText="Data wilayah diambil langsung dari server."
      >
        <option value="">-- Pilih Wilayah --</option>
        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </Select>

      <Select
        label="Pilihan Lokasi Kolam Renang *"
        value={locationId}
        onChange={(e) => onSelectLocation(e.target.value)}
        disabled={!areaId || areaLocations.length === 0}
      >
        <option value="">
          {areaId
            ? '-- Pilih Kolam Renang --'
            : '-- Pilih wilayah terlebih dahulu --'}
        </option>
        {areaLocations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </Select>

      <Select
        label="Jenis Kelas / Paket Les *"
        value={packageId}
        onChange={(e) => setPackageId(e.target.value)}
        disabled={!locationId}
        helperText="Harga diambil dari paket resmi kolam yang dipilih."
      >
        <option value="">
          {locationId ? '-- Pilih Paket Les --' : '-- Pilih kolam terlebih dahulu --'}
        </option>
        {locationPackages.map((item) => (
          <option key={item.id} value={item.id}>
            {item.type} — Rp {item.price.toLocaleString('id-ID')}
          </option>
        ))}
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Rencana Pertemuan Pertama *"
          type="date"
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
        <p className="text-xs text-slate-400 mt-1">
          Berkas langsung diunggah ke server saat Anda menekan Lanjut.
        </p>
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

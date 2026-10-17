import React from 'react';
import { GuruStep3Props } from './types';
import { DAYS_ID } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

export const StepKolamJadwal: React.FC<GuruStep3Props> = ({
  areas,
  areaId,
  setAreaId,
  areaLocations,
  locationId,
  setLocationId,
  dayOfWeek,
  setDayOfWeek,
  sessions,
  sessionLoading,
  sessionName,
  setSessionName,
  schedules,
  onAddSchedule,
  onRemoveSchedule,
  scheduleLabels,
  errorMsg,
  isSubmitting,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-[#1D3557]">
            Deklarasi Jadwal Mengajar *
          </label>
          <span className="text-xs text-[#0077B6] font-medium">
            Semakin banyak jadwal, semakin besar kesempatan mengajar
          </span>
        </div>

        <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <Select
            label="Wilayah Kolam"
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
          >
            <option value="">-- Pilih Wilayah --</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </Select>

          <Select
            label="Kolam Renang"
            value={locationId}
            onChange={(e) => {
              setLocationId(e.target.value);
              setSessionName('');
            }}
            disabled={!areaId}
          >
            <option value="">-- Pilih Kolam --</option>
            {areaLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Hari Mengajar"
              value={dayOfWeek}
              onChange={(e) => {
                setDayOfWeek(e.target.value);
                setSessionName('');
              }}
              disabled={!locationId}
            >
              <option value="">-- Pilih Hari --</option>
              {DAYS_ID.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>

            <Select
              label="Sesi Jam"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              disabled={!dayOfWeek || sessionLoading}
              helperText={
                sessionLoading
                  ? 'Memuat sesi…'
                  : dayOfWeek && sessions.length === 0
                    ? 'Belum ada sesi pada hari itu.'
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

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onAddSchedule}
            disabled={!locationId || !dayOfWeek || !sessionName}
          >
            + Tambahkan ke Daftar Jadwal
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-[#1D3557] mb-2">
          Jadwal yang Dideklarasikan ({schedules.length})
        </p>
        {schedules.length === 0 ? (
          <p className="text-xs text-slate-500 italic bg-white p-3 rounded-lg border border-slate-200">
            Belum ada jadwal. Tambahkan minimal satu jadwal mengajar.
          </p>
        ) : (
          <ul className="space-y-2">
            {schedules.map((schedule, index) => (
              <li
                key={`${schedule.locationId}-${schedule.dayOfWeek}-${schedule.sessionName}`}
                className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm"
              >
                <span className="text-[#1D3557] font-medium">
                  🗓️ {scheduleLabels[index]}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveSchedule(index)}
                  className="text-xs font-bold text-[#FF6F59] hover:underline"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#FF6F59]">
          {errorMsg}
        </div>
      )}

      <div className="pt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="outline" size="md" onClick={onBack} disabled={isSubmitting}>
          ← Kembali
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          disabled={schedules.length === 0}
        >
          Kirim Pendaftaran Pelatih
        </Button>
      </div>
    </form>
  );
};

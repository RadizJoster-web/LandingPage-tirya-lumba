import React from 'react';
import { MuridStep2Props } from './types';
import { INITIAL_POOLS, POOL_CATEGORIES, CLASS_TYPES } from '@/lib/constants';
import { ClassType } from '@/types';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CoachSelector } from './CoachSelector';

export const StepKelasJadwal: React.FC<MuridStep2Props> = ({
  poolId,
  setPoolId,
  classType,
  setClassType,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  coachName,
  setCoachName,
  availableCoaches,
  photoFiles,
  handleFileChange,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Select
        label="Pilihan Lokasi Kolam Renang *"
        value={poolId}
        onChange={(e) => {
          setPoolId(Number(e.target.value));
          setCoachName('');
        }}
      >
        {Object.entries(POOL_CATEGORIES).map(([catKey, catLabel]) => (
          <optgroup key={catKey} label={catLabel}>
            {INITIAL_POOLS.filter((p) => p.category === catKey).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - {p.address}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>

      <Select
        label="Pilihan Kelas Renang *"
        value={classType}
        onChange={(e) => setClassType(e.target.value as ClassType)}
      >
        {CLASS_TYPES.map((cls) => (
          <option key={cls} value={cls}>
            Kelas {cls}
          </option>
        ))}
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Rencana Pertemuan ke-1 (Tanggal) *"
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setCoachName('');
          }}
          required
        />
        <Input
          label="Jam Pertemuan *"
          type="time"
          value={startTime}
          onChange={(e) => {
            setStartTime(e.target.value);
            setCoachName('');
          }}
          required
        />
      </div>

      <CoachSelector
        startDate={startDate}
        availableCoaches={availableCoaches}
        coachName={coachName}
        setCoachName={setCoachName}
      />

      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          Upload Foto Pribadi 4x6 cm * (Maks 5 file, didukung PDF / Gambar, maks 100MB/file)
        </label>
        <input
          type="file"
          multiple
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#E0FBFC] file:text-[#0077B6] hover:file:bg-[#00B4D8] hover:file:text-white file:cursor-pointer border border-gray-300 rounded-lg p-1.5"
        />
        {photoFiles.length > 0 && (
          <p className="text-xs text-emerald-600 mt-1.5">
            ✓ {photoFiles.length} berkas dipilih: {photoFiles.map((f) => f.name).join(', ')}
          </p>
        )}
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          isFullRounded={true}
          onClick={onBack}
        >
          ← Kembali
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={true}
          className="min-w-[140px]"
        >
          Lanjut ke Pembayaran →
        </Button>
      </div>
    </form>
  );
};

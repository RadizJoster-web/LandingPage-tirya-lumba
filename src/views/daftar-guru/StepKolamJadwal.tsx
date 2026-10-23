import React, { useMemo } from 'react';
import { GuruStep3Props } from './types';
import { Button } from '@/components/ui/Button';
import { ScheduleMatrixTable } from './ScheduleMatrixTable';
import { PoolSelectionList } from './PoolSelectionList';

export const StepKolamJadwal: React.FC<GuruStep3Props> = ({
  areas,
  locations,
  selectedLocationIds,
  onToggleLocation,
  sessionMap,
  sessionsLoading,
  selectedSlots,
  onToggleSlot,
  slotCount,
  errorMsg,
  isSubmitting,
  onSubmit,
  onBack,
}) => {
  const poolsByArea = useMemo(
    () =>
      areas.map((area) => ({
        area,
        pools: locations.filter((loc) => loc.areaId === area.id),
      })),
    [areas, locations],
  );

  const selectedPools = useMemo(
    () => locations.filter((loc) => selectedLocationIds.includes(loc.id)),
    [locations, selectedLocationIds],
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label className="block text-sm font-semibold text-[#1D3557]">
            1. Pilih Kolam yang Anda Sanggupi *
          </label>
          <span className="text-xs text-[#0077B6] font-medium">
            Boleh lebih dari satu kolam
          </span>
        </div>

        <PoolSelectionList
          poolsByArea={poolsByArea}
          selectedLocationIds={selectedLocationIds}
          onToggleLocation={onToggleLocation}
          hasAreas={areas.length > 0}
        />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label className="block text-sm font-semibold text-[#1D3557]">
            2. Centang Jadwal Mengajar *
          </label>
          <span className="text-xs text-slate-500">{slotCount} jadwal dipilih</span>
        </div>

        {selectedPools.length === 0 ? (
          <p className="text-xs text-slate-500 italic bg-white p-3 rounded-lg border border-slate-200">
            Pilih minimal satu kolam untuk menampilkan sesi hari dan jam.
          </p>
        ) : sessionsLoading ? (
          <p className="text-xs text-slate-500 italic bg-white p-3 rounded-lg border border-slate-200">
            Memuat sesi dari server…
          </p>
        ) : (
          <ScheduleMatrixTable
            selectedPools={selectedPools}
            sessionMap={sessionMap}
            selectedSlots={selectedSlots}
            onToggleSlot={onToggleSlot}
          />
        )}
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#FF6F59]">
          {errorMsg}
        </div>
      )}

      <div className="pt-2 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onBack}
          disabled={isSubmitting}
        >
          ← Kembali
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          disabled={slotCount === 0}
        >
          Kirim Pendaftaran Pelatih
        </Button>
      </div>
    </form>
  );
};

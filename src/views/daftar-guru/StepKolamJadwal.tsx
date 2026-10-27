import React, { useMemo } from 'react';
import { GuruStep3Props } from './types';
import { Button } from '@/components/ui/Button';
import { ScheduleMatrixTable } from './ScheduleMatrixTable';
import { PoolSelectionList } from './PoolSelectionList';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

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
    <form onSubmit={onSubmit} className="space-y-6 animate-fade-in">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            1. Pilih Kolam Renang Mitra Mengajar *
          </label>
          <span className="text-[11px] text-[#0077B6] font-medium">
            Bisa memilih lebih dari 1 lokasi
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            2. Matriks Ketersediaan Hari &amp; Jam Sesi *
          </label>
          <span className="text-xs font-semibold text-[#0077B6] tabular-nums">
            {slotCount} sesi dipilih
          </span>
        </div>

        {selectedPools.length === 0 ? (
          <p className="text-xs text-slate-400 italic bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 dark:bg-slate-900 dark:border-slate-800">
            Pilih minimal satu kolam di atas untuk memunculkan tabel matriks hari dan jam mengajar.
          </p>
        ) : sessionsLoading ? (
          <p className="text-xs text-slate-400 italic bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
            Memuat sesi dari server...
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
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-xs font-medium text-rose-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          size="md"
          isFullRounded={false}
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={false}
          isLoading={isSubmitting}
          disabled={slotCount === 0}
          className="font-semibold flex items-center gap-2"
        >
          <span>Kirim Pendaftaran Pelatih</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

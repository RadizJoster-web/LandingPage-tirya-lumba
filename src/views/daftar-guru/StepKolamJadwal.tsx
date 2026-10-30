import React, { useMemo } from 'react';
import { GuruStep3Props } from './types';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { PoolSelectionList } from './PoolSelectionList';
import { ScheduleMatrixTable } from './ScheduleMatrixTable';

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
      <PoolSelectionList
        poolsByArea={poolsByArea}
        selectedLocationIds={selectedLocationIds}
        onToggleLocation={onToggleLocation}
        hasAreas={areas.length > 0}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Matriks Jadwal Sesi Mengajar di Kolam Terpilih *
          </label>
          {slotCount > 0 && (
            <span className="text-xs font-bold text-[#0077B6] bg-[#E0FBFC] px-2.5 py-0.5 rounded-full">
              {slotCount} sesi dipilih
            </span>
          )}
        </div>

        {selectedPools.length === 0 ? (
          <p className="p-4 text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-slate-200/80">
            Pilih minimal satu kolam renang di atas untuk mengatur ketersediaan jadwal mengajar Anda.
          </p>
        ) : sessionsLoading && Object.keys(sessionMap).length === 0 ? (
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="w-4 h-4 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
            <span>Memuat data jadwal sesi kolam...</span>
          </div>
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
        <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex justify-between items-center pt-2 gap-3">
        <Button
          type="button"
          variant="outline"
          isFullRounded={false}
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-3 sm:px-5 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Kembali</span>
        </Button>
        <Button
          type="submit"
          variant="primary"
          isFullRounded={false}
          isLoading={isSubmitting}
          disabled={slotCount === 0}
          className="font-semibold flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 min-h-[42px] h-auto text-xs sm:text-sm whitespace-nowrap"
        >
          <span className="hidden sm:inline">Kirim Pendaftaran Pelatih</span>
          <span className="sm:hidden">Kirim Pendaftaran</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </Button>
      </div>
    </form>
  );
};

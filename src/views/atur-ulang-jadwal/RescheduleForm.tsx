import React from 'react';
import { Area, Location, SessionSlot } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PoolSelectionList } from '../daftar-guru/PoolSelectionList';
import { ScheduleMatrixTable } from '../daftar-guru/ScheduleMatrixTable';
import { AlertCircle, Save, ArrowLeft } from 'lucide-react';

interface RescheduleFormProps {
  areas: Area[];
  poolsByArea: Array<{ area: Area; pools: Location[] }>;
  selectedLocationIds: string[];
  onToggleLocation: (locId: string) => void;
  selectedPools: Location[];
  sessionMap: Record<string, SessionSlot[]>;
  selectedSlots: string[];
  onToggleSlot: (key: string) => void;
  activeStudentSlots: Set<string>;
  errorMsg: string;
  isSubmitting: boolean;
  canReschedule: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const RescheduleForm: React.FC<RescheduleFormProps> = ({
  areas,
  poolsByArea,
  selectedLocationIds,
  onToggleLocation,
  selectedPools,
  sessionMap,
  selectedSlots,
  onToggleSlot,
  activeStudentSlots,
  errorMsg,
  isSubmitting,
  canReschedule,
  onSubmit,
  onCancel,
}) => {
  return (
    <Card variant="dashboard" className="p-6 sm:p-8 bg-white shadow-xs border border-gray-200/90 rounded-xl dark:bg-slate-900 dark:border-slate-800">
      <form onSubmit={onSubmit} className="space-y-7">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              1. Pilih Kolam yang Anda Sanggupi *
            </label>
            <span className="text-[11px] text-[#0077B6] font-medium">Boleh memilih lebih dari satu kolam</span>
          </div>
          <PoolSelectionList
            poolsByArea={poolsByArea}
            selectedLocationIds={selectedLocationIds}
            onToggleLocation={onToggleLocation}
            hasAreas={areas.length > 0}
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              2. Matriks Ketersediaan Jadwal Mengajar *
            </label>
            <span className="text-xs font-semibold text-[#0077B6] bg-[#E0FBFC] px-2.5 py-1 rounded-full border border-[#00B4D8]/30">
              {selectedSlots.length} sesi dipilih (Minimal 1 sesi)
            </span>
          </div>
          {selectedPools.length === 0 ? (
            <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-slate-200/60 dark:bg-slate-800 dark:border-slate-700">
              Pilih minimal satu kolam untuk menampilkan tabel sesi ketersediaan mengajar.
            </p>
          ) : (
            <ScheduleMatrixTable
              selectedPools={selectedPools}
              sessionMap={sessionMap}
              selectedSlots={selectedSlots}
              onToggleSlot={onToggleSlot}
              lockedSlots={Array.from(activeStudentSlots)}
            />
          )}
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200/80 text-xs font-medium text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
          <Button
            type="button"
            variant="outline"
            size="md"
            isFullRounded={false}
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Batal &amp; Kembali</span>
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isFullRounded={false}
            disabled={isSubmitting || !canReschedule || selectedSlots.length < 1}
            className="w-full sm:w-auto font-semibold flex items-center justify-center gap-2 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSubmitting
                ? 'Menyimpan Jadwal...'
                : !canReschedule
                  ? 'Kesempatan Reschedule Habis'
                  : 'Simpan Perubahan Jadwal'}
            </span>
          </Button>
        </div>
      </form>
    </Card>
  );
};

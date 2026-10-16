import React from 'react';
import { Button } from '@/components/ui/Button';

interface RescheduleActionsProps {
  onRemove: () => void;
  onRequest: () => void;
}

export const RescheduleActions: React.FC<RescheduleActionsProps> = ({
  onRemove,
  onRequest,
}) => {
  return (
    <>
      <div className="p-4 bg-blue-50/70 border border-[#00B4D8]/30 rounded-xl text-xs text-slate-600 space-y-1.5 leading-relaxed">
        <p className="font-bold text-[#0077B6] flex items-center gap-1.5">
          <span>ℹ️</span> Ketentuan Reschedule PT Tirya Lumba:
        </p>
        <p>
          • <strong>Hapus Jadwal</strong>: Membatalkan ketersediaan Anda di jadwal tersebut jika ada keperluan pribadi.
        </p>
        <p>
          • <strong>Request Persetujuan</strong>: Syarat mutlak pengajuan adalah Anda <em>tidak sedang memiliki jadwal mengajar murid aktif</em> di hari tersebut.
        </p>
        <p className="text-slate-400 text-[11px] italic">
          (Dalam simulasi demo: Hari Senin, Rabu, dan Sabtu memiliki murid aktif, sehingga otomatis terlindungi dari pembatalan sepihak.)
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="danger"
          size="md"
          isFullRounded={false}
          onClick={onRemove}
          className="w-full sm:w-1/2"
        >
          Hapus Jadwal
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          isFullRounded={false}
          onClick={onRequest}
          className="w-full sm:w-1/2 shadow-sm"
        >
          Request Persetujuan
        </Button>
      </div>
    </>
  );
};

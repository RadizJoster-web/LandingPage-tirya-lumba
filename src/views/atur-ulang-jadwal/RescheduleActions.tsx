import React from 'react';
import { Button } from '@/components/ui/Button';

interface RescheduleActionsProps {
  onSubmit: () => void;
  disabled: boolean;
}

export const RescheduleActions: React.FC<RescheduleActionsProps> = ({ onSubmit, disabled }) => {
  return (
    <>
      <div className="p-4 bg-blue-50/70 border border-[#00B4D8]/30 rounded-xl text-xs text-slate-600 space-y-1.5 leading-relaxed">
        <p className="font-bold text-[#0077B6] flex items-center gap-1.5">
          <span>ℹ️</span> Ketentuan Reschedule PT Tirya Lumba:
        </p>
        <p>• Pengajuan dikirim ke admin beserta ID pendaftaran dan jadwal lama Anda.</p>
        <p>• Perubahan baru berlaku setelah admin memperbarui jadwal, agar tidak bentrok dengan kelas aktif.</p>
        <p>• Pastikan Anda tidak memiliki murid aktif pada jadwal lama sebelum mengajukan penggantian.</p>
      </div>

      <Button
        type="button"
        variant="primary"
        size="md"
        isFullRounded={true}
        className="w-full"
        onClick={onSubmit}
        disabled={disabled}
      >
        Ajukan Reschedule via WhatsApp ↗
      </Button>
    </>
  );
};

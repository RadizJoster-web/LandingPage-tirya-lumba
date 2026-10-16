import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface LicenseModalProps {
  coachName: string;
  license: string;
  onClose: () => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({
  coachName,
  license,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <Card variant="dashboard" className="max-w-md w-full p-6 shadow-2xl">
        <h3 className="font-heading font-extrabold text-xl text-[#0077B6] mb-2">
          Verifikasi Sertifikasi Pelatih
        </h3>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs text-slate-600 mb-6">
          <p><strong>Nama Pelatih:</strong> {coachName}</p>
          <p><strong>Sertifikasi:</strong> {license}</p>
          <p><strong>Status Lisensi:</strong> Terdaftar Resmi & Aktif di PRSI Tangerang</p>
          <p><strong>Water Safety:</strong> Valid hingga 2028</p>
        </div>
        <Button variant="primary" size="md" isFullRounded={false} className="w-full" onClick={onClose}>
          Tutup
        </Button>
      </Card>
    </div>
  );
};

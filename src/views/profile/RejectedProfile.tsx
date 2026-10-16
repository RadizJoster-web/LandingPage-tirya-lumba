import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface RejectedProfileProps {
  reason?: string;
  onApprove: () => void;
}

export const RejectedProfile: React.FC<RejectedProfileProps> = ({
  reason,
  onApprove,
}) => {
  return (
    <div className="min-h-[75vh] py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card variant="dashboard" className="p-8 border-l-4 border-l-[#FF6F59] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="coral">Pendaftaran Ditolak</Badge>
            <span className="text-xs text-slate-400">Verifikasi Berkas Gagal</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#1D3557] mb-3">
            Mohon Maaf, Pendaftaran Belum Dapat Disetujui
          </h2>
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-800 mb-6 space-y-1">
            <p className="font-bold">Alasan Penolakan:</p>
            <p>
              {reason ||
                'Dokumen pendukung / bukti transfer pembayaran kurang jelas dan tidak dapat diverifikasi oleh admin.'}
            </p>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Silakan hubungi tim Customer Service atau Pengelola melalui WhatsApp untuk melakukan verifikasi ulang berkas Anda.
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Tirya%20Lumba,%20saya%20ingin%20konsultasi%20mengenai%20status%20pendaftaran%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="danger" size="md" isFullRounded={false} className="gap-2">
              <span>💬</span> Hubungi CS via WhatsApp
            </Button>
          </a>
        </Card>

        {/* Testing Simulator Box */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs flex items-center justify-between">
          <span className="font-semibold text-amber-900">
            🧪 Mode Demo Penguji: Ubah status kembali menjadi disetujui:
          </span>
          <Button variant="outline" size="sm" isFullRounded={false} onClick={onApprove}>
            Setujui Pendaftaran
          </Button>
        </div>
      </div>
    </div>
  );
};

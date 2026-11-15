import React from 'react';
import Link from 'next/link';
import { AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProfileNoticeRowProps {
  status: string;
  isStudent: boolean;
  activeSessions?: number;
  rejectionReason?: string;
  waMessage: string;
}

export const ProfileNoticeRow: React.FC<ProfileNoticeRowProps> = ({
  status,
  isStudent,
  activeSessions = 0,
  rejectionReason,
  waMessage,
}) => {
  if (status === 'PENDING') {
    return (
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 flex items-start gap-3 mb-6">
        <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-amber-900">Menunggu Verifikasi Admin</h4>
          <p className="text-amber-800 leading-relaxed">
            Data registrasi Anda sedang ditinjau. Jadwal latihan dan akses instruktur akan aktif setelah disetujui.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'REJECTED') {
    return (
      <div className="rounded-2xl border border-rose-200/80 bg-rose-50/70 p-4 space-y-3 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-bold text-rose-900">Pendaftaran Ditolak</h4>
            <p className="text-rose-800 leading-relaxed">
              {rejectionReason || 'Terdapat data atau berkas yang belum sesuai kriteria administrasi.'}
            </p>
          </div>
        </div>
        <div className="pt-1 pl-8">
          <a
            href={`https://wa.me/6281234567890?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="danger" size="sm" isFullRounded={false} className="text-xs">
              Hubungi Admin via WhatsApp
            </Button>
          </a>
        </div>
      </div>
    );
  }

  if (status === 'APPROVED' && isStudent && activeSessions === 0) {
    return (
      <div className="rounded-2xl border border-[#00B4D8]/30 bg-[#E0FBFC]/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-start gap-3">
          <RefreshCw className="w-5 h-5 text-[#0077B6] shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <h4 className="font-bold text-[#1D3557]">Paket Latihan Selesai (0 Sesi)</h4>
            <p className="text-slate-600 leading-relaxed">
              Seluruh sesi kursus Anda telah selesai. Perpanjang paket untuk melanjutkan latihan bersama pelatih.
            </p>
          </div>
        </div>
        <Link href="/daftar/murid" className="shrink-0">
          <Button variant="primary" size="sm" isFullRounded={false} className="text-xs font-semibold">
            Perpanjang Paket
          </Button>
        </Link>
      </div>
    );
  }

  return null;
};

'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, Clock, RefreshCw, MessageCircle } from 'lucide-react';
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
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 sm:p-5 backdrop-blur-md flex items-start gap-3.5 mb-6 shadow-xs">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 mt-0.5">
          <Clock className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-heading font-bold text-sm text-amber-950">
            Pendaftaran Berhasil Dikirim &amp; Menunggu Verifikasi
          </h4>
          <p className="text-amber-900/90 leading-relaxed text-xs">
            Tim admin kami sedang meninjau berkas pendaftaran Anda. Setelah disetujui, jadwal pertemuan resmi dan instruktur pembimbing akan aktif secara otomatis di profil ini.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'REJECTED') {
    return (
      <div className="rounded-2xl border border-rose-200/80 bg-rose-50/70 p-4 sm:p-5 backdrop-blur-md space-y-3 mb-6 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-600 mt-0.5">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-xs space-y-1">
            <h4 className="font-heading font-bold text-sm text-rose-950">
              Pengajuan Pendaftaran Perlu Penyesuaian
            </h4>
            <p className="text-rose-900/90 leading-relaxed text-xs">
              {rejectionReason ||
                'Terdapat data atau berkas pembayaran yang belum memenuhi ketentuan administrasi. Silakan hubungi admin kami untuk verifikasi ulang.'}
            </p>
          </div>
        </div>
        <div className="pt-1 pl-11 flex flex-wrap gap-2.5">
          <a
            href={`https://wa.me/6281234567890?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="danger"
              size="sm"
              isFullRounded={true}
              className="text-xs font-semibold px-4 flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Konfirmasi via WhatsApp</span>
            </Button>
          </a>
          <Link href={isStudent ? '/daftar/murid' : '/daftar/guru'}>
            <Button
              variant="outline"
              size="sm"
              isFullRounded={true}
              className="text-xs font-semibold px-4 border-rose-200 text-rose-700 hover:bg-rose-100"
            >
              Ajukan Ulang Pendaftaran
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'APPROVED' && isStudent && activeSessions === 0) {
    return (
      <div className="rounded-2xl border border-[#00B4D8]/30 bg-gradient-to-r from-[#E0FBFC]/60 to-white/70 p-4 sm:p-5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-[#00B4D8]/20 flex items-center justify-center shrink-0 text-[#0077B6] mt-0.5">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div className="text-xs space-y-1">
            <h4 className="font-heading font-bold text-sm text-[#1D3557]">
              Waktunya Melanjutkan Latihan Renang Anda!
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              Seluruh sesi paket latihan Anda telah selesai (0 sisa pertemuan). Perpanjang paket untuk melanjutkan jadwal rutin bersama pelatih Anda.
            </p>
          </div>
        </div>
        <Link href="/daftar/murid" className="shrink-0 self-start sm:self-center">
          <Button
            variant="primary"
            size="sm"
            isFullRounded={true}
            className="text-xs font-semibold px-5 shadow-sm"
          >
            Daftar Ulang Sekarang
          </Button>
        </Link>
      </div>
    );
  }

  return null;
};

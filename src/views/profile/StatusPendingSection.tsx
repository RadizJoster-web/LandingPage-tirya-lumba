import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { BlurredDashboard } from './BlurredDashboard';
import { Clock } from 'lucide-react';

interface StatusPendingSectionProps {
  isStudent: boolean;
}

export const StatusPendingSection: React.FC<StatusPendingSectionProps> = ({
  isStudent,
}) => {
  return (
    <section className="rounded-xl bg-white p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-5 dark:bg-slate-900 dark:border-slate-800">
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
            Status Pengajuan Berkas
          </h2>
          <Badge variant="azure" size="sm">
            Sedang Ditinjau
          </Badge>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Pendaftaran {isStudent ? 'murid' : 'pelatih'} Anda telah berhasil tersimpan di sistem. Dasbor akan aktif penuh setelah diverifikasi admin.
        </p>
      </div>

      <div className="mt-2">
        <BlurredDashboard message="Dasbor jadwal latihan aktif setelah verifikasi admin selesai" />
      </div>

      <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <h3 className="font-heading font-bold text-sm text-amber-950">
              Pendaftaran Berhasil Dikirim &amp; Menunggu Verifikasi
            </h3>
            <p className="text-xs leading-relaxed text-amber-900/90">
              Data kesiswaan dan bukti pembayaran Anda sedang dalam proses peninjauan oleh tim admin PT Tirya Lumba. Anda <strong>tidak perlu mendaftar ulang</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

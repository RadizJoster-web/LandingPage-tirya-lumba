import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Clock } from 'lucide-react';

interface RescheduleTokenBannerProps {
  canReschedule: boolean;
  remainingTokens: number;
  lastRescheduledFormatted: string;
  nextAvailableFormatted: string;
}

export const RescheduleTokenBanner: React.FC<RescheduleTokenBannerProps> = ({
  canReschedule,
  remainingTokens,
  lastRescheduledFormatted,
  nextAvailableFormatted,
}) => {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        canReschedule
          ? 'bg-gradient-to-r from-[#E0FBFC]/80 to-white border-[#00B4D8]/40 text-[#1D3557] dark:from-slate-900 dark:to-slate-900/60 dark:border-cyan-900/60 dark:text-cyan-100'
          : 'bg-gradient-to-r from-amber-50/80 to-white border-amber-200/80 text-amber-950 dark:from-slate-900 dark:to-slate-900/60 dark:border-amber-900/40 dark:text-amber-200'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`p-2.5 rounded-xl shrink-0 ${
            canReschedule
              ? 'bg-[#0077B6] text-white shadow-xs'
              : 'bg-amber-500 text-white shadow-xs'
          }`}
        >
          <Clock className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading font-bold text-sm sm:text-base">
              Token Atur Ulang Jadwal:{' '}
              <span className="font-mono text-sm underline decoration-[#00B4D8] decoration-2">
                {remainingTokens} / 1 Kesempatan
              </span>
            </h3>
            <Badge
              variant={canReschedule ? 'success' : 'outline'}
              className="text-[10px] uppercase font-bold tracking-wider"
            >
              {canReschedule ? 'Dapat Mengubah Jadwal' : 'Terkunci'}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed opacity-90">
            {canReschedule ? (
              <>
                Pelatih memiliki hak penyesuaian <strong>1 kali per 30 hari</strong>. Sesi yang telah memiliki murid aktif akan terkunci otomatis dan tidak dapat dihapus.
              </>
            ) : (
              <>
                Jadwal terakhir diperbarui pada <strong>{lastRescheduledFormatted}</strong>. Kesempatan atur ulang berikutnya akan terbuka kembali pada <strong>{nextAvailableFormatted}</strong>.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

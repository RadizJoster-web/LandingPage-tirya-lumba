import React from 'react';
import Link from 'next/link';
import { CS_WHATSAPP } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, MessageCircle, RefreshCw } from 'lucide-react';

interface StatusRejectedSectionProps {
  isStudent: boolean;
  rejectionReason?: string;
  waMessage: string;
}

export const StatusRejectedSection: React.FC<StatusRejectedSectionProps> = ({
  isStudent,
  rejectionReason,
  waMessage,
}) => {
  return (
    <section className="rounded-xl border border-rose-200 bg-rose-50/60 p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-bold text-base text-rose-950">
              Pendaftaran Anda Belum Dapat Disetujui
            </h3>
            <Badge variant="coral" size="sm">
              Perlu Perbaikan
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
            Mohon maaf, berkas pendaftaran Anda belum memenuhi persyaratan atau bukti transfer tidak terbaca.
          </p>

          {rejectionReason && (
            <div className="rounded-lg bg-white/80 p-3.5 border border-rose-200/80 text-xs text-rose-900 font-mono">
              <span className="font-bold block mb-1 uppercase tracking-wider text-[10px] text-rose-700">
                Catatan Petugas Admin:
              </span>
              {rejectionReason}
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <a
              href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="danger"
                size="sm"
                isFullRounded={false}
                className="flex items-center gap-1.5 font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Hubungi CS via WhatsApp</span>
              </Button>
            </a>
            <Link href={isStudent ? '/daftar/murid' : '/daftar/guru'}>
              <Button
                variant="outline"
                size="sm"
                isFullRounded={false}
                className="border-rose-300 text-rose-800 hover:bg-rose-100 flex items-center gap-1.5 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ajukan Pendaftaran Ulang</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

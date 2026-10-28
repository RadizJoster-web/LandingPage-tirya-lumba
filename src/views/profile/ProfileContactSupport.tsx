import React from 'react';
import { CS_WHATSAPP } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { MessageCircle } from 'lucide-react';

interface ProfileContactSupportProps {
  waMessage: string;
}

export const ProfileContactSupport: React.FC<ProfileContactSupportProps> = ({
  waMessage,
}) => {
  return (
    <section className="rounded-xl bg-white border border-gray-200/90 p-5 sm:p-6 shadow-xs dark:bg-slate-900 dark:border-slate-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-heading font-bold text-sm text-[#1D3557] dark:text-slate-100">
            Pertanyaan seputar Jadwal atau Status?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tim Customer Service kami siap membantu konfirmasi sesi latihan dan perubahan jadwal Anda.
          </p>
        </div>
        <a
          href={`https://wa.me/${CS_WHATSAPP}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Button
            variant="outline"
            size="sm"
            isFullRounded={false}
            className="flex items-center gap-1.5 border-slate-300 text-[#0077B6] hover:bg-[#E0FBFC]/50"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat WhatsApp CS</span>
          </Button>
        </a>
      </div>
    </section>
  );
};

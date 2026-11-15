import React from 'react';
import { MessageCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProfileSupportAndLogoutRowProps {
  waMessage: string;
  onLogout: () => void;
}

export const ProfileSupportAndLogoutRow: React.FC<ProfileSupportAndLogoutRowProps> = ({
  waMessage,
  onLogout,
}) => {
  return (
    <>
      {/* Support Access Row */}
      <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="sm:w-2/3 space-y-1">
          <h3 className="text-sm font-bold text-[#1D3557] dark:text-slate-100">
            Layanan Bantuan &amp; CS
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Terhubung langsung dengan admin resmi PT Tirya Lumba jika terdapat kendala jadwal atau akun.
          </p>
        </div>
        <div className="sm:w-1/3 flex sm:justify-end">
          <a
            href={`https://wa.me/6281234567890?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="sm"
              isFullRounded={false}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs text-[#0077B6] border-[#00B4D8]/40 hover:bg-[#E0FBFC]/30"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp CS</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Logout Row */}
      <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="sm:w-2/3 space-y-1">
          <h3 className="text-sm font-bold text-[#1D3557] dark:text-slate-100">
            Keluar dari Akun
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Keluar dari seluruh sesi aktif aplikasi pada perangkat browser ini.
          </p>
        </div>
        <div className="sm:w-1/3 flex sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            isFullRounded={false}
            onClick={onLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun</span>
          </Button>
        </div>
      </div>
    </>
  );
};

'use client';

import React from 'react';
import { MessageCircle, LogOut, HelpCircle, Shield } from 'lucide-react';
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
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#0077B6]" />
            <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
              Layanan Bantuan &amp; Customer Care
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Butuh penyesuaian jadwal atau bantuan verifikasi akun? Tim kami siap melayani Anda melalui WhatsApp resmi PT Tirya Lumba.
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
              isFullRounded={true}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0077B6] border-[#00B4D8]/40 hover:bg-[#E0FBFC]/40 px-4 py-2"
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
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-slate-400" />
            <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
              Keamanan &amp; Sesi Akun
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Keluar dari sesi akun aktif pada perangkat ini demi menjaga kerahasiaan data Anda.
          </p>
        </div>
        <div className="sm:w-1/3 flex sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            isFullRounded={true}
            onClick={onLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-600 border-rose-200/90 hover:bg-rose-50 hover:text-rose-700 px-4 py-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun</span>
          </Button>
        </div>
      </div>
    </>
  );
};

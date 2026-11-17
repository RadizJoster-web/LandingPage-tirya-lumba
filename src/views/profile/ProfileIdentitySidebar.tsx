import React from 'react';
import { LogOut, MessageCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

interface ProfileIdentitySidebarProps {
  name: string;
  email: string;
  photoUrl?: string | null;
  tagline: string;
  badges: React.ReactNode;
  waMessage: string;
  onLogout: () => void;
}

export const ProfileIdentitySidebar: React.FC<ProfileIdentitySidebarProps> = ({
  name,
  email,
  photoUrl,
  tagline,
  badges,
  waMessage,
  onLogout,
}) => {
  return (
    <aside className="w-full md:w-[300px] shrink-0 md:sticky md:top-24 self-start rounded-2xl bg-white border border-gray-200/90 p-6 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
      {/* Foto & Identitas */}
      <div className="space-y-3">
        <Avatar
          name={name}
          src={photoUrl}
          size="lg"
          className="w-20 h-20 rounded-full ring-2 ring-slate-100 shadow-xs dark:ring-slate-800"
        />

        <div className="space-y-1">
          <h1 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100 break-words">
            {name}
          </h1>
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {badges}
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
            {tagline}
          </p>
          <p className="text-xs text-slate-400 truncate font-mono">
            {email}
          </p>
        </div>
      </div>

      {/* Pemisah */}
      <hr className="border-gray-100 dark:border-slate-800 my-4" />

      {/* Tindakan Akun */}
      <div className="space-y-2 pt-1">
        <a
          href={`https://wa.me/6281234567890?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            variant="primary"
            size="sm"
            isFullRounded={false}
            className="w-full flex items-center justify-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-semibold text-xs py-2.5"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Hubungi CS via WhatsApp</span>
          </Button>
        </a>

        <Button
          variant="ghost"
          size="sm"
          isFullRounded={false}
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/40"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>Keluar Akun</span>
        </Button>
      </div>
    </aside>
  );
};

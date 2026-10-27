import React from 'react';
import { Avatar } from '@/components/ui/Avatar';

interface ProfileHeaderProps {
  name: string;
  email: string;
  photoUrl?: string | null;
  eyebrow: string;
  children?: React.ReactNode;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  photoUrl,
  eyebrow,
  children,
}) => {
  return (
    <header className="rounded-xl bg-white border border-gray-200/90 p-5 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            name={name}
            src={photoUrl}
            size="lg"
            className="ring-2 ring-slate-100 shadow-sm"
          />
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
              {eyebrow}
            </span>
            <h1 className="truncate font-heading text-xl sm:text-2xl font-bold text-[#1D3557] dark:text-slate-100">
              {name}
            </h1>
            <p className="truncate text-xs sm:text-sm text-slate-500">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {children}
        </div>
      </div>
    </header>
  );
};

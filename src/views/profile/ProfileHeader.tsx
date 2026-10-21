import React from 'react';
import { Avatar } from '@/components/ui/Avatar';

interface ProfileHeaderProps {
  name: string;
  email: string;
  photoUrl?: string | null;
  /** Label peran, mis. "Akun Murid" atau "Pendaftaran Pelatih". */
  eyebrow: string;
  children?: React.ReactNode;
}

/** Kepala halaman profil: pita gradien + foto/identitas akun, tanpa bingkai kartu. */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  photoUrl,
  eyebrow,
  children,
}) => {
  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0077B6] via-[#0096C7] to-[#00B4D8] p-6 text-white shadow-[0_25px_50px_-30px_rgba(0,119,182,0.9)] sm:p-8">
      <div
        className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            name={name}
            src={photoUrl}
            size="lg"
            className="ring-4 ring-white/40 shadow-lg"
          />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              {eyebrow}
            </p>
            <h1 className="truncate font-heading text-2xl font-extrabold">{name}</h1>
            <p className="truncate text-sm text-white/80">{email}</p>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
};

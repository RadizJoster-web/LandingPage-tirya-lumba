import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BlurredDashboard } from './BlurredDashboard';
import { ProfileHeader } from './ProfileHeader';

interface EmptyProfileProps {
  name: string;
  email: string;
  photoUrl?: string | null;
}

/** Akun sudah login tetapi belum punya pendaftaran murid/pelatih. */
export const EmptyProfile: React.FC<EmptyProfileProps> = ({ name, email, photoUrl }) => {
  return (
    <main className="min-h-[80vh] bg-gradient-to-b from-[#E0FBFC]/70 via-[#F8F9FA] to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-5">
        <ProfileHeader
          name={name}
          email={email}
          photoUrl={photoUrl}
          eyebrow="Akun Terdaftar"
        >
          <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            Belum ada pendaftaran
          </span>
        </ProfileHeader>

        <section className="rounded-3xl bg-white/85 p-6 ring-1 ring-slate-100 sm:p-8">
          <h2 className="font-heading text-lg font-extrabold text-[#1D3557]">
            Buka dasbor Anda
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Pilih jalur pendaftaran di bawah ini. Dasbor murid atau pelatih akan aktif
            setelah admin memverifikasi pendaftaran Anda.
          </p>

          <div className="mt-5">
            <BlurredDashboard />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href="/daftar/murid" className="block">
              <Button variant="primary" size="md" isFullRounded={true} className="w-full">
                Daftar Sebagai Murid
              </Button>
            </Link>
            <Link href="/daftar/guru" className="block">
              <Button variant="outline" size="md" isFullRounded={true} className="w-full">
                Daftar Sebagai Pelatih
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

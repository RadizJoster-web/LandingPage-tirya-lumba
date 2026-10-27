import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BlurredDashboard } from './BlurredDashboard';
import { ProfileHeader } from './ProfileHeader';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight } from 'lucide-react';

interface EmptyProfileProps {
  name: string;
  email: string;
  photoUrl?: string | null;
}

export const EmptyProfile: React.FC<EmptyProfileProps> = ({ name, email, photoUrl }) => {
  return (
    <main className="min-h-[85vh] bg-[#F3F4F6] px-4 py-10 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl space-y-6">
        <ProfileHeader
          name={name}
          email={email}
          photoUrl={photoUrl}
          eyebrow="Akun Pengguna"
        >
          <Badge variant="neutral" size="sm">
            Belum Terdaftar
          </Badge>
        </ProfileHeader>

        <section className="rounded-xl bg-white p-6 sm:p-8 border border-gray-200/90 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-5">
          <div>
            <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
              Mulai Pendaftaran Anda
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Pilih jalur pendaftaran di bawah ini. Dasbor kesiswaan atau kepelatihan Anda akan aktif setelah diverifikasi oleh tim admin PT Tirya Lumba.
            </p>
          </div>

          <div className="mt-4">
            <BlurredDashboard message="Dasbor jadwal dan presensi aktif setelah verifikasi admin" />
          </div>

          <div className="pt-3 grid gap-3 sm:grid-cols-2">
            <Link href="/daftar/murid" className="block">
              <Button
                variant="primary"
                size="md"
                isFullRounded={false}
                className="w-full flex items-center justify-center gap-2 font-semibold"
              >
                <span>Daftar Sebagai Murid</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/daftar/guru" className="block">
              <Button
                variant="outline"
                size="md"
                isFullRounded={false}
                className="w-full flex items-center justify-center gap-2 font-semibold"
              >
                <span>Daftar Sebagai Pelatih</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

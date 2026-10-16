'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DaftarPortalParent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E0FBFC]/40 via-white to-[#F8F9FA]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-[#0077B6] border border-[#00B4D8]/30 mb-4 shadow-xs">
          <span>🌊</span> Portal Pendaftaran
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0077B6] tracking-tight">
          Pilih Jalur Pendaftaran
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
          Silakan pilih peran pendaftaran yang sesuai dengan kebutuhan Anda di PT Tirya Lumba.
        </p>

        {/* 2 Path Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
          {/* Card 1: Daftar sebagai Murid */}
          <Card
            variant="landing"
            className="p-8 flex flex-col justify-between border-2 border-transparent hover:border-[#00B4D8] group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0FBFC] rounded-bl-full -z-0 opacity-60" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-3xl mb-6 shadow-xs group-hover:scale-110 transition-transform">
                🏊
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-[#0077B6] mb-3">
                Daftar sebagai Murid
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Ikuti kelas kursus renang profesional bersama instruktur bersertifikat. Tersedia program Reguler, Privat, Prestasi, dan Ekstrakurikuler di berbagai kolam mitra.
              </p>
              <ul className="space-y-2 text-xs font-medium text-slate-500 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#00B4D8]">✓</span> Jadwal dan lokasi kolam fleksibel
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00B4D8]">✓</span> Pembayaran QRIS / Transfer / Tunai
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00B4D8]">✓</span> Pantau 8 pertemuan langsung di profil
                </li>
              </ul>
            </div>

            <Link href="/daftar/murid" className="relative z-10">
              <Button
                variant="primary"
                size="md"
                isFullRounded={true}
                className="w-full shadow-md"
              >
                Lanjut Daftar Murid →
              </Button>
            </Link>
          </Card>

          {/* Card 2: Daftar sebagai Pelatih / Guru */}
          <Card
            variant="landing"
            className="p-8 flex flex-col justify-between border-2 border-transparent hover:border-[#0077B6] group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-60" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0077B6] flex items-center justify-center text-3xl mb-6 shadow-xs group-hover:scale-110 transition-transform">
                🎓
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-[#0077B6] mb-3">
                Daftar sebagai Pelatih
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Bergabunglah dengan jaringan pelatih PT Tirya Lumba. Dapatkan kemudahan manajemen jadwal mengajar tanpa perlu bolak-balik fisik mengecek absensi manual.
              </p>
              <ul className="space-y-2 text-xs font-medium text-slate-500 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#0077B6]">✓</span> Pilih lokasi kolam yang Anda sanggupi
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0077B6]">✓</span> Tentukan sesi ketersediaan mengajar
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0077B6]">✓</span> Pengajuan reschedule otomatis & transparan
                </li>
              </ul>
            </div>

            <Link href="/daftar/guru" className="relative z-10">
              <Button
                variant="outline"
                size="md"
                isFullRounded={true}
                className="w-full"
              >
                Lanjut Daftar Pelatih →
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

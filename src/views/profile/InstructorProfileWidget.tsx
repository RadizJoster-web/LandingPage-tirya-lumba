'use client';

import React, { useState } from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

interface InstructorProfileWidgetProps {
  snapshot: StudentRegistrationSnapshot;
}

export const InstructorProfileWidget: React.FC<InstructorProfileWidgetProps> = ({
  snapshot,
}) => {
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  if (!snapshot.instructorName) {
    return null;
  }

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-sky-100 bg-white/95 p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              name={snapshot.instructorName}
              src={snapshot.instructorProfilePictureUrl}
              size="lg"
              className="ring-4 ring-sky-100/70 shrink-0"
            />
            <div className="space-y-1">
              <span className="inline-block rounded-md bg-[#0077B6]/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0077B6]">
                Pelatih Renang Resmi Anda
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#1D3557]">
                {snapshot.instructorName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 line-clamp-1">
                {snapshot.instructorBio ||
                  snapshot.instructorExperience ||
                  'Pelatih renang berlisensi profesional Tirya Lumba.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              isFullRounded={true}
              onClick={() => setShowLicenseModal(true)}
              className="border-sky-300 text-[#0077B6] hover:bg-sky-50 shadow-xs"
            >
              📜 Kualifikasi & Lisensi
            </Button>
          </div>
        </div>
      </section>

      {/* Modal Kualifikasi & Lisensi Pelatih */}
      {showLicenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <Avatar
                  name={snapshot.instructorName}
                  src={snapshot.instructorProfilePictureUrl}
                  size="md"
                />
                <div>
                  <h4 className="font-heading text-lg font-bold text-[#1D3557]">
                    {snapshot.instructorName}
                  </h4>
                  <p className="text-xs text-slate-500">Profil & Lisensi Pelatih</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLicenseModal(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Lisensi & Sertifikasi:
                </span>
                <p className="mt-1 font-semibold text-slate-800 bg-sky-50/60 border border-sky-100 rounded-xl p-3">
                  {snapshot.instructorLicense ||
                    'Sertifikasi Pelatih Renang Tingkat Nasional (Tirya Lumba Certified)'}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Pengalaman Melatih:
                </span>
                <p className="mt-1 text-slate-700 bg-slate-50 border border-slate-100 rounded-xl p-3">
                  {snapshot.instructorExperience ||
                    'Berpengalaman melatih kelas anak-anak, privat, hingga pembinaan atlet.'}
                </p>
              </div>

              {snapshot.instructorBio && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Tentang Pelatih:
                  </span>
                  <p className="mt-1 text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3">
                    {snapshot.instructorBio}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <Button
                type="button"
                variant="primary"
                size="md"
                isFullRounded={true}
                onClick={() => setShowLicenseModal(false)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

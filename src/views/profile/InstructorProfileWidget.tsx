'use client';

import React, { useState } from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Award, Briefcase, FileText } from 'lucide-react';

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
      <section className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-xs dark:bg-slate-900 dark:border-slate-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              name={snapshot.instructorName}
              src={snapshot.instructorProfilePictureUrl}
              size="lg"
              className="ring-2 ring-slate-100 shrink-0"
            />
            <div className="space-y-0.5 min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                Pelatih Renang Resmi Anda
              </span>
              <h3 className="font-heading text-lg font-bold text-[#1D3557] truncate dark:text-slate-100">
                {snapshot.instructorName}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">
                {snapshot.instructorBio ||
                  snapshot.instructorExperience ||
                  'Pelatih renang berlisensi resmi standar PRSI PT Tirya Lumba.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              isFullRounded={false}
              onClick={() => setShowLicenseModal(true)}
              className="border-slate-200 text-[#0077B6] hover:bg-[#E0FBFC]/40"
            >
              Kualifikasi &amp; Lisensi
            </Button>
          </div>
        </div>
      </section>

      {/* Modal Kualifikasi & Lisensi Pelatih */}
      <Modal
        isOpen={showLicenseModal}
        onClose={() => setShowLicenseModal(false)}
        title={snapshot.instructorName}
        description="Profil Kualifikasi &amp; Akreditasi Kepelatihan"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#0077B6]" />
              <span>Lisensi &amp; Sertifikasi</span>
            </div>
            <p className="font-semibold text-[#1D3557] dark:text-slate-100">
              {snapshot.instructorLicense ||
                'Sertifikasi Pelatih Renang Nasional (PRSI Certified)'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-[#0077B6]" />
              <span>Pengalaman Mengajar</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {snapshot.instructorExperience ||
                'Berpengalaman melatih teknik renang dasar anak-anak hingga pembinaan prestasi.'}
            </p>
          </div>

          {snapshot.instructorBio && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                <FileText className="w-3.5 h-3.5 text-[#0077B6]" />
                <span>Biografi Singkat</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                {snapshot.instructorBio}
              </p>
            </div>
          )}

          <div className="pt-3 text-right border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="primary"
              size="sm"
              isFullRounded={false}
              onClick={() => setShowLicenseModal(false)}
            >
              Tutup
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

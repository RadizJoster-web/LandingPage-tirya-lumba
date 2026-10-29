import React from 'react';
import { AvailableInstructor } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Award, Briefcase, BookOpen } from 'lucide-react';

interface CoachDetailModalProps {
  coach: AvailableInstructor | null;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export const CoachDetailModal: React.FC<CoachDetailModalProps> = ({
  coach,
  onClose,
  onSelect,
}) => {
  if (!coach) return null;
  const avatar = mediaUrl(coach.profilePictureUrl);

  return (
    <Modal
      isOpen={Boolean(coach)}
      onClose={onClose}
      title="Detail Profil Instruktur"
      description="Kualifikasi profesional dan sertifikasi kepelatihan resmi"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={coach.fullName}
              className="w-14 h-14 rounded-full object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#0077B6] text-white flex items-center justify-center text-lg font-bold shrink-0">
              {coach.fullName.trim().charAt(0).toUpperCase() || 'P'}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-heading font-bold text-base text-[#1D3557] dark:text-slate-100 truncate">
              {coach.fullName}
            </h4>
            <p className="text-xs text-[#0077B6] font-medium mt-0.5">
              {coach.license || 'Pelatih Berlisensi PRSI'}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>
                Kapasitas: {coach.currentStudentCount ?? coach.currentSlots ?? 0} / {coach.maxCapacity ?? 5} murid aktif
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1 font-semibold uppercase text-[10px] tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#0077B6]" />
              <span>Lisensi &amp; Sertifikasi</span>
            </div>
            <p className="font-medium text-[#1D3557] dark:text-slate-200">
              {coach.license || 'Sertifikasi Pelatih Renang Standar Tirya Lumba'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1 font-semibold uppercase text-[10px] tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-[#0077B6]" />
              <span>Pengalaman Mengajar</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {coach.experience || 'Berpengalaman mendampingi teknik renang pemula hingga perenang berprestasi.'}
            </p>
          </div>

          {coach.shortBio && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-[#0077B6]" />
                <span>Biografi &amp; Filosofi</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                {coach.shortBio}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button
            type="button"
            variant="outline"
            size="sm"
            isFullRounded={false}
            onClick={onClose}
          >
            Tutup
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            isFullRounded={false}
            onClick={() => {
              onSelect(coach.instructorId);
              onClose();
            }}
          >
            Pilih Pelatih Ini
          </Button>
        </div>
      </div>
    </Modal>
  );
};

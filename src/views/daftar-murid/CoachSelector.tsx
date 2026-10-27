import React, { useState, useEffect } from 'react';
import { AvailableInstructor } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Check, Info, Award, Briefcase, BookOpen } from 'lucide-react';

interface CoachSelectorProps {
  sessionReady: boolean;
  availableCoaches: AvailableInstructor[];
  isLoading: boolean;
  coachId: string;
  setCoachId: (id: string) => void;
}

export const CoachSelector: React.FC<CoachSelectorProps> = ({
  sessionReady,
  availableCoaches,
  isLoading,
  coachId,
  setCoachId,
}) => {
  const [activeCoachDetail, setActiveCoachDetail] = useState<AvailableInstructor | null>(null);

  const modalAvatar = activeCoachDetail
    ? mediaUrl(activeCoachDetail.profilePictureUrl)
    : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Pilih Guru / Pelatih Renang *
        </label>
        {sessionReady && !isLoading && availableCoaches.length > 0 && (
          <span className="text-[11px] text-slate-400">
            {availableCoaches.length} pelatih tersedia
          </span>
        )}
      </div>

      {!sessionReady ? (
        <p className="text-xs text-slate-400 italic bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 dark:bg-slate-900 dark:border-slate-800">
          Tentukan kolam, tanggal, dan sesi jam latihan terlebih dahulu untuk memfilter pelatih yang bertugas.
        </p>
      ) : isLoading ? (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5 text-xs text-slate-500">
          <span className="w-4 h-4 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
          <span>Memeriksa ketersediaan kuota pelatih...</span>
        </div>
      ) : availableCoaches.length === 0 ? (
        <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-xs font-medium text-amber-800">
          Belum ada pelatih yang tersedia pada sesi dan lokasi ini (kuota penuh atau jadwal terisi). Silakan pilih sesi atau kolam lain.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-0.5">
          {availableCoaches.map((coach) => {
            const avatar = mediaUrl(coach.profilePictureUrl);
            const remaining = Math.max(0, coach.maxCapacity - coach.currentStudentCount);
            const selected = coachId === coach.instructorId;
            const initial = coach.fullName.trim().charAt(0).toUpperCase() || 'P';

            return (
              <div
                key={coach.instructorId}
                onClick={() => setCoachId(coach.instructorId)}
                className={`flex items-center justify-between gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selected
                    ? 'bg-[#E0FBFC]/30 border-[#00B4D8] shadow-xs'
                    : 'bg-white border-gray-200 hover:border-[#00B4D8]/50 dark:bg-slate-900 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatar}
                      alt={coach.fullName}
                      className="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-200"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#0077B6] text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {initial}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-bold text-sm text-[#1D3557] truncate dark:text-slate-100">
                      {coach.fullName}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {coach.license || 'Pelatih Berlisensi'}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          remaining > 0
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        }`}
                      >
                        {remaining > 0 ? `Sisa ${remaining} Kuota` : 'Penuh'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveCoachDetail(coach);
                    }}
                    className="p-1.5 text-slate-400 hover:text-[#0077B6] hover:bg-slate-100 rounded-lg transition-colors dark:hover:bg-slate-800"
                    title="Lihat Detail Profil Pelatih"
                    aria-label={`Detail pelatih ${coach.fullName}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      selected
                        ? 'bg-[#00B4D8] border-[#00B4D8] text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Profil Pelatih Modal */}
      <Modal
        isOpen={Boolean(activeCoachDetail)}
        onClose={() => setActiveCoachDetail(null)}
        title="Detail Profil Instruktur"
        description="Kualifikasi profesional dan sertifikasi kepelatihan resmi"
      >
        {activeCoachDetail && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              {modalAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={modalAvatar}
                  alt={activeCoachDetail.fullName}
                  className="w-14 h-14 rounded-full object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#0077B6] text-white flex items-center justify-center text-lg font-bold shrink-0">
                  {activeCoachDetail.fullName.trim().charAt(0).toUpperCase() || 'P'}
                </div>
              )}
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-base text-[#1D3557] dark:text-slate-100 truncate">
                  {activeCoachDetail.fullName}
                </h4>
                <p className="text-xs text-[#0077B6] font-medium mt-0.5">
                  {activeCoachDetail.license || 'Pelatih Berlisensi PRSI'}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>
                    Kapasitas: {activeCoachDetail.currentStudentCount} / {activeCoachDetail.maxCapacity} murid aktif
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
                  {activeCoachDetail.license || 'Sertifikasi Pelatih Renang Standar Tirya Lumba'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/60">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                  <Briefcase className="w-3.5 h-3.5 text-[#0077B6]" />
                  <span>Pengalaman Mengajar</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {activeCoachDetail.experience || 'Berpengalaman mendampingi teknik renang pemula hingga perenang berprestasi.'}
                </p>
              </div>

              {activeCoachDetail.shortBio && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1 font-semibold uppercase text-[10px] tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-[#0077B6]" />
                    <span>Biografi &amp; Filosofi</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                    {activeCoachDetail.shortBio}
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
                onClick={() => setActiveCoachDetail(null)}
              >
                Tutup
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                isFullRounded={false}
                onClick={() => {
                  setCoachId(activeCoachDetail.instructorId);
                  setActiveCoachDetail(null);
                }}
              >
                Pilih Pelatih Ini
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

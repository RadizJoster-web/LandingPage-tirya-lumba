import React, { useState, useEffect } from 'react';
import { AvailableInstructor } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CoachSelectorProps {
  sessionReady: boolean;
  availableCoaches: AvailableInstructor[];
  isLoading: boolean;
  coachId: string;
  setCoachId: (id: string) => void;
}

/** Daftar guru aktif dari GET /api/instructor/available, lengkap dengan sisa kapasitas kelas dan tombol modal detail. */
export const CoachSelector: React.FC<CoachSelectorProps> = ({
  sessionReady,
  availableCoaches,
  isLoading,
  coachId,
  setCoachId,
}) => {
  const [activeCoachDetail, setActiveCoachDetail] = useState<AvailableInstructor | null>(null);

  // Tutup modal jika tombol Escape ditekan
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCoachDetail(null);
    };
    if (activeCoachDetail) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCoachDetail]);

  const modalAvatar = activeCoachDetail
    ? mediaUrl(activeCoachDetail.profilePictureUrl)
    : null;

  return (
    <div>
      <label className="block text-sm font-semibold text-[#1D3557] mb-2">
        Pilih Guru / Pelatih Renang Tersedia *
      </label>

      {!sessionReady ? (
        <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
          Silakan tentukan kolam, tanggal, dan sesi pertemuan terlebih dahulu untuk memfilter pelatih yang bertugas.
        </p>
      ) : isLoading ? (
        <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
          Memuat pelatih tersedia…
        </p>
      ) : availableCoaches.length === 0 ? (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-800">
          ⚠️ Belum ada guru yang tersedia di kolam ini pada sesi tersebut. Silakan pilih sesi atau kolam lain.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-1">
          {availableCoaches.map((coach) => {
            const avatar = mediaUrl(coach.profilePictureUrl);
            const remaining = Math.max(0, coach.maxCapacity - coach.currentStudentCount);
            const selected = coachId === coach.instructorId;

            return (
              <div
                key={coach.instructorId}
                onClick={() => setCoachId(coach.instructorId)}
                className={`flex items-center justify-between gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                  selected
                    ? 'bg-[#E0FBFC] border-[#00B4D8] ring-1 ring-[#00B4D8]'
                    : 'bg-white border-gray-200 hover:border-[#00B4D8]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <input
                    type="radio"
                    name="coach"
                    className="sr-only"
                    checked={selected}
                    onChange={() => setCoachId(coach.instructorId)}
                  />
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element -- URL dinamis dari server.
                    <img
                      src={avatar}
                      alt={`Foto ${coach.fullName}`}
                      className="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-200"
                    />
                  ) : (
                    <span className="w-11 h-11 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-xl shrink-0">
                      🏊‍♂️
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-[#1D3557] truncate">
                      {coach.fullName}
                    </span>
                    <span className="block text-[11px] text-slate-500 truncate">
                      {coach.license || 'Pelatih Tirya Lumba'}
                      {coach.experience ? ` • ${coach.experience}` : ''}
                    </span>
                    <span
                      className={`block text-[11px] font-semibold ${
                        remaining > 0 ? 'text-emerald-600' : 'text-[#FF6F59]'
                      }`}
                    >
                      {remaining > 0
                        ? `Sisa ${remaining} dari ${coach.maxCapacity} kuota`
                        : 'Kuota kelas penuh'}
                    </span>
                  </div>
                </div>

                {/* Tombol Info Pop-up */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveCoachDetail(coach);
                  }}
                  className="shrink-0 p-2 text-slate-400 hover:text-[#0077B6] hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                  title="Lihat Detail Profil Pelatih"
                  aria-label={`Detail pelatih ${coach.fullName}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Pop-up Detail Pelatih (Tanpa Informasi Pribadi: No Phone, No Email, No Address) */}
      {activeCoachDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setActiveCoachDetail(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol X Tutup */}
            <button
              type="button"
              onClick={() => setActiveCoachDetail(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Tutup popup"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header Profil */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              {modalAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={modalAvatar}
                  alt={`Foto ${activeCoachDetail.fullName}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#00B4D8] shadow-sm shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-3xl shrink-0 border-2 border-[#00B4D8]">
                  🏊‍♂️
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-heading text-lg font-bold text-[#1D3557] truncate">
                  {activeCoachDetail.fullName}
                </h3>
                <p className="text-xs font-semibold text-[#0077B6]">
                  {activeCoachDetail.license || 'Pelatih Berlisensi Resmi'}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span>
                    Sisa {Math.max(0, activeCoachDetail.maxCapacity - activeCoachDetail.currentStudentCount)} dari{' '}
                    {activeCoachDetail.maxCapacity} kuota sesi
                  </span>
                </div>
              </div>
            </div>

            {/* Detail Informasi Profesional (Hanya Pengalaman, Lisensi, & Bio) */}
            <div className="py-4 space-y-3.5 text-sm">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Lisensi & Sertifikasi
                </span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium">
                  {activeCoachDetail.license || 'Sertifikasi Pelatih Renang Tirya Lumba'}
                </p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Pengalaman Mengajar
                </span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm">
                  {activeCoachDetail.experience || 'Berpengalaman dalam membimbing teknik renang berbagai usia.'}
                </p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Tentang Pelatih
                </span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {activeCoachDetail.shortBio ||
                    'Pelatih aktif Tirya Lumba yang berdedikasi mengajarkan keterampilan renang mulai dari pemula hingga mahir dengan mengutamakan kenyamanan, teknik pernapasan yang tepat, dan keselamatan di dalam air.'}
                </p>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setActiveCoachDetail(null)}
              >
                Tutup
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => {
                  setCoachId(activeCoachDetail.instructorId);
                  setActiveCoachDetail(null);
                }}
              >
                Pilih Pelatih Ini
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

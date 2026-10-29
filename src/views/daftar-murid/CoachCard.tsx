import React from 'react';
import { AvailableInstructor } from '@/types';
import { mediaUrl } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Check, Info } from 'lucide-react';

interface CoachCardProps {
  coach: AvailableInstructor;
  selected: boolean;
  onSelect: (id: string) => void;
  onDetail: (coach: AvailableInstructor) => void;
}

export const CoachCard: React.FC<CoachCardProps> = ({
  coach,
  selected,
  onSelect,
  onDetail,
}) => {
  const avatar = mediaUrl(coach.profilePictureUrl);
  const coachId = coach.instructorId || coach.id || '';
  const currentCount = coach.currentStudentCount ?? coach.currentSlots ?? 0;
  const maxCap = coach.maxCapacity ?? 5;
  const remaining =
    typeof coach.remainingSlots === 'number'
      ? coach.remainingSlots
      : Math.max(0, maxCap - currentCount);
  const isFull = remaining <= 0;
  const initial = coach.fullName.trim().charAt(0).toUpperCase() || 'P';

  return (
    <div
      onClick={() => {
        if (!isFull) onSelect(coachId);
      }}
      className={`flex items-center justify-between gap-3 p-3.5 border-2 rounded-xl transition-all duration-200 ${
        isFull
          ? 'opacity-60 cursor-not-allowed bg-slate-50 border-gray-200 dark:bg-slate-900 dark:border-slate-800'
          : selected
          ? 'bg-[#E0FBFC]/30 border-[#00B4D8] shadow-xs cursor-pointer'
          : 'bg-white border-gray-200 hover:border-[#00B4D8]/50 cursor-pointer dark:bg-slate-900 dark:border-slate-800'
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
              {remaining > 0 ? `Sisa ${remaining} slot` : 'Penuh'}
            </span>
            <span className="text-[10px] text-slate-400">
              ({currentCount}/{maxCap})
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDetail(coach);
          }}
          className="p-1.5 text-slate-400 hover:text-[#0077B6] hover:bg-slate-100 rounded-lg transition-colors"
          title="Lihat profil dan sertifikasi"
        >
          <Info className="w-4 h-4" />
        </button>
        {selected ? (
          <div className="w-6 h-6 rounded-full bg-[#00B4D8] text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
        ) : (
          <Badge variant="outline" className="text-[10px]">Pilih</Badge>
        )}
      </div>
    </div>
  );
};

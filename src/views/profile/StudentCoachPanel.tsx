import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StudentRegistrationSnapshot } from '@/types';

interface StudentCoachPanelProps {
  snapshot: StudentRegistrationSnapshot;
}

export const StudentCoachPanel: React.FC<StudentCoachPanelProps> = ({ snapshot }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!snapshot.instructorName) return null;

  return (
    <div className="pt-2 border-t border-gray-100 dark:border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="block text-[11px] font-medium text-slate-400">Pelatih Renang</span>
          <span className="text-sm font-semibold text-[#1D3557] dark:text-slate-100">
            {snapshot.instructorName}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0077B6] hover:text-[#00B4D8] transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <span>{isOpen ? 'Tutup profil pelatih' : 'Lihat profil pelatih'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="rounded-xl border border-gray-200 bg-slate-50/70 p-4 space-y-3 dark:bg-slate-800/60 dark:border-slate-700 anim-enter">
          <div className="flex items-center gap-3">
            <Avatar
              name={snapshot.instructorName}
              src={snapshot.instructorProfilePictureUrl}
              size="md"
              className="w-12 h-12 rounded-full ring-2 ring-white shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#1D3557] dark:text-slate-100">
                  {snapshot.instructorName}
                </h4>
                <Badge variant="azure" size="sm" className="text-[10px] font-semibold py-0.5">
                  PRSI Verified
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {snapshot.instructorLicense || 'Sertifikasi Pelatih Resmi PRSI'}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-1 border-t border-slate-200/60 dark:border-slate-700">
            <p>
              <strong className="text-slate-700 dark:text-slate-200 font-semibold">Pengalaman: </strong>
              {snapshot.instructorExperience || 'Pelatih renang berpengalaman melatih teknik renang dasar & prestasi.'}
            </p>
            {snapshot.instructorBio && (
              <p className="italic text-slate-500 dark:text-slate-400">
                "{snapshot.instructorBio}"
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

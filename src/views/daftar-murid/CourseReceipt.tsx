import React from 'react';
import { formatDateId, formatRupiah } from '@/lib/utils';

interface CourseReceiptProps {
  name: string;
  locationName: string;
  packageType: string;
  instructorName: string;
  firstMeetDate: string;
  sessionName: string;
  packagePrice: number;
}

export const CourseReceipt: React.FC<CourseReceiptProps> = ({
  name,
  locationName,
  packageType,
  instructorName,
  firstMeetDate,
  sessionName,
  packagePrice,
}) => {
  return (
    <div className="p-5 bg-[#E0FBFC]/60 rounded-2xl border border-[#00B4D8]/30 space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-[#00B4D8]/20">
        <h3 className="font-heading font-extrabold text-base text-[#0077B6]">
          Rincian Nota Kursus
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-full border border-[#00B4D8]/40 text-[#0077B6]">
          {packageType || 'Paket Les'}
        </span>
      </div>

      <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
        <div className="flex justify-between gap-4">
          <span>Nama Murid</span>
          <span className="font-semibold text-right">{name}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Kolam Renang</span>
          <span className="font-semibold text-right">{locationName || '-'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Guru / Pelatih</span>
          <span className="font-semibold text-right">{instructorName || '-'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Pertemuan Pertama</span>
          <span className="font-semibold text-right">
            {firstMeetDate ? formatDateId(firstMeetDate) : '-'}
            {sessionName ? ` • ${sessionName}` : ''}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-[#00B4D8]/20 flex items-center justify-between">
        <span className="font-heading font-bold text-sm text-[#1D3557]">
          Total Pembayaran
        </span>
        <span className="font-heading font-extrabold text-xl text-[#0077B6]">
          {formatRupiah(packagePrice)}
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { formatDateId, formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Receipt } from 'lucide-react';

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
  const adminFee = 5000;
  const totalPayment = (packagePrice || 0) + adminFee;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-blue-950/5 p-6 space-y-4 dark:bg-slate-900 dark:border-slate-800">
      {/* Top Invoice Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-dashed border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-[#1D3557] dark:text-slate-100">
              Rincian Nota Pendaftaran
            </h3>
            <span className="text-[11px] text-slate-400">Invoice Digital Resmi</span>
          </div>
        </div>
        <Badge variant="azure" size="sm">
          {packageType || 'Paket Kursus'}
        </Badge>
      </div>

      {/* Clear Key-Value Alignment */}
      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Nama Murid</span>
          <span className="font-semibold text-[#1D3557] text-right dark:text-slate-200">{name || '–'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Kolam Renang</span>
          <span className="font-semibold text-[#1D3557] text-right dark:text-slate-200">{locationName || '–'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Pelatih Renang</span>
          <span className="font-semibold text-[#1D3557] text-right dark:text-slate-200">{instructorName || '–'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Pertemuan Pertama</span>
          <span className="font-semibold text-[#1D3557] text-right dark:text-slate-200">
            {firstMeetDate ? formatDateId(firstMeetDate) : '–'}
            {sessionName ? ` • ${sessionName}` : ''}
          </span>
        </div>
      </div>

      {/* Dashed divider */}
      <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-3 space-y-1.5 text-xs sm:text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Biaya Kursus</span>
          <span className="font-medium tabular-nums">{formatRupiah(packagePrice)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Biaya Administrasi Sistem</span>
          <span className="font-medium tabular-nums">{formatRupiah(adminFee)}</span>
        </div>
      </div>

      {/* Total Payment in bold Plus Jakarta Sans */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="font-heading font-bold text-sm text-[#1D3557] dark:text-slate-100">
          Total Pembayaran
        </span>
        <span className="font-heading font-extrabold text-xl text-[#0077B6] tabular-nums">
          {formatRupiah(totalPayment)}
        </span>
      </div>
    </div>
  );
};

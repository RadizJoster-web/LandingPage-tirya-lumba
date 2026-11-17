import React from 'react';
import { StudentRegistrationSnapshot } from '@/types';

interface StudentPersonalDataCardProps {
  snapshot: StudentRegistrationSnapshot;
  email: string;
}

const PAYMENT_LABEL: Record<string, string> = {
  BANK_TRANSFER: 'Transfer Bank',
  CASH: 'Tunai di Kolam',
  QRIS: 'QRIS Digital',
};

export const StudentPersonalDataCard: React.FC<StudentPersonalDataCardProps> = ({
  snapshot,
  email,
}) => {
  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
      <h2 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
        Data Diri
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <span className="block text-[11px] font-medium text-slate-400">Nama Lengkap</span>
          <span className="font-semibold text-[#1D3557] dark:text-slate-200 text-sm mt-0.5 block">
            {snapshot.fullName || '–'}
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-slate-400">Email Akun</span>
          <span className="font-semibold text-[#1D3557] dark:text-slate-200 text-sm mt-0.5 block font-mono">
            {email}
          </span>
        </div>
        {snapshot.phone && (
          <div>
            <span className="block text-[11px] font-medium text-slate-400">Nomor WhatsApp</span>
            <span className="font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5 block">
              {snapshot.phone}
            </span>
          </div>
        )}
        {snapshot.schoolOrOffice && (
          <div>
            <span className="block text-[11px] font-medium text-slate-400">Asal Sekolah / Kantor</span>
            <span className="font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5 block">
              {snapshot.schoolOrOffice}
            </span>
          </div>
        )}
        {snapshot.tshirtSize && (
          <div>
            <span className="block text-[11px] font-medium text-slate-400">Ukuran Kaos</span>
            <span className="font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5 block">
              {snapshot.tshirtSize}
            </span>
          </div>
        )}
        {snapshot.paymentMethod && (
          <div>
            <span className="block text-[11px] font-medium text-slate-400">Metode Pembayaran</span>
            <span className="font-semibold text-[#1D3557] dark:text-slate-200 mt-0.5 block">
              {PAYMENT_LABEL[snapshot.paymentMethod] || snapshot.paymentMethod}
            </span>
          </div>
        )}

        {snapshot.address && (
          <div className="sm:col-span-2 pt-1 border-t border-gray-100 dark:border-slate-800">
            <span className="block text-[11px] font-medium text-slate-400">Domisili Tempat Tinggal</span>
            <span className="font-medium text-slate-600 dark:text-slate-300 mt-0.5 block leading-relaxed">
              {snapshot.address}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

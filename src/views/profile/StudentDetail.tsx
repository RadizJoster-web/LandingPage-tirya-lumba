import React from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { DetailField } from './DetailField';

const PAYMENT_LABEL: Record<string, string> = {
  BANK_TRANSFER: 'Transfer Bank',
  CASH: 'Tunai di Kolam',
  QRIS: 'QRIS Digital',
};

export const StudentDetail: React.FC<{ snapshot: StudentRegistrationSnapshot }> = ({
  snapshot,
}) => {
  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800">
      <div className="mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
          Data Kesiswaan &amp; Registrasi
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Rincian identitas murid dan detail administrasi resmi
        </p>
      </div>

      {/* Consolidated single-view key-value grid (Zero Repeated Labels) */}
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <DetailField
          label="Paket Kursus"
          value={snapshot.packageType || 'Reguler'}
        />
        <DetailField
          label="Sekolah / Kantor"
          value={snapshot.schoolOrOffice || '–'}
        />
        <DetailField
          label="Ukuran T-Shirt"
          value={snapshot.tshirtSize || '–'}
        />
        <DetailField
          label="Alamat Domisili"
          value={snapshot.address || '–'}
        />
        <DetailField
          label="Metode Pembayaran"
          value={PAYMENT_LABEL[snapshot.paymentMethod] ?? snapshot.paymentMethod}
        />
        <DetailField
          label="Biaya Paket"
          value={formatRupiah(snapshot.packagePrice)}
        />
      </dl>
    </section>
  );
};

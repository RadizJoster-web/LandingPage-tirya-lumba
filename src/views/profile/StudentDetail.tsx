import React from 'react';
import { StudentRegistrationSnapshot } from '@/types';
import { formatDateId, formatRupiah } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { DetailField } from './DetailField';

const PAYMENT_LABEL: Record<string, string> = {
  BANK_TRANSFER: 'Transfer Bank',
  CASH: 'Tunai',
  QRIS: 'QRIS',
};

export const StudentDetail: React.FC<{ snapshot: StudentRegistrationSnapshot }> = ({
  snapshot,
}) => {
  return (
    <section className="rounded-3xl bg-white/85 p-6 ring-1 ring-slate-100 sm:p-8">
      <div className="flex items-center gap-4">
        <Avatar name={snapshot.fullName} src={snapshot.profilePictureUrl} size="lg" />
        <div>
          <h2 className="font-heading text-lg font-extrabold text-[#1D3557]">
            Data Pendaftaran Kelas
          </h2>
          <p className="text-xs text-slate-500">
            Status kelas aktif setelah admin menyetujui pendaftaran ini.
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <DetailField label="Kolam Renang" value={snapshot.locationLabel || '-'} />
        <DetailField label="Paket Kelas" value={snapshot.packageType || '-'} />
        <DetailField label="Guru / Pelatih" value={snapshot.instructorName || '-'} />
        <DetailField
          label="Pertemuan Pertama"
          value={`${formatDateId(snapshot.firstMeetDate)} • ${snapshot.firstMeetSession}`}
        />
        <DetailField
          label="Metode Pembayaran"
          value={PAYMENT_LABEL[snapshot.paymentMethod] ?? snapshot.paymentMethod}
        />
        <DetailField label="Total" value={formatRupiah(snapshot.packagePrice)} />
        <DetailField label="Ukuran T-Shirt" value={snapshot.tshirtSize} />
        <DetailField label="Domisili" value={snapshot.address} />
        <DetailField label="Sekolah / Kantor" value={snapshot.schoolOrOffice} />
      </dl>
    </section>
  );
};

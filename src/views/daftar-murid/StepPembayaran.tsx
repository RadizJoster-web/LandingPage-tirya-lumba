import React from 'react';
import { MuridStep3Props } from './types';
import { PaymentMethod } from '@/types';
import { formatDateId, formatRupiah } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { PaymentDetails } from './PaymentDetails';

const PAYMENT_OPTIONS: PaymentMethod[] = ['QRIS', 'Transfer Bank', 'Cash'];

export const StepPembayaran: React.FC<MuridStep3Props> = ({
  name,
  locationName,
  packageType,
  instructorName,
  firstMeetDate,
  sessionName,
  packagePrice,
  paymentMethod,
  setPaymentMethod,
  paymentProofName,
  onPaymentProofChange,
  isSubmitting,
  errorMsg,
  onSubmit,
  onBack,
}) => {
  const needsProofLabel = paymentMethod === 'Cash'
    ? 'Unggah Foto Dokumentasi Pembayaran Tunai * (JPG/PNG maks 5 MB)'
    : 'Unggah Bukti Pembayaran * (JPG/PNG maks 5 MB)';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Nota Invoice — seluruh angka berasal dari paket resmi di server */}
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

      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-2">
          Metode Pembayaran *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PAYMENT_OPTIONS.map((method) => (
            <label
              key={method}
              className={`flex items-center justify-center py-2.5 px-3 border rounded-xl text-sm font-bold cursor-pointer transition-all text-center ${
                paymentMethod === method
                  ? 'bg-[#00B4D8] text-white border-[#00B4D8] shadow-xs'
                  : 'bg-white text-slate-700 border-gray-200 hover:border-[#00B4D8]'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                className="sr-only"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      <PaymentDetails method={paymentMethod} />

      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          {needsProofLabel}
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => onPaymentProofChange(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-slate-600 border border-gray-300 rounded-lg px-3 py-2 bg-white file:mr-3 file:px-3 file:py-1.5 file:rounded-full file:border-0 file:bg-[#E0FBFC] file:text-[#0077B6] file:font-semibold file:cursor-pointer"
        />
        {paymentProofName && (
          <p className="text-xs text-emerald-600 font-semibold mt-1.5">
            ✓ {paymentProofName}
          </p>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#FF6F59]">
          {errorMsg}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button type="button" variant="outline" size="md" onClick={onBack} disabled={isSubmitting}>
          ← Kembali
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="flex-1 sm:flex-none"
          isLoading={isSubmitting}
        >
          Kirim Pendaftaran
        </Button>
      </div>
    </form>
  );
};

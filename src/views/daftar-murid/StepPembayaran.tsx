import React from 'react';
import { MuridStep3Props } from './types';
import { PaymentMethod } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { PaymentDetails } from './PaymentDetails';

export const StepPembayaran: React.FC<MuridStep3Props> = ({
  name,
  selectedPool,
  coachName,
  classType,
  coursePrice,
  adminFee,
  grandTotal,
  paymentMethod,
  setPaymentMethod,
  paymentProofFile,
  setPaymentProofFile,
  isSubmitting,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Nota Invoice */}
      <div className="p-5 bg-[#E0FBFC]/60 rounded-2xl border border-[#00B4D8]/30 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-[#00B4D8]/20">
          <h3 className="font-heading font-extrabold text-base text-[#0077B6]">
            Rincian Nota Kursus
          </h3>
          <span className="text-xs font-semibold text-[#0077B6] bg-white px-2.5 py-1 rounded-full">
            Paket 8 Sesi
          </span>
        </div>

        <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-500">Nama Murid:</span>
            <span className="font-semibold text-[#1D3557]">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Lokasi Kolam:</span>
            <span className="font-semibold text-[#1D3557]">{selectedPool.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Pelatih Dipilih:</span>
            <span className="font-semibold text-[#1D3557]">{coachName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Program & Sesi:</span>
            <span className="font-semibold text-[#1D3557]">Kelas {classType} (8 Pertemuan)</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#00B4D8]/20">
            <span className="text-slate-500">Biaya Kursus:</span>
            <span className="font-semibold text-[#1D3557]">{formatRupiah(coursePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Biaya Administrasi:</span>
            <span className="font-semibold text-[#1D3557]">{formatRupiah(adminFee)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t-2 border-[#0077B6]/30 text-sm sm:text-base font-extrabold text-[#0077B6]">
            <span>Total Pembayaran:</span>
            <span>{formatRupiah(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-2">
          Pilih Metode Pembayaran *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['QRIS', 'Transfer Bank', 'Cash'] as PaymentMethod[]).map((method) => (
            <label
              key={method}
              className={`flex flex-col items-center justify-center p-3.5 border rounded-xl cursor-pointer text-center transition-all ${
                paymentMethod === method
                  ? 'border-[#00B4D8] bg-[#E0FBFC]/50 shadow-xs'
                  : 'border-gray-200 bg-white hover:border-[#00B4D8]'
              }`}
            >
              <input
                type="radio"
                name="method"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="sr-only"
              />
              <span className="text-2xl mb-1">
                {method === 'QRIS' ? '📱' : method === 'Transfer Bank' ? '🏦' : '💵'}
              </span>
              <span className="text-xs font-bold text-[#1D3557]">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <PaymentDetails method={paymentMethod} />

      {/* Upload Proof */}
      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-1.5">
          Upload Bukti Pembayaran / Foto Dokumentasi Tunai *
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setPaymentProofFile(e.target.files?.[0] || null)}
          required
          className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#E0FBFC] file:text-[#0077B6] hover:file:bg-[#00B4D8] hover:file:text-white file:cursor-pointer border border-gray-300 rounded-lg p-1.5"
        />
        {paymentProofFile && (
          <p className="text-xs text-emerald-600 mt-1">
            ✓ File siap dikirim: {paymentProofFile.name}
          </p>
        )}
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          isFullRounded={true}
          onClick={onBack}
          disabled={isSubmitting}
        >
          ← Kembali
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={true}
          className="min-w-[160px] shadow-lg"
          isLoading={isSubmitting}
        >
          Bayar Sekarang →
        </Button>
      </div>
    </form>
  );
};

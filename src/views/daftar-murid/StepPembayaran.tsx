import React, { useRef, useState } from 'react';
import { MuridStep3Props } from './types';
import { PaymentMethod } from '@/types';
import { Button } from '@/components/ui/Button';
import { PaymentDetails } from './PaymentDetails';
import { CourseReceipt } from './CourseReceipt';
import { ArrowLeft, ArrowRight, UploadCloud, CheckCircle2, QrCode, CreditCard, Banknote } from 'lucide-react';

const PAYMENT_OPTIONS: Array<{ method: PaymentMethod; label: string; icon: React.ReactNode }> = [
  { method: 'QRIS', label: 'QRIS Digital', icon: <QrCode className="w-4 h-4" /> },
  { method: 'Transfer Bank', label: 'Transfer Bank', icon: <CreditCard className="w-4 h-4" /> },
  { method: 'Cash', label: 'Tunai di Kolam', icon: <Banknote className="w-4 h-4" /> },
];

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const needsProofLabel =
    paymentMethod === 'Cash'
      ? 'Unggah Foto Dokumentasi Penyerahan Tunai *'
      : 'Unggah Bukti Transfer / Pembayaran *';

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) onPaymentProofChange(file);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 animate-fade-in">
      <CourseReceipt
        name={name}
        locationName={locationName}
        packageType={packageType}
        instructorName={instructorName}
        firstMeetDate={firstMeetDate}
        sessionName={sessionName}
        packagePrice={packagePrice}
      />

      {/* Modern Tabbed / Radio Cards for Payment Method */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Pilih Metode Pembayaran *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PAYMENT_OPTIONS.map(({ method, label, icon }) => {
            const isSelected = paymentMethod === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`flex items-center justify-center gap-2 py-3 px-3.5 border-2 rounded-xl text-xs font-bold transition-all text-center ${
                  isSelected
                    ? 'bg-[#E0FBFC] text-[#0077B6] border-[#00B4D8] shadow-xs'
                    : 'bg-white text-slate-600 border-gray-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <PaymentDetails method={paymentMethod} />

      {/* Modern File Dropzone for Payment Proof */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          {needsProofLabel} (JPG / PNG maks 5 MB)
        </label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#00B4D8] bg-[#E0FBFC]/30'
              : paymentProofName
                ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800'
                : 'border-slate-200 hover:border-[#00B4D8] bg-slate-50/50 hover:bg-[#E0FBFC]/10 dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => onPaymentProofChange(e.target.files?.[0] ?? null)}
            className="hidden"
          />
          {paymentProofName ? (
            <div className="flex flex-col items-center justify-center gap-1.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                {paymentProofName}
              </p>
              <p className="text-[11px] text-slate-400">Klik untuk mengganti bukti pembayaran</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
              <UploadCloud className="w-7 h-7 text-[#0077B6]" />
              <p className="text-xs font-semibold text-[#1D3557] dark:text-slate-200">
                Tarik &amp; lepas file struk ke sini, atau <span className="text-[#0077B6] underline">pilih file</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Foto struk transfer ATM, tangkapan layar m-banking, atau foto serah terima tunai
              </p>
            </div>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-xs font-medium text-rose-700">
          {errorMsg}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          size="md"
          isFullRounded={false}
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={false}
          className="font-semibold flex items-center gap-2 shadow-sm hover:shadow-md"
          isLoading={isSubmitting}
        >
          <span>Konfirmasi &amp; Bayar</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

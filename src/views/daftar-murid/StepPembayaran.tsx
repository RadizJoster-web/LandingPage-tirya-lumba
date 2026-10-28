import React from 'react';
import { MuridStep3Props } from './types';
import { Button } from '@/components/ui/Button';
import { PaymentDetails } from './PaymentDetails';
import { CourseReceipt } from './CourseReceipt';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { PaymentProofUploader } from './PaymentProofUploader';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
  const needsProofLabel =
    paymentMethod === 'Cash'
      ? 'Unggah Foto Dokumentasi Penyerahan Tunai *'
      : 'Unggah Bukti Transfer / Pembayaran *';

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

      <PaymentMethodSelector
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <PaymentDetails method={paymentMethod} />

      <PaymentProofUploader
        label={needsProofLabel}
        paymentProofName={paymentProofName}
        onPaymentProofChange={onPaymentProofChange}
      />

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

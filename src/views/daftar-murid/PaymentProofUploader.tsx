import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

interface PaymentProofUploaderProps {
  label: string;
  paymentProofName?: string;
  onPaymentProofChange: (file: File | null) => void;
}

export const PaymentProofUploader: React.FC<PaymentProofUploaderProps> = ({
  label,
  paymentProofName,
  onPaymentProofChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        {label} (JPG / PNG maks 5 MB)
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
  );
};

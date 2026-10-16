import React from 'react';

interface StepIndicatorProps {
  step: number;
  totalSteps?: number;
  labels?: string[];
  errorMsg?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  step,
  totalSteps = 3,
  labels = ['Biodata', 'Kelas & Jadwal', 'Pembayaran'],
  errorMsg,
}) => {
  return (
    <>
      <div className="flex items-center gap-2 mt-6">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              step >= i + 1 ? 'bg-[#00B4D8]' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-slate-400 font-semibold mt-2 text-right">
        Langkah {step} dari {totalSteps}: {labels[step - 1] || ''}
      </p>
      {errorMsg && (
        <div className="mt-6 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#FF6F59]">
          {errorMsg}
        </div>
      )}
    </>
  );
};

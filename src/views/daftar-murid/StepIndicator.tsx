import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface StepIndicatorProps {
  step: number;
  totalSteps?: number;
  labels?: string[];
  errorMsg?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  step,
  totalSteps = 3,
  labels = ['Biodata Diri', 'Kelas & Jadwal', 'Pembayaran'],
  errorMsg,
}) => {
  return (
    <div className="mb-8 mt-4">
      {/* Stepper with connected numbered pills */}
      <div className="relative flex items-center justify-between">
        {/* Background track line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-200 -z-0 dark:bg-slate-800" />
        {/* Active progress track line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#00B4D8] transition-all duration-500 ease-in-out -z-0"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = step > stepNum;
          const isCurrent = step === stepNum;

          return (
            <div key={i} className="flex flex-col items-center relative z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#0077B6] text-white shadow-sm'
                    : isCurrent
                      ? 'bg-[#00B4D8] text-white ring-4 ring-[#00B4D8]/20 shadow-sm'
                      : 'bg-white border-2 border-slate-300 text-slate-400 dark:bg-slate-900 dark:border-slate-700'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight mt-2 text-center whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'text-[#0077B6] font-bold dark:text-sky-400'
                    : isCompleted
                      ? 'text-[#1D3557] dark:text-slate-300'
                      : 'text-slate-400'
                }`}
              >
                {labels[i]}
              </span>
            </div>
          );
        })}
      </div>

      {errorMsg && (
        <div className="mt-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-xs font-medium text-rose-700 flex items-start gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};

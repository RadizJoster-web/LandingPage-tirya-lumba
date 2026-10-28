import React from 'react';

interface OtpDigitInputsProps {
  digits: string[];
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  onDigitChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const OtpDigitInputs: React.FC<OtpDigitInputsProps> = ({
  digits,
  inputRefs,
  onDigitChange,
  onKeyDown,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={digit}
          onChange={(e) => onDigitChange(index, e.target.value)}
          onKeyDown={(e) => onKeyDown(index, e)}
          className="w-11 h-14 sm:w-12 sm:h-16 text-center font-heading font-bold text-2xl text-[#1D3557] bg-white border border-gray-200 rounded-xl shadow-xs transition-all focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/30 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100"
          aria-label={`Digit OTP ${index + 1}`}
        />
      ))}
    </div>
  );
};

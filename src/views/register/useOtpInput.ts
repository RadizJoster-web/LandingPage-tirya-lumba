import { useState, useEffect, useRef } from 'react';

export function useOtpInput(onResend: () => void) {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '');
    if (!clean) {
      const next = [...digits];
      next[index] = '';
      setDigits(next);
      return;
    }

    if (clean.length > 1) {
      const pasteDigits = clean.slice(0, 6).split('');
      const next = [...digits];
      pasteDigits.forEach((d, i) => {
        if (index + i < 6) next[index + i] = d;
      });
      setDigits(next);
      const nextFocus = Math.min(5, index + pasteDigits.length);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const next = [...digits];
    next[index] = clean.slice(-1);
    setDigits(next);

    if (index < 5 && clean) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setDigits(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    onResend();
  };

  return {
    digits,
    countdown,
    inputRefs,
    otpCode: digits.join(''),
    handleDigitChange,
    handleKeyDown,
    handleResend,
  };
}

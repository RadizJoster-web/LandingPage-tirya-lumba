import React from 'react';
import Link from 'next/link';

export const RegisterFooter: React.FC = () => {
  return (
    <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500 dark:border-slate-800">
      Sudah memiliki akun?{' '}
      <Link
        href="/login"
        className="font-bold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
      >
        Masuk di sini
      </Link>
    </div>
  );
};

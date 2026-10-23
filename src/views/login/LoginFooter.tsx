import React from 'react';
import Link from 'next/link';

export const LoginFooter: React.FC = () => {
  return (
    <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm text-slate-500">
      Belum memiliki akun?{' '}
      <Link
        href="/register"
        className="font-bold text-[#0077B6] hover:text-[#00B4D8] transition-colors"
      >
        Daftar di sini
      </Link>
    </div>
  );
};

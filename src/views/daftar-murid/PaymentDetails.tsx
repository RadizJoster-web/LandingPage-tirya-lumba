import React from 'react';
import { PaymentMethod } from '@/types';

interface PaymentDetailsProps {
  method: PaymentMethod;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ method }) => {
  if (method === 'QRIS') {
    return (
      <div className="p-5 bg-white rounded-2xl border border-gray-200 text-center space-y-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Scan Kode QRIS PT Tirya Lumba
        </p>
        <div className="w-40 h-40 mx-auto bg-slate-100 p-2 border border-slate-300 rounded-xl flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#1D3557] fill-current">
            <path d="M10 10h30v30h-30zM50 10h10v10h-10zM70 10h20v20h-20zM60 20h10v20h-10zM10 50h10v20h-10zM30 50h20v20h-20zM60 50h30v40h-30zM10 80h30v10h-30zM70 70h10v10h-10z" />
          </svg>
        </div>
        <p className="text-xs text-slate-500">
          Mendukung GoPay, OVO, Dana, BCA, Mandiri, dan seluruh aplikasi m-banking berstandar QRIS.
        </p>
      </div>
    );
  }

  if (method === 'Transfer Bank') {
    return (
      <div className="p-5 bg-white rounded-2xl border border-gray-200 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase">Rekening Tujuan</p>
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div>
            <p className="text-xs font-bold text-slate-400">BANK MANDIRI</p>
            <p className="font-heading font-extrabold text-lg text-[#0077B6] tracking-wider">
              123-00-4567890-1
            </p>
            <p className="text-xs text-slate-600">a.n. PT Tirya Lumba</p>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText('1230045678901')}
            className="px-3 py-1.5 text-xs font-bold bg-[#E0FBFC] text-[#0077B6] rounded-lg hover:bg-[#00B4D8] hover:text-white transition-all"
          >
            Salin Rekening
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
      <p className="font-bold flex items-center gap-1.5 text-amber-950">
        <span>⚠️</span> Instruksi Pembayaran Tunai di Lokasi Kolam
      </p>
      <p>
        Pembayaran cash wajib diserahkan langsung kepada pengelola kolam renang mitra. Anda <strong>wajib mengunggah foto dokumentasi</strong> yang memperlihatkan wajah penyetor dan nominal uang saat diserahkan ke pengelola.
      </p>
    </div>
  );
};

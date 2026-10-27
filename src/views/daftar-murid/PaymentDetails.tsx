import React, { useState } from 'react';
import { PaymentMethod } from '@/types';
import { Copy, Check, QrCode, AlertCircle } from 'lucide-react';

interface PaymentDetailsProps {
  method: PaymentMethod;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ method }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (method === 'QRIS') {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 text-center space-y-3 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <QrCode className="w-4 h-4 text-[#0077B6]" />
          <span>Scan Kode QRIS Resmi</span>
        </div>

        {/* Clean framed QR container */}
        <div className="w-48 h-48 mx-auto bg-white p-3 border-2 border-slate-100 rounded-2xl shadow-sm flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#1D3557] fill-current">
            <path d="M10 10h30v30h-30zM50 10h10v10h-10zM70 10h20v20h-20zM60 20h10v20h-10zM10 50h10v20h-10zM30 50h20v20h-20zM60 50h30v40h-30zM10 80h30v10h-30zM70 70h10v10h-10z" />
          </svg>
        </div>

        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Mendukung GoPay, OVO, Dana, BCA Mobile, Livin Mandiri, BRImo, dan seluruh aplikasi perbankan berstandar QRIS.
        </p>
      </div>
    );
  }

  if (method === 'Transfer Bank') {
    const accountNumber = '1230045678901';
    return (
      <div className="p-5 bg-white rounded-2xl border border-slate-200/80 space-y-3 dark:bg-slate-900 dark:border-slate-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
          Rekening Tujuan Transfer
        </span>

        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200/60 dark:bg-slate-800/60 dark:border-slate-700/60">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Bank Mandiri
            </span>
            <p className="font-heading font-extrabold text-lg text-[#0077B6] tracking-wider tabular-nums mt-0.5">
              123-00-4567890-1
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">a.n. PT Tirya Lumba</p>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(accountNumber)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#E0FBFC] text-[#0077B6] rounded-lg hover:bg-[#00B4D8] hover:text-white transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 space-y-2">
      <div className="flex items-center gap-2 font-bold text-amber-950">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Instruksi Pembayaran Tunai di Lokasi Kolam</span>
      </div>
      <p className="leading-relaxed text-amber-900/90 pl-6">
        Pembayaran tunai diserahkan langsung kepada petugas pengelola kolam renang mitra. Anda <strong>wajib mengunggah foto serah terima uang</strong> bersama pengelola sebagai bukti verifikasi pendaftaran.
      </p>
    </div>
  );
};

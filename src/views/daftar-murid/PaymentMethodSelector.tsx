import React from 'react';
import { PaymentMethod } from '@/types';
import { QrCode, CreditCard, Banknote } from 'lucide-react';

const PAYMENT_OPTIONS: Array<{
  method: PaymentMethod;
  label: string;
  icon: React.ReactNode;
}> = [
  { method: 'QRIS', label: 'QRIS Digital', icon: <QrCode className="w-4 h-4" /> },
  { method: 'Transfer Bank', label: 'Transfer Bank', icon: <CreditCard className="w-4 h-4" /> },
  { method: 'Cash', label: 'Tunai di Kolam', icon: <Banknote className="w-4 h-4" /> },
];

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (m: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        Pilih Metode Pembayaran *
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {PAYMENT_OPTIONS.map(({ method, label, icon }) => {
          const isSelected = paymentMethod === method;
          return (
            <button
              key={method}
              type="button"
              onClick={() => setPaymentMethod(method)}
              className={`flex items-center justify-center gap-2 py-3 px-3.5 border-2 rounded-xl text-xs font-bold transition-all text-center ${
                isSelected
                  ? 'bg-[#E0FBFC] text-[#0077B6] border-[#00B4D8] shadow-xs'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

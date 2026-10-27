import React from 'react';
import { SHIRT_SIZES } from '@/lib/constants';
import { ShirtSize } from '@/types';

interface ShirtSizeSelectorProps {
  shirtSize: ShirtSize;
  setShirtSize: (size: ShirtSize) => void;
}

export const ShirtSizeSelector: React.FC<ShirtSizeSelectorProps> = ({
  shirtSize,
  setShirtSize,
}) => {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        Ukuran T-Shirt Renang *
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {SHIRT_SIZES.map((size) => {
          const isSelected = shirtSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => setShirtSize(size)}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 border text-center ${
                isSelected
                  ? 'bg-[#00B4D8] text-white border-[#00B4D8] shadow-xs'
                  : 'bg-white text-slate-700 border-gray-200 hover:border-[#00B4D8] hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

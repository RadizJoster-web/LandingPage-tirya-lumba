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
      <label className="block text-sm font-semibold text-[#1D3557] mb-2">
        Ukuran T-Shirt Renang *
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {SHIRT_SIZES.map((size) => (
          <label
            key={size}
            className={`flex items-center justify-center py-2 px-3 border rounded-xl text-sm font-bold cursor-pointer transition-all ${
              shirtSize === size
                ? 'bg-[#00B4D8] text-white border-[#00B4D8] shadow-xs'
                : 'bg-white text-slate-700 border-gray-200 hover:border-[#00B4D8]'
            }`}
          >
            <input
              type="radio"
              name="shirt"
              value={size}
              checked={shirtSize === size}
              onChange={() => setShirtSize(size)}
              className="sr-only"
            />
            <span>{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

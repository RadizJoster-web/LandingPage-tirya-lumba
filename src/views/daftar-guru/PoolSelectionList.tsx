import React from 'react';
import { Area, Location } from '@/types';
import { Check } from 'lucide-react';

interface PoolSelectionListProps {
  poolsByArea: { area: Area; pools: Location[] }[];
  selectedLocationIds: string[];
  onToggleLocation: (id: string) => void;
  hasAreas: boolean;
}

export const PoolSelectionList: React.FC<PoolSelectionListProps> = ({
  poolsByArea,
  selectedLocationIds,
  onToggleLocation,
  hasAreas,
}) => {
  return (
    <div className="space-y-4 p-4 bg-slate-50 border border-slate-200/80 rounded-xl max-h-72 overflow-y-auto dark:bg-slate-900 dark:border-slate-800">
      {poolsByArea.map(({ area, pools }) =>
        pools.length === 0 ? null : (
          <fieldset key={area.id}>
            <legend className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Wilayah {area.name}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pools.map((pool) => {
                const isSelected = selectedLocationIds.includes(pool.id);
                return (
                  <div
                    key={pool.id}
                    onClick={() => onToggleLocation(pool.id)}
                    className={`flex items-center justify-between gap-2 border rounded-xl px-3.5 py-2.5 text-xs font-semibold cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#E0FBFC] text-[#0077B6] border-[#00B4D8] shadow-xs'
                        : 'bg-white text-slate-700 border-gray-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <span className="truncate">{pool.name}</span>
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#00B4D8] border-[#00B4D8] text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
        ),
      )}
      {!hasAreas && (
        <p className="text-xs text-slate-400 italic">
          Data wilayah sedang dimuat atau tidak tersedia.
        </p>
      )}
    </div>
  );
};

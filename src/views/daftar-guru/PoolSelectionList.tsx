import React from 'react';
import { Area, Location } from '@/types';

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
    <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-xl max-h-72 overflow-y-auto">
      {poolsByArea.map(({ area, pools }) =>
        pools.length === 0 ? null : (
          <fieldset key={area.id}>
            <legend className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
              {area.name}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pools.map((pool) => (
                <label
                  key={pool.id}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-[#1D3557] cursor-pointer hover:border-[#00B4D8] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedLocationIds.includes(pool.id)}
                    onChange={() => onToggleLocation(pool.id)}
                    className="accent-[#00B4D8] w-4 h-4"
                  />
                  <span className="truncate">{pool.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ),
      )}
      {!hasAreas && (
        <p className="text-xs text-slate-500 italic">
          Tidak dapat menghubungi server. Muat ulang halaman untuk mencoba lagi.
        </p>
      )}
    </div>
  );
};

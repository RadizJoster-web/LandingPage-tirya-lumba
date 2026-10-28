import React from 'react';
import { Area, LessonPackage, Location } from '@/types';
import { Select } from '@/components/ui/Select';
import { formatRupiah } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PoolPackagePickerProps {
  areas: Area[];
  areaId: string;
  setAreaId: (id: string) => void;
  areaLocations: Location[];
  locationId: string;
  onSelectLocation: (id: string) => void;
  locationPackages: LessonPackage[];
  packageId: string;
  setPackageId: (id: string) => void;
  isLoadingData: boolean;
}

export const PoolPackagePicker: React.FC<PoolPackagePickerProps> = ({
  areas,
  areaId,
  setAreaId,
  areaLocations,
  locationId,
  onSelectLocation,
  locationPackages,
  packageId,
  setPackageId,
  isLoadingData,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Wilayah Kolam *"
          value={areaId}
          onChange={(e) => setAreaId(e.target.value)}
          disabled={isLoadingData}
          helperText={
            isLoadingData
              ? 'Memuat data wilayah...'
              : areas.length === 0
                ? 'Belum ada wilayah terdaftar.'
                : undefined
          }
        >
          <option value="">Pilih Wilayah</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </Select>

        <Select
          label="Lokasi Kolam Renang *"
          value={locationId}
          onChange={(e) => onSelectLocation(e.target.value)}
          disabled={!areaId || areaLocations.length === 0}
          helperText={
            !areaId
              ? 'Pilih wilayah terlebih dahulu'
              : areaLocations.length === 0
                ? 'Belum ada kolam di wilayah ini.'
                : undefined
          }
        >
          <option value="">
            {!areaId
              ? 'Pilih wilayah dahulu'
              : areaLocations.length === 0
                ? 'Tidak ada kolam'
                : 'Pilih Kolam Renang'}
          </option>
          {areaLocations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Pilihan Paket Kursus Renang *
        </label>
        {!locationId ? (
          <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-lg border border-slate-200/60 dark:bg-slate-900 dark:border-slate-800">
            Pilih lokasi kolam renang terlebih dahulu untuk melihat paket yang tersedia.
          </p>
        ) : locationPackages.length === 0 ? (
          <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
            Belum ada paket les yang terdaftar untuk kolam ini.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locationPackages.map((pkg) => {
              const isSelected = packageId === pkg.id;
              const typeName = pkg.type || 'Reguler';
              const isPrivat = typeName.toLowerCase().includes('privat');

              return (
                <div
                  key={pkg.id}
                  onClick={() => setPackageId(pkg.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#00B4D8] bg-[#E0FBFC]/30 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-[#00B4D8]/50 dark:bg-slate-900 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isPrivat ? '1-on-1 Intensif' : 'Kelas Kelompok'}
                      </span>
                      <h4 className="font-heading font-bold text-base text-[#1D3557] dark:text-slate-100">
                        Paket {typeName}
                      </h4>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#00B4D8] border-[#00B4D8] text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                    <span className="font-heading font-extrabold text-base text-[#0077B6] tabular-nums">
                      {formatRupiah(pkg.price)}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {pkg.sessionCount || 4} Sesi Latihan
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

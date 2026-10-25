import React from 'react';
import { Area, LessonPackage, Location } from '@/types';
import { Select } from '@/components/ui/Select';

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
    <>
      <Select
        label="Wilayah Kolam Renang *"
        value={areaId}
        onChange={(e) => setAreaId(e.target.value)}
        disabled={isLoadingData}
        helperText={
          isLoadingData
            ? 'Memuat data wilayah…'
            : areas.length === 0
              ? 'Belum ada wilayah yang terdaftar di server.'
              : 'Pilih wilayah kota kolam renang yang Anda inginkan.'
        }
      >
        <option value="">-- Pilih Wilayah --</option>
        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </Select>

      <Select
        label="Pilihan Lokasi Kolam Renang *"
        value={locationId}
        onChange={(e) => onSelectLocation(e.target.value)}
        disabled={!areaId || areaLocations.length === 0}
        helperText={
          !areaId
            ? undefined
            : areaLocations.length === 0
              ? 'Belum ada kolam renang terdaftar di wilayah ini.'
              : undefined
        }
      >
        <option value="">
          {!areaId
            ? '-- Pilih wilayah terlebih dahulu --'
            : areaLocations.length === 0
              ? '-- Tidak ada kolam di wilayah ini --'
              : '-- Pilih Kolam Renang --'}
        </option>
        {areaLocations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </Select>

      <Select
        label="Jenis Kelas / Paket Les *"
        value={packageId}
        onChange={(e) => setPackageId(e.target.value)}
        disabled={!locationId || locationPackages.length === 0}
        helperText={
          !locationId
            ? undefined
            : locationPackages.length === 0
              ? 'Belum ada paket les terdaftar untuk kolam ini.'
              : 'Harga diambil dari paket resmi kolam yang dipilih.'
        }
      >
        <option value="">
          {!locationId
            ? '-- Pilih kolam terlebih dahulu --'
            : locationPackages.length === 0
              ? '-- Tidak ada paket les di kolam ini --'
              : '-- Pilih Paket Les --'}
        </option>
        {locationPackages.map((item) => (
          <option key={item.id} value={item.id}>
            {item.type ? `${item.type} — ` : 'Paket — '}Rp {item.price.toLocaleString('id-ID')}
          </option>
        ))}
      </Select>
    </>
  );
};

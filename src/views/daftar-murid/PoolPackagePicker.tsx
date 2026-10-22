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
        helperText="Data wilayah diambil langsung dari server."
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
      >
        <option value="">
          {areaId ? '-- Pilih Kolam Renang --' : '-- Pilih wilayah terlebih dahulu --'}
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
        disabled={!locationId}
        helperText="Harga diambil dari paket resmi kolam yang dipilih."
      >
        <option value="">
          {locationId ? '-- Pilih Paket Les --' : '-- Pilih kolam terlebih dahulu --'}
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

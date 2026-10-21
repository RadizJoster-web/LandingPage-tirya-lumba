// Katalog paket les siap-render untuk section program di landing page.
// GET /api/packages sudah menyertakan relasi lokasi + area, jadi bentuk kartu
// cukup disusun di sini tanpa komponen perlu mencocokkan id sendiri.
import { getAreas, getAllLocations, getPackages } from './api';

export interface ProgramCatalogItem {
  id: string;
  /** Jenis paket, mis. "Reguler" atau "Privat". */
  type: string;
  price: number;
  /** Nama kolam = headline kartu. */
  poolName: string;
  /** Nama area = label di atas headline. */
  areaName: string | null;
  /** CTA "buka di Google Maps". */
  mapUrl: string | null;
}

export interface ProgramCatalog {
  items: ProgramCatalogItem[];
  totalPools: number;
  totalAreas: number;
}

export async function getProgramCatalog(): Promise<ProgramCatalog> {
  const [packages, locations, areas] = await Promise.all([
    getPackages(),
    getAllLocations(),
    getAreas(),
  ]);

  const locationById = new Map(locations.map((location) => [location.id, location]));
  const areaNameById = new Map(areas.map((area) => [area.id, area.name]));

  return {
    items: packages.map((pkg) => {
      const joined = locationById.get(pkg.locationId ?? '');
      const areaId = joined?.areaId;

      return {
        id: pkg.id,
        type: pkg.type,
        price: pkg.price,
        poolName: pkg.location?.name ?? joined?.name ?? 'Kolam mitra',
        areaName:
          pkg.location?.area?.name ??
          (areaId ? areaNameById.get(areaId) ?? null : null),
        mapUrl: pkg.location?.mapUrl ?? joined?.mapUrl ?? null,
      };
    }),
    totalPools: locations.length,
    totalAreas: areas.length,
  };
}

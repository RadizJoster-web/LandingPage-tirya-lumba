import type { Metadata } from 'next';
import { Area, LessonPackage, Location, ProgramCatalogItem } from '@/types';
import { request, safe } from '@/lib/http';
import { HeroSection } from '@/components/features/HeroSection';
import { BrandSection } from '@/components/features/BrandSection';
import { ProgramSection } from '@/components/features/ProgramSection';
import { AboutSection } from '@/components/features/AboutSection';
import { WhyUsSection } from '@/components/features/WhyUsSection';
import { parsePage, buildHomeStructuredData } from './lib/homeStructuredData';

const PROGRAMS_PER_PAGE = 6;

export const metadata: Metadata = {
  title: 'Kursus Renang Profesional Tangerang Raya',
  description:
    'Daftar les renang PT Tirya Lumba: pilih paket kelas dan kolam mitra, jadwal fleksibel, dan pelatih berlisensi. Pendaftaran murid maupun pelatih kini 100% online.',
  alternates: { canonical: '/' },
};

async function fetchProgramCatalog(): Promise<{
  items: ProgramCatalogItem[];
  totalPools: number;
  totalAreas: number;
}> {
  const [pkgs, locs, areas] = await Promise.all([
    request<LessonPackage[]>('/packages', { method: 'GET', revalidate: 3600, tag: 'packages' }),
    request<Location[]>('/locations', { method: 'GET', revalidate: 3600, tag: 'locations' }),
    request<Area[]>('/areas', { method: 'GET', revalidate: 3600, tag: 'areas' }),
  ]);

  const locationById = new Map(locs.data.map((loc: Location) => [loc.id, loc]));
  const areaNameById = new Map(areas.data.map((area: Area) => [area.id, area.name]));

  const items: ProgramCatalogItem[] = pkgs.data.map((pkg: LessonPackage) => {
    const pkgLocId = pkg.locationId ?? pkg.location?.id;
    const joined =
      (pkgLocId ? locationById.get(pkgLocId) : undefined) ??
      locs.data.find((loc: Location) => loc.name === pkg.location?.name);
    const areaId = joined?.areaId;

    return {
      id: pkg.id,
      type: pkg.type,
      price: pkg.price,
      poolName: pkg.location?.name ?? joined?.name ?? 'Kolam mitra',
      areaName: pkg.location?.area?.name ?? (areaId ? areaNameById.get(areaId) ?? null : null),
      mapUrl: pkg.location?.mapUrl ?? joined?.mapUrl ?? null,
      category: pkg.location?.category ?? joined?.category ?? null,
    };
  });

  return { items, totalPools: locs.data.length, totalAreas: areas.data.length };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = parsePage(params.halaman);

  const catalog = await safe(fetchProgramCatalog(), {
    items: [],
    totalPools: 0,
    totalAreas: 0,
  });

  const classTypes = Array.from(
    new Set(catalog.items.map((item) => item.type).filter((type): type is string => Boolean(type))),
  );
  const areaNames = Array.from(
    new Set(
      catalog.items
        .map((item) => item.areaName)
        .filter((name): name is string => Boolean(name)),
    ),
  );

  const structuredData = buildHomeStructuredData(areaNames, classTypes);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection totalPartnerPools={catalog.totalPools} />
      <BrandSection />
      <ProgramSection
        programs={catalog.items}
        currentPage={page}
        perPage={PROGRAMS_PER_PAGE}
      />
      <AboutSection />
      <WhyUsSection
        stats={{
          totalPartnerPools: catalog.totalPools,
          totalAreas: catalog.totalAreas,
          totalClassTypes: classTypes.length,
        }}
      />
    </>
  );
}

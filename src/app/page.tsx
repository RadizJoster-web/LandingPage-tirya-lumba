import type { Metadata } from 'next';
import { getAreas, getPackages, getPublicLocations, safe } from '@/services/api';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { HeroSection } from '@/components/features/HeroSection';
import { BrandSection } from '@/components/features/BrandSection';
import { ProgramSection } from '@/components/features/ProgramSection';
import { AboutSection } from '@/components/features/AboutSection';
import { WhyUsSection } from '@/components/features/WhyUsSection';

const POOLS_PER_PAGE = 6;

export const metadata: Metadata = {
  title: 'Kursus Renang Profesional Tangerang Raya',
  description:
    'Daftar les renang PT Tirya Lumba: pilih kolam mitra terdekat, jadwal fleksibel, dan pelatih berlisensi. Pendaftaran murid maupun pelatih kini 100% online.',
  alternates: { canonical: '/' },
};

function parsePage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = parsePage(params.halaman);

  // Fetch paralel agar tidak terjadi waterfall; aman bila server API sedang mati.
  const [locationResult, areas, packages] = await Promise.all([
    safe(getPublicLocations(page, POOLS_PER_PAGE), {
      locations: [],
      pagination: undefined,
    }),
    safe(getAreas(), []),
    safe(getPackages(), []),
  ]);

  const totalClassTypes = new Set(packages.map((pkg) => pkg.type)).size;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Sekolah dan kursus renang untuk segala usia di Tangerang Raya bersama pelatih berlisensi.',
    areaServed: areas.map((area) => ({ '@type': 'City', name: area.name })),
    makesOffer: Array.from(new Set(packages.map((pkg) => pkg.type))).map((type) => ({
      '@type': 'Offer',
      name: `Kelas Renang ${type}`,
      category: 'Kursus Renang',
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD membantu bot crawling memahami layanan, wilayah, dan jenis kelas.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection totalPartnerPools={locationResult.pagination?.totalItems ?? 0} />
      <BrandSection />
      <ProgramSection
        locations={locationResult.locations}
        packages={packages}
        pagination={locationResult.pagination}
        currentPage={page}
      />
      <AboutSection />
      <WhyUsSection
        stats={{
          totalPartnerPools: locationResult.pagination?.totalItems ?? 0,
          totalAreas: areas.length,
          totalClassTypes,
        }}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { getProgramCatalog, safe } from '@/services/api';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { HeroSection } from '@/components/features/HeroSection';
import { BrandSection } from '@/components/features/BrandSection';
import { ProgramSection } from '@/components/features/ProgramSection';
import { AboutSection } from '@/components/features/AboutSection';
import { WhyUsSection } from '@/components/features/WhyUsSection';

const PROGRAMS_PER_PAGE = 6;

export const metadata: Metadata = {
  title: 'Kursus Renang Profesional Tangerang Raya',
  description:
    'Daftar les renang PT Tirya Lumba: pilih paket kelas dan kolam mitra, jadwal fleksibel, dan pelatih berlisensi. Pendaftaran murid maupun pelatih kini 100% online.',
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

  // Satu permintaan katalog (paket + kolam + wilayah) agar kartu program tidak
  // perlu mencocokkan id sendiri; aman bila server API sedang mati.
  const catalog = await safe(getProgramCatalog(), {
    items: [],
    totalPools: 0,
    totalAreas: 0,
  });

  const classTypes = Array.from(new Set(catalog.items.map((item) => item.type)));
  const areaNames = Array.from(
    new Set(catalog.items.map((item) => item.areaName).filter((name): name is string => Boolean(name))),
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Sekolah dan kursus renang untuk segala usia di Tangerang Raya bersama pelatih berlisensi.',
    areaServed: areaNames.map((name) => ({ '@type': 'City', name })),
    makesOffer: classTypes.map((type) => ({
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

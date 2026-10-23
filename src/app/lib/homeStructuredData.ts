import { SITE_NAME, SITE_URL } from '@/lib/constants';

export function parsePage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function buildHomeStructuredData(areaNames: string[], classTypes: string[]) {
  return {
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
}

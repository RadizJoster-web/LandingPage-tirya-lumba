import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/** Hanya halaman publik yang masuk sitemap; alur pendaftaran bersifat privat. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { id: SITE_URL } },
    },
  ];
}

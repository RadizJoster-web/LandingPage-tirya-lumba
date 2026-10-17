import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/** Halaman privat tidak diindeks; hanya halaman publik yang boleh muncul di hasil pencarian. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/profile', '/daftar', '/login', '/register', '/guru/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

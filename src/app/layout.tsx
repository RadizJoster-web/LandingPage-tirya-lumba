import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/features/navbar';
import { Footer } from '@/components/features/Footer';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Sekolah Renang Profesional Tangerang Raya`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Pusat kursus dan sekolah renang profesional terpercaya di Tangerang Raya untuk segala usia. Daftar online, pilih kolam mitra terdekat, dan latihan bersama pelatih berlisensi.',
  keywords: [
    'kursus renang Tangerang',
    'les renang anak',
    'sekolah renang Tangerang Raya',
    'pelatih renang berlisensi',
    'pendaftaran renang online',
  ],
  authors: [{ name: 'PT Tirya Lumba' }],
  applicationName: 'PT Tirya Lumba',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Sekolah Renang Profesional Tangerang Raya`,
    description:
      'Belajar renang aman, menyenangkan, dan terarah bersama pelatih berlisensi di kolam mitra Tangerang Raya.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Sekolah Renang Profesional`,
    description:
      'Daftar kursus renang online: pilih kolam mitra, jadwal fleksibel, dan pelatih berlisensi.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F9FA] text-[#1D3557]">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

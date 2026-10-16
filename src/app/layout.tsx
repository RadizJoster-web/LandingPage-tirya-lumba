import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/features/navbar';
import { Footer } from '@/components/features/Footer';
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
  title: 'PT Tirya Lumba | Sekolah Renang Profesional Tangerang Raya',
  description:
    'Pusat kursus dan sekolah renang profesional terpercaya di Tangerang Raya untuk segala usia. Pelatih bersertifikat PRSI, jadwal fleksibel, dan kolam mitra terdekat.',
  openGraph: {
    title: 'PT Tirya Lumba | Sekolah Renang Profesional',
    description:
      'Belajar renang aman, menyenangkan, dan terarah bersama pelatih bersertifikat di Tangerang Raya.',
    url: 'https://tiryalumba.id',
    siteName: 'PT Tirya Lumba',
    locale: 'id_ID',
    type: 'website',
  },
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

import { ImageResponse } from 'next/og';

export const alt = 'PT Tirya Lumba — Sekolah Renang Profesional Tangerang Raya';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Kartu pratinjau dinamis untuk share WhatsApp/sosmed: tidak butuh berkas gambar,
 * dirender oleh Next saat crawler meminta /opengraph-image.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #E0FBFC 0%, #FFFFFF 55%, #00B4D8 100%)',
          color: '#1D3557',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 34, color: '#0077B6', fontWeight: 700, marginBottom: 18 }}>
          PT TIRYA LUMBA
        </div>
        <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.15, maxWidth: 900 }}>
          Sekolah Renang Profesional Tangerang Raya
        </div>
        <div style={{ fontSize: 30, color: '#1D3557', marginTop: 26, maxWidth: 900 }}>
          Kolam mitra terdekat • Pelatih berlisensi • Pendaftaran 100% online
        </div>
      </div>
    ),
    size,
  );
}

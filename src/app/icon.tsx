import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Favicon dinamis bergaya tetesan air, tanpa berkas aset terpisah. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#00B4D8',
          color: '#FFFFFF',
          fontSize: 40,
          fontWeight: 800,
          borderRadius: 14,
          fontFamily: 'sans-serif',
        }}
      >
        TL
      </div>
    ),
    size,
  );
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Penjaga rute privat (proxy.ts menggantikan middleware.ts di Next 16).
 * Penanda sesi ditulis klien di src/services/session-store.ts setelah login
 * berhasil; token asli tetap JWT milik server, jadi penanda ini hanya untuk
 * pengalihan awal, bukan batas keamanan data.
 */
const SESSION_COOKIE = 'tirya_session';

export function proxy(request: NextRequest) {
  if (!request.cookies.has(SESSION_COOKIE)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Halaman privat tidak boleh di-cache (arsitektur bagian D).
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, must-revalidate');
  return response;
}

export const config = {
  matcher: ['/daftar', '/daftar/:path*', '/profile', '/guru/:path*'],
};

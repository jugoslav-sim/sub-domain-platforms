import { updateSession } from '@/lib/auth/middleware';
import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public pages (s/[subdomain], api routes, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|s/|api/|auth/callback).*)',
  ],
};

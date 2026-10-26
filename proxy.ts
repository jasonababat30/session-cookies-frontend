import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import getCurrentUser from "@/features/authorized/apis/get-current-user";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get('connect.sid');

  // If a user is currently logged in
  if (!!session) {
    const { data: currentUser } = await getCurrentUser()

    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL(`/authorized/${currentUser?.role}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
   matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
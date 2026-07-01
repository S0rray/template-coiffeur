import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const getSecret = () =>
  new TextEncoder().encode(
    process.env.JWT_SECRET ?? 'fallback-secret-change-before-production-32ch'
  )

async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    await jwtVerify(token, getSecret())
    return true
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Forward pathname in request headers so the root layout can detect admin routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const token = request.cookies.get('admin_token')?.value

  if (pathname.startsWith('/admin')) {
    // Login page: let through, or redirect to dashboard if already logged in
    if (pathname === '/admin/login') {
      if (await isValidToken(token)) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return NextResponse.next({ request: { headers: requestHeaders } })
    }

    // All other admin routes: require auth
    if (!(await isValidToken(token))) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}

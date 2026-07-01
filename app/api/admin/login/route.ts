import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { signToken } from '@/lib/auth'

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  const validUser = safeCompare(username ?? '', process.env.ADMIN_USERNAME ?? 'admin')
  const validPass = safeCompare(password ?? '', process.env.ADMIN_PASSWORD ?? 'changeme123')

  if (!validUser || !validPass) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
  }

  const token = await signToken(username)

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })
  return response
}

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/db'

async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token || !(await verifyToken(token))) return false
  return true
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
  const body = await request.json()
  const reservation = await prisma.reservation.update({
    where: { id },
    data: { status: body.status },
  })
  return NextResponse.json(reservation)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
  await prisma.reservation.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

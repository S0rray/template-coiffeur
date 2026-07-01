import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { assignStylist } from '@/lib/stylists'
import { randomUUID } from 'crypto'

async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token || !(await verifyToken(token))) return false
  return true
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const reservations = await prisma.reservation.findMany({
    orderBy: [{ date: 'desc' }, { slot: 'asc' }],
    include: { stylist: { select: { name: true } } },
  })
  return NextResponse.json(reservations)
}

export async function POST(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = await request.json()

  let stylistId: string | null = null
  try {
    stylistId = await assignStylist(body.service, body.date, body.slot)
  } catch (err) {
    const msg = err instanceof Error ? err.message : ''
    if (msg === 'UNQUALIFIED') {
      return NextResponse.json({ error: 'Aucun coiffeur ne propose ce service' }, { status: 409 })
    }
    if (msg === 'FULL') {
      return NextResponse.json({ error: 'Ce créneau est complet' }, { status: 409 })
    }
    throw err
  }

  const reservation = await prisma.reservation.create({
    data: {
      id: randomUUID(),
      name: body.name,
      phone: body.phone ?? '',
      email: body.email,
      service: body.service,
      slot: body.slot,
      date: body.date,
      notes: body.notes ?? '',
      status: 'confirmed',
      source: body.source ?? 'phone',
      stylistId,
    },
  })
  return NextResponse.json(reservation, { status: 201 })
}

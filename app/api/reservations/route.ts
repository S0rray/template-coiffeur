import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { assignStylist } from '@/lib/stylists'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.name || !body.email || !body.service || !body.slot || !body.date) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

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
      status: 'pending',
      source: 'online',
      stylistId,
    },
  })

  return NextResponse.json({ ok: true, id: reservation.id }, { status: 201 })
}

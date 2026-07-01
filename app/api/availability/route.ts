import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { parseStylistServices } from '@/lib/stylists'

export async function GET() {
  const [reservations, leaves, stylists] = await Promise.all([
    prisma.reservation.findMany({
      where: { status: { not: 'cancelled' } },
      select: { date: true, slot: true, stylistId: true },
    }),
    prisma.leave.findMany({
      select: { startDate: true, endDate: true },
    }),
    prisma.stylist.findMany({
      select: { id: true, services: true },
    }),
  ])

  return NextResponse.json({
    reservations,
    leaves,
    // parse services server-side so the client receives string[]
    stylists: stylists.map((s) => ({
      id: s.id,
      services: parseStylistServices(s.services),
    })),
  })
}

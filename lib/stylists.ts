import { prisma } from '@/lib/db'

export function parseStylistServices(raw: string): string[] {
  try { return JSON.parse(raw) as string[] } catch { return [] }
}

/**
 * Finds a free stylist for the given service, date and slot.
 * Returns the stylist id to assign, or null if no stylists are configured.
 * Throws if stylists exist but none is free/qualified.
 */
export async function assignStylist(
  service: string,
  date: string,
  slot: string,
): Promise<string | null> {
  const stylists = await prisma.stylist.findMany()
  if (stylists.length === 0) return null // legacy mode: no assignment

  const qualified = stylists.filter((s) =>
    parseStylistServices(s.services).includes(service)
  )
  if (qualified.length === 0) {
    throw new Error('UNQUALIFIED') // no stylist offers this service
  }

  // Find reservations at this date+slot (excluding cancelled)
  const booked = await prisma.reservation.findMany({
    where: { date, slot, status: { not: 'cancelled' } },
    select: { stylistId: true },
  })
  const busyIds = new Set(booked.map((r) => r.stylistId).filter(Boolean) as string[])
  const unassigned = booked.filter((r) => !r.stylistId).length

  const free = qualified.filter((s) => !busyIds.has(s.id))
  if (free.length <= unassigned) {
    throw new Error('FULL') // no free slot
  }

  // Random pick among free stylists
  return free[Math.floor(Math.random() * free.length)].id
}

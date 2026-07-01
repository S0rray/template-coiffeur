import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { randomUUID } from 'crypto'

async function requireAuth() {
  const store = await cookies()
  const token = store.get('admin_token')?.value
  return token ? await verifyToken(token) : false
}

function parseServices(raw: string): string[] {
  try { return JSON.parse(raw) as string[] } catch { return [] }
}

export async function GET() {
  if (!(await requireAuth())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const stylists = await prisma.stylist.findMany({ orderBy: { createdAt: 'asc' } })
  return NextResponse.json(
    stylists.map((s) => ({ ...s, services: parseServices(s.services) }))
  )
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { name, services } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })

  const stylist = await prisma.stylist.create({
    data: {
      id: randomUUID(),
      name: String(name).trim(),
      services: JSON.stringify(Array.isArray(services) ? services : []),
    },
  })
  return NextResponse.json({ ...stylist, services: parseServices(stylist.services) }, { status: 201 })
}

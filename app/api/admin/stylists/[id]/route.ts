import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/db'

async function requireAuth() {
  const store = await cookies()
  const token = store.get('admin_token')?.value
  return token ? await verifyToken(token) : false
}

function parseServices(raw: string): string[] {
  try { return JSON.parse(raw) as string[] } catch { return [] }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const data: { name?: string; services?: string } = {}
  if (body.name !== undefined) data.name = String(body.name).trim()
  if (body.services !== undefined) data.services = JSON.stringify(Array.isArray(body.services) ? body.services : [])

  const stylist = await prisma.stylist.update({ where: { id }, data })
  return NextResponse.json({ ...stylist, services: parseServices(stylist.services) })
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  await prisma.stylist.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

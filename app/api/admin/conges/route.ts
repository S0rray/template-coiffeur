import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/db'
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
  const leaves = await prisma.leave.findMany({ orderBy: { startDate: 'asc' } })
  return NextResponse.json(leaves)
}

export async function POST(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = await request.json()
  const leave = await prisma.leave.create({
    data: {
      id: randomUUID(),
      startDate: body.startDate,
      endDate: body.endDate,
      note: body.note ?? '',
    },
  })
  return NextResponse.json(leave, { status: 201 })
}

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import { AdminShell } from '@/components/admin/AdminShell'

async function logout() {
  'use server'
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  redirect('/admin/login')
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token || !(await verifyToken(token))) redirect('/admin/login')

  return <AdminShell logout={logout}>{children}</AdminShell>
}

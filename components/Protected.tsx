'use client'
import { useAuthStore } from '@/Providers/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, getToken } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || !getToken()) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [isAuthenticated, router, getToken])

  if (loading) return <div>Loading...</div>

  return <>{children}</>
}

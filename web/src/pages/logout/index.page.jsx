import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useUser } from '@/hooks/redux/auth'

/**
 * Make user as logged out and guide to login page
 */
export default function LogoutPage() {
  const router = useRouter()
  const { logout } = useUser()

  useEffect(() => {
    logout()
    router.push('/login')
  }, [router, logout])

  return null
}

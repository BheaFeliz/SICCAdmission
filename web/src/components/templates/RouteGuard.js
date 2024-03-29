import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { useUser } from '@/hooks/redux/auth'

const RouteGuard = ({ children }) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const { user, isLoading, isError, logout } = useUser()
  const isAuthOff = process.env.NEXT_PUBLIC_AUTHENTICATION_OFF || false

  const authCheck = useCallback(
    (url) => {
      const publicPaths = ['/login']
      const path = url.split('?')[0]

      if (isAuthOff) {
        return setAuthorized(true)
      }

      if (!user && !publicPaths.includes(path)) {
        setAuthorized(false)
        logout()
        router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath },
        })
      } else {
        setAuthorized(true)
      }
    },
    [user, isAuthOff, router, logout],
  )

  useEffect(() => {
    if (isLoading) return

    // on initial load - run auth check
    authCheck(router.asPath)

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isError])

  return authorized && children
}

export default RouteGuard

import { useCallback, useMemo } from 'react'

import { authApi } from '@/hooks/api/authApi'
import { baseApi } from '@/hooks/api/baseApi'
import { getToken, removeToken, setToken } from '@/hooks/lib/tokenStorage'

export const useUser = () => {
  // Avoid calling /auth on public pages when no token exists
  const token = typeof window !== 'undefined' ? getToken() : null
  const { data, isError, isLoading, isUninitialized } = authApi.useGetUserQuery(
    undefined,
    { skip: !token },
  )
  // const [logoutMutation] = authApi.useLogoutMutation()

  const user = useMemo(() => data || null, [data])

  const logout = useCallback(async () => {
    // await logoutMutation().unwrap()
    removeToken()
    baseApi.util.resetApiState()
  }, [])

  const login = useCallback((token) => {
    setToken(token)
    baseApi.util.resetApiState()
  }, [])

  return {
    user,
    isError,
    // Treat uninitialized (skipped) as not loading
    isLoading: isUninitialized ? false : isLoading,
    login,
    logout,
  }
}

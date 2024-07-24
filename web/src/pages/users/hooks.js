import { useRouter } from 'next/router'

import { useUsers } from '@/hooks/redux/useUsers'

const useHooks = () => {
  const router = useRouter()

  const { users, isLoading } = useUsers(router.query.page || 1)

  const onPageChange = (page) => {
    router.push({ pathname: '/users', query: { page } })
  }

  return {
    users,
    isLoading,

    currentPage: router.query.page || 1,
    onPageChange,
  }
}

export default useHooks

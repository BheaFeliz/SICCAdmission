import { useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'

import { useUsers } from '@/hooks/redux/useUsers'

const useHooks = () => {
  const { users, isLoading } = useUsers()

  const breadcrumbs = [
    {
      href: '#',
      title: 'Staffs',
      icon: FaUserFriends,
    },
  ]

  const totalPages = 100
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => setCurrentPage(page)

  return {
    totalPages,
    currentPage,
    onPageChange,
    users,
    isLoading,
    breadcrumbs,
  }
}

export default useHooks

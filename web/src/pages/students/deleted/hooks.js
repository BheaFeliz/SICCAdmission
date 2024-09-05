import { useState } from 'react'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'

import { useStudents } from '@/hooks/redux/useStudents'

const useHooks = () => {
  const { registrations, isLoading } = useStudents()

  const breadcrumbs = [
    {
      href: '#',
      title: 'Closed Admissions',
      icon: AiOutlineUsergroupDelete,
    },
  ]

  const totalPages = 5 // This should be dynamically set based on your API response
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => setCurrentPage(page)

  return {
    totalPages,
    currentPage,
    onPageChange,
    registrations,
    isLoading,
    breadcrumbs,
  }
}

export default useHooks

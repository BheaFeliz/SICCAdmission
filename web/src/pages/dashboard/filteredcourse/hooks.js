import { useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'

import { useStudents } from '@/hooks/redux/useStudents'

const useHooks = (courseId) => {
  const { registrations, isLoading } = useStudents()

  const filteredRegistrations =
    courseId ?
      registrations.filter((registration) => registration.courseId === courseId)
    : registrations

  const breadcrumbs = [
    {
      href: '#',
      title: 'Students',
      icon: FaUserFriends,
    },
  ]

  const totalPages = Math.ceil(filteredRegistrations.length / 10) // Adjust if necessary
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => setCurrentPage(page)

  return {
    totalPages,
    currentPage,
    onPageChange,
    registrations: filteredRegistrations,
    isLoading,
    breadcrumbs,
  }
}

export default useHooks

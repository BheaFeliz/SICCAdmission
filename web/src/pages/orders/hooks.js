import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaTasks } from 'react-icons/fa'

import { useOrders } from '@/hooks/redux/useOrders'

const useHooks = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const page = parseInt(router.query.page, 10) || 1
    setCurrentPage(page)
  }, [router.query.page])

  const { orders, isLoading } = useOrders(currentPage)

  const totalPages = orders.last_page || 1

  const onPageChange = (page) => {
    setCurrentPage(page)
    router.push({ pathname: '/orders', query: { page } })
  }

  const breadcrumbs = [
    {
      href: '/orders',
      title: 'Orders',
      icon: FaTasks,
    },
  ]

  return {
    orders,
    isLoading,
    breadcrumbs,
    totalPages,
    currentPage,
    onPageChange,
  }
}

export default useHooks

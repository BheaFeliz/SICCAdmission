import { useMemo } from 'react'

import { orderApi } from '../api/orderApi'

export const useOrders = (page) => {
  const { data, error, isError, isLoading } = orderApi.useGetOrdersQuery(page)

  const orders = useMemo(() => data?.orders || [], [data])

  return {
    orders,
    error,
    isError,
    isLoading,
  }
}

export const useOrder = (orderId) => {
  const { data, error, isError, isLoading } =
    orderApi.useGetOrderByIdQuery(orderId)

  const order = useMemo(() => data?.order || null, [data])

  return {
    order,
    error,
    isError,
    isLoading,
  }
}

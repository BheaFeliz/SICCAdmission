import { useOrder } from '@/hooks/redux/useOrders'

const useHooks = (orderId) => {
  const { order, isloading } = useOrder(orderId)

  return {
    order,
    isloading,
  }
}

export default useHooks

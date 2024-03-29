import { useMemo } from 'react'

import { storeApi } from '../api/storeApi'

export const useStores = () => {
  const { data, isError, isLoading } = storeApi.useGetStoresQuery()

  const stores = useMemo(() => data?.stores || [], [data])

  return {
    stores,
    isError,
    isLoading,
  }
}

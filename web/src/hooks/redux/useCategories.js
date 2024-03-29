import { useMemo } from 'react'

import { categoryApi } from '../api/categoryApi'

export const useCategories = () => {
  const { data, isError, isLoading } = categoryApi.useGetCategoriesQuery()

  const categories = useMemo(() => data?.categories || [], [data])

  return {
    categories,
    isError,
    isLoading,
  }
}

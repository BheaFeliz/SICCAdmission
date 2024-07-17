import { useMemo } from 'react'

import { useGetDeletedSchedulesQuery } from '@/hooks/api/scheduleApi'

export const useDeletedSchedules = () => {
  const { data, isError, isLoading } = useGetDeletedSchedulesQuery()

  const deletedSchedules = useMemo(() => data || [], [data])

  return {
    deletedSchedules,
    isError,
    isLoading,
  }
}

import { useMemo } from 'react'

import { scheduleApi } from '../api/scheduleApi'

export const useSchedules = () => {
    const { data, isError, isLoading } = scheduleApi.useGetScheduleQuery()
  
    const schedule = useMemo(() => data?.schedule || [], [data])
  
    return {
      schedule,
      isError,
      isLoading,
    }
  }
  
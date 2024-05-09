import { useMemo } from 'react'

import { scheduleApi } from '../api/scheduleApi'

export const useSchedule = () => {
    const { data, isError, isLoading } = scheduleApi.useGetScheduleQuery()
  
    const schedule = useMemo(() => data?.schedule || [], [data])
  
    return {
      schedule,
      isError,
      isLoading,
    }
  }
  
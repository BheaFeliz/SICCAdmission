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
  
  export const useSchedule = (cardId) => {
    const { data, error, isError, isLoading } =
      orderApi.useGetScheduleByIdQuery(cardId)
  
    const order = useMemo(() => data?.order || null, [data])
  
    return {
      order,
      error,
      isError,
      isLoading,
    }
  }
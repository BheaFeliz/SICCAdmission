import { useMemo } from 'react'

import { scheduleApi } from '../api/scheduleApi'

export const useSchedules = () => {
  const { data, isError, isLoading } = scheduleApi.useGetSchedulesQuery()

  const schedules = useMemo(() => {
    return data || []
  }, [data])

  return {
    schedules,
    isError,
    isLoading,
  }
}

export const useSchedule = (scheduleId) => {
  const { data, isError, isLoading } =
    scheduleApi.useGetScheduleByIdQuery(scheduleId)

  const schedule = useMemo(() => data || {}, [data])

  return {
    schedule,
    isError,
    isLoading,
  }
}

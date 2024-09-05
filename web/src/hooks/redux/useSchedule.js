import { useMemo } from 'react'

import { scheduleApi } from '../api/scheduleApi'

export const useActiveSchedules = () => {
  const { data, isError, isLoading } = scheduleApi.useGetActiveSchedulesQuery()

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

  // Ensure the schedule data is returned, along with filtering out deleted registrants
  const schedule = useMemo(() => {
    if (!data) return {}

    return {
      ...data,
      registrations: (data.registrations || []).filter(
        (registration) => !registration.deleted_at,
      ),
    }
  }, [data])

  return {
    schedule,
    isError,
    isLoading,
  }
}

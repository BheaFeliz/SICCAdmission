import { useEffect, useState } from 'react'

import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi'
import { useGetRegistrationsQuery } from '@/hooks/api/studentApi'

const useHooks = (scheduleId) => {
  const {
    data: scheduling,
    error: scheduleError,
    isLoading: scheduleLoading,
  } = useGetScheduleByIdQuery(scheduleId)
  const {
    data,
    error: studentsError,
    isLoading: studentsLoading,
    refetch,
  } = useGetRegistrationsQuery({ schedule_id: scheduleId })

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    refetch()
  }, [scheduleId, refetch])

  // Console logging
  useEffect(() => {
    console.log('Registrations data:', data)
  }, [scheduling, data, scheduleError, studentsError])

  // Use data?.registrations || [] if the API response includes a registrations key
  const registrations = data?.registrations || []

  return {
    scheduling,
    scheduleError,
    scheduleLoading,
    studentsError,
    studentsLoading,
    registrations,
    currentPage,
    setCurrentPage,
  }
}

export default useHooks

import { useRouter } from 'next/router'

import { useDeleteScheduleMutation } from '@/hooks/api/scheduleApi'
import { useStudents } from '@/hooks/redux/useStudents'

export const useHooks = () => {
  const router = useRouter()
  const { scheduleId } = router.query

  const {
    schedules,
    isLoading: isSchedulesLoading,
    isError: isSchedulesError,
  } = useDeleteScheduleMutation

  const {
    registrations,
    isLoading: isRegistrationsLoading,
    isError: isRegistrationsError,
  } = useStudents()

  const isLoading = isSchedulesLoading || isRegistrationsLoading
  const isError = isSchedulesError || isRegistrationsError

  // // Find the schedule name based on the scheduleId
  // const schedule = schedules.find((sched) => sched.id === Number(scheduleId))
  // const scheduleName = schedule ? schedule.name : 'Unknown_Schedule'

  const schedule = schedules?.find((sched) => sched.id === Number(scheduleId))
  const scheduleName = schedule ? schedule.name : 'Unknown_Schedule'

  return {
    scheduleName,
    registrations,
    isLoading,
    isError,
  }
}

export default useHooks

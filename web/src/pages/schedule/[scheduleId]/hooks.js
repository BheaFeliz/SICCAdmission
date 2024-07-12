import { useSchedules } from '@/hooks/redux/useSchedule'
import { useStudents } from '@/hooks/redux/useStudents'

export const useHooks = () => {
  const {
    schedules,
    isLoading: isSchedulesLoading,
    isError: isSchedulesError,
  } = useSchedules()

  const {
    registrations,
    isLoading: isRegistrationsLoading,
    isError: isRegistrationsError,
  } = useStudents() // Use useStudents hook

  const isLoading = isSchedulesLoading || isRegistrationsLoading
  const isError = isSchedulesError || isRegistrationsError

  return {
    schedules,
    registrations,
    isLoading,
    isError,
  }
}

export default useHooks

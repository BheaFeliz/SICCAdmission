import {
  useDeleteScheduleMutation,
  useUpdateAllSchedulesMutation,
} from '@/hooks/api/scheduleApi'
import { useActiveSchedules } from '@/hooks/redux/useSchedule'

export const useHooks = () => {
  const { schedules, isLoading, isError } = useActiveSchedules  ()
  const [deleteSchedule] = useDeleteScheduleMutation()
  const [updateAllSchedules] = useUpdateAllSchedulesMutation() // Correct mutation hook

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await deleteSchedule(scheduleId).unwrap()
    } catch (error) {
      // Handle the error appropriately
    }
  }

  const handleUpdateMaxRegistrations = async (scheduleId, maxRegistrations) => {
    try {
      await updateAllSchedules({
        scheduleId,
        max_registrations: maxRegistrations,
      }).unwrap()
    } catch (error) {
      // Handle the error appropriately
    }
  }

  return {
    schedules,
    isLoading,
    isError,
    handleDeleteSchedule,
    handleUpdateMaxRegistrations, // Return the new function
  }
}

export default useHooks

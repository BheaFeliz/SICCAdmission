import {
  useDeleteScheduleMutation,
  useUpdateAllSchedulesMutation,
} from '@/hooks/api/scheduleApi'
import { useSchedules } from '@/hooks/redux/useSchedule'

export const useHooks = () => {
  const { schedules, isLoading, isError } = useSchedules()
  const [deleteSchedule] = useDeleteScheduleMutation()
  const [updateAllSchedules] = useUpdateAllSchedulesMutation() // Correct mutation hook

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await deleteSchedule(scheduleId).unwrap()
      console.log(`Schedule with id ${scheduleId} deleted successfully`)
    } catch (error) {
      console.error(`Failed to delete schedule with id ${scheduleId}:`, error)
    }
  }

  const handleUpdateMaxRegistrations = async (scheduleId, maxRegistrations) => {
    try {
      await updateAllSchedules({
        scheduleId,
        max_registrations: maxRegistrations,
      }).unwrap()
      console.log(`Schedule with id ${scheduleId} updated successfully`)
    } catch (error) {
      console.error(`Failed to update schedule with id ${scheduleId}:`, error)
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

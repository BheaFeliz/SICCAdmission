import {
  useDeleteScheduleMutation,
  useUpdateAllSchedulesMutation,
} from '@/hooks/api/scheduleApi'
import { useSchedules } from '@/hooks/redux/useSchedule'

export const useHooks = () => {
  const { schedules, isLoading, isError } = useSchedules()
  const [deleteSchedule] = useDeleteScheduleMutation()
  const [updateAllSchedules] = useUpdateAllSchedulesMutation() // Add mutation for updating all schedules

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await deleteSchedule(scheduleId).unwrap()
      console.log(`Schedule with id ${scheduleId} deleted successfully`)
    } catch (error) {
      console.error(`Failed to delete schedule with id ${scheduleId}:`, error)
    }
  }

  const handleUpdateMaxRegistrationsForAll = async (maxRegistrations) => {
    try {
      await updateAllSchedules({ max_registrations: maxRegistrations }).unwrap()
      console.log('All schedules updated successfully')
    } catch (error) {
      console.error('Failed to update schedules:', error)
    }
  }

  return {
    schedules,
    isLoading,
    isError,
    handleDeleteSchedule,
    handleUpdateMaxRegistrationsForAll, // Return the new function
  }
}

export default useHooks

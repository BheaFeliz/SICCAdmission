import { useDeleteScheduleMutation } from '@/hooks/api/scheduleApi'
import { useSchedules } from '@/hooks/redux/useSchedule'

export const useHooks = () => {
  const { schedules, isLoading, isError } = useSchedules()
  const [deleteSchedule] = useDeleteScheduleMutation()

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await deleteSchedule(scheduleId).unwrap()
      console.log(`Schedule with id ${scheduleId} deleted successfully`)
    } catch (error) {
      console.error(`Failed to delete schedule with id ${scheduleId}:`, error)
    }
  }

  return {
    schedules,
    isLoading,
    isError,
    handleDeleteSchedule,
  }
}

export default useHooks

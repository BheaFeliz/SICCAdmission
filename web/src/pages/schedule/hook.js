import { useSchedules } from '@/hooks/redux/useSchedule'

export const useHooks = () => {
  const { schedules, isLoading, isError } = useSchedules()

  return {
    schedules,
    isLoading,
    isError,
  }
}

export default useHooks

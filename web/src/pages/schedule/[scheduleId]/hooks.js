import { useRouter } from 'next/router'

import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi'

export const useHooks = () => {
  const router = useRouter()
  const { scheduleId } = router.query

  const {
    data: schedule,
    isLoading,
    isError,
  } = useGetScheduleByIdQuery(scheduleId, {
    skip: !scheduleId,
  })

  const registrations = schedule?.registrations || []
  const scheduleName = schedule?.name || 'Unknown_Schedule'

  return {
    schedule,
    scheduleName,
    registrations,
    isLoading,
    isError,
  }
}

export default useHooks

import { useMemo } from 'react'

import { useGetActivityLogsQuery } from '../api/activityLogApi'

export const useActivityLog = () => {
  const { data, isError, isLoading } = useGetActivityLogsQuery()

  const logs = useMemo(() => data || [], [data])

  return {
    logs,
    isError,
    isLoading,
  }
}

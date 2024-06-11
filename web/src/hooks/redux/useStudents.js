import { useMemo } from 'react'

import { studentApi } from '../api/studentApi'

export const useStudents = () => {
  const { data, isError, isLoading } = studentApi.useGetRegistrationsQuery()

  const registration = useMemo(() => data?.registration || [], [data])

  return {
    registration,
    isError,
    isLoading,
  }
}

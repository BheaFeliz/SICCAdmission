import { useMemo } from 'react'

import { studentApi } from '../api/studentApi'

export const useStudents = () => {
  const { data, isError, isLoading } = studentApi.useGetStudentsQuery()

  const admissionform = useMemo(() => data?.admissionform || [], [data])

  return {
    admissionform,
    isError,
    isLoading,
  }
}

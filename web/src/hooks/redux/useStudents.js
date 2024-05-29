import { useMemo } from 'react'

import { studentApi } from '../api/studentApi'

export const useStudents = () => {
  const { data, isError, isLoading } = studentApi.useGetStudentsQuery()

  const admissionForms = useMemo(() => data?.admission_forms || [], [data])

  return {
    admissionForms,
    isError,
    isLoading,
  }
}

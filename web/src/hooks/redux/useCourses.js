import { useMemo } from 'react'

import { courseApi } from '../api/courseApi'

export const useCourses = () => {
  const { data, isError, isLoading } = courseApi.useGetCoursesQuery()

  const courses = useMemo(() => data?.courses || [], [data])

  return {
    courses,
    isError,
    isLoading,
  }
}

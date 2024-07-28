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

export const useCourse = (courseId) => {
  const { data, isError, isLoading } =
    courseApi.useGetCourseByCourseId(courseId)

  const course = useMemo(() => data?.course || {}, [data])

  return {
    course,
    isError,
    isLoading,
  }
}

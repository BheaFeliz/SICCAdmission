// hooks.js
import { useRouter } from 'next/router'

import { useCourses, useDeleteCourseMutation } from '@/hooks/redux/useCourses' // Correct import

const useHooks = () => {
  const router = useRouter()

  const { courses, isLoading } = useCourses(router.query.page || 1)
  const [deleteCourse] = useDeleteCourseMutation() // Ensure this is correct

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId).unwrap()
    } catch (error) {
      ('Failed to delete the course:', error)
    }
  }

  const onPageChange = (page) => {
    router.push({ pathname: '/courses', query: { page } })
  }

  return {
    courses,
    isLoading,
    currentPage: router.query.page || 1,
    onPageChange,
    handleDelete,
  }
}

export default useHooks

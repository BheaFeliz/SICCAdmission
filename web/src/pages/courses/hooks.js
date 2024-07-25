import { useRouter } from 'next/router'

import { useCourses } from '@/hooks/redux/useCourses'

const useHooks = () => {
  const router = useRouter()

  const { courses, isLoading } = useCourses(router.query.page || 1)

  const onPageChange = (page) => {
    router.push({ pathname: '/courses', query: { page } })
  }

  return {
    courses,
    isLoading,

    currentPage: router.query.page || 1,
    onPageChange,
  }
}

export default useHooks

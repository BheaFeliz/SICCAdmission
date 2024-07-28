import { useMemo } from 'react'
import { userApi } from '../api/userApi'

export const useUsers = () => {
  const { data, isError, isLoading } = userApi.useGetUsersQuery()
  const [deleteUser] = userApi.useDeleteUserMutation()

  const users = useMemo(() => data?.users || [], [data])

  return {
    users,
    isError,
    isLoading,
    deleteUser,
  }
}

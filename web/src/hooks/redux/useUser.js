import { useSelector } from 'react-redux'

export const useUser = () => {
  const user = useSelector((state) => state.authState.user)
  return user
}

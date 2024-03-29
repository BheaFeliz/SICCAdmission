import { useToast } from './useToast'

export const useHandleError = () => {
  const { addToast } = useToast()

  const handleError = (error) => {
    const errorMessage = error?.data?.message || 'Unknown error'

    if (!!errorMessage) {
      addToast({
        type: 'error',
        message: errorMessage,
      })
    }
  }

  return {
    handleError,
  }
}

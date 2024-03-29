import { useContext } from 'react'

import { ToastContext } from '@/components/templates/ToastProvider'

export const useToast = () => {
  const { addToast, removeToast } = useContext(ToastContext)
  return { addToast, removeToast }
}

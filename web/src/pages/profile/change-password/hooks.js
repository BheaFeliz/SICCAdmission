import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { HiOutlineUserCircle } from 'react-icons/hi'
import * as yup from 'yup'

import { useChangePasswordMutation } from '@/hooks/api/authApi'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'

const schema = yup.object({
  old_password: yup
    .string()
    .min(6, 'Old Password must be at least 6 characters')
    .required(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
  password_confirmation: yup
    .string()
    .min(6, 'Confirm Password must be at least 6 characters')
    .required()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    }),
})

export const useHooks = () => {
  const router = useRouter()
  const { addToast } = useToast()
  const { handleError } = useHandleError()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const [changePassword] = useChangePasswordMutation()

  const onSubmit = async (data) => {
    try {
      const { message } = await changePassword(data).unwrap()

      addToast({
        message: message,
      })
      router.push(`/profile`)
    } catch (error) {
      handleError(error)
    }
  }

  const breadcrumbs = [
    {
      href: '/profile',
      title: 'Profile',
      icon: HiOutlineUserCircle,
    },
    {
      href: '#',
      title: 'Change password',
    },
  ]

  return {
    breadcrumbs,
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      register,
    },
  }
}

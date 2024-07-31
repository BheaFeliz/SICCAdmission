import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { errors } from '@/constants/formErrors'
import { userApi } from '@/hooks/api/userApi'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'

const schema = yup.object({
  name: yup.string().required(errors.required),
  username: yup.string().min(4).required(errors.required),
  email: yup.string().email().required(errors.required),
  password: yup
    .string()
    .required(errors.required)
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(errors.required),
  role: yup.string().oneOf(['staff', 'admin']).required(errors.required),
  phone: yup.string().nullable(),
  position: yup.string().nullable(errors.required),
})

export const useHooks = () => {
  const router = useRouter()
  const { addToast } = useToast()
  const { handleError } = useHandleError()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { role: 'staff' },
    resolver: yupResolver(schema),
  })

  const [createUserMutation] = userApi.useRegisterMutation()

  const onSubmit = async (data) => {
    try {
      const { message } = await createUserMutation(data).unwrap()

      addToast({
        message: message,
      })
      router.push(`/users`)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      register,
    },
  }
}

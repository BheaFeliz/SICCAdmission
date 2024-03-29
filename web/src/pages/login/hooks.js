import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { errors } from '@/constants/formErrors'
import { authApi } from '@/hooks/api/authApi'
import { useUser } from '@/hooks/redux/auth'
import { useHandleError } from '@/hooks/useHandleError'

const schema = yup
  .object({
    username: yup.string().required(errors.required),
    password: yup.string().required(errors.required),
  })
  .required()

export function useHooks() {
  const router = useRouter()
  const { login } = useUser()
  const { handleError } = useHandleError()
  const [loginMutation] = authApi.useLoginMutation()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      const { token } = await loginMutation(data).unwrap()
      login(token)
      router.push('/dashboard')
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

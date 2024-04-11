import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { errors } from '@/constants/formErrors'
import { userApi } from '@/hooks/api/userApi'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'

const schema = yup.object({
  id: yup.string().required(errors.required),
  firstname: yup.string().required(errors.required),
  lastname: yup.string().required(errors.required),
  age: yup.number().required(errors.required),
  gender: yup.string().required(errors.required),
  course: yup.string().required(errors.required),
  district: yup.string().required(errors.required),
});

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

  const [createUserMutation] = userApi.useCreateUserMutation()

  const onSubmit = async (data) => {
    try {
      const { message } = await createUserMutation(data).unwrap()

      addToast({
        message: message,
      })
      router.push(`/students`)
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

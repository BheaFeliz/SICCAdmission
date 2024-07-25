// src/pages/course/hooks.js
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { errors } from '@/constants/formErrors'
import { courseApi } from '@/hooks/api/courseApi'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'

const schema = yup.object({
  value: yup.string().required(errors.required),
  label: yup.string().required(errors.required),
})

export const useHooks = () => {
  const router = useRouter()
  const { addToast } = useToast()
  const { handleError } = useHandleError()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: '',
      label: '',
    },
  })

  const [addCourse] = courseApi.useAddCourseMutation()

  const onSubmit = async (data) => {
    try {
      const { message } = await addCourse(data).unwrap()

      addToast({
        message: message,
      })
      reset()
      router.push(`/courses`)
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

export default useHooks

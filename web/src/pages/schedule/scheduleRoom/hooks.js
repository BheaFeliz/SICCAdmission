// src/pages/schedule/scheduleRoom/hooks.js

import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { scheduleApi } from '@/hooks/api/scheduleApi'
import { useHandleError } from '@/hooks/useHandleError'

const schema = yup.object().shape({
  name: yup.string().required('Room Name is required'),
  date: yup.date().required('Date is required'),
  startTime: yup.string().required('Start time is required'),
  endTime: yup
    .string()
    .required('End time is required')
    .test(
      'is-greater',
      'End time should be later than start time',
      function (value) {
        const { startTime } = this.parent
        return value > startTime
      },
    ),
  session: yup.string().required('Session is required'),
  remark: yup
    .string()
    .nullable()
    .max(200, 'Remark cannot be more than 200 characters'),
  max_registrations: yup
    .number()
    .required('Max Registrations is required')
    .positive('Max Registrations must be a positive number')
    .integer('Max Registrations must be an integer'),
})

const useHooks = () => {
  const router = useRouter()
  const { handleError } = useHandleError()
  const [createScheduleMutation] = scheduleApi.useCreateScheduleMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      // Format the date to 'yyyy-MM-dd' before sending it to the server
      data.date = format(new Date(data.date), 'yyyy-MM-dd')

      await createScheduleMutation({
        ...data,
      }).unwrap()
      router.push('/schedule')
    } catch (error) {
      handleError(error)
    }
  }

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  }
}

export default useHooks
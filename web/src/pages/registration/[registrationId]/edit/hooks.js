import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { studentApi } from '@/hooks/api/studentApi'
import { useStudent } from '@/hooks/redux/useStudents'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'

const schema = Yup.object().shape({
  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  age: Yup.string().required('Age is required'),
  date: Yup.string().required('Date is required'),
  year: Yup.string().required('Year is required'),
  contactnumber: Yup.string().required('Contact Number is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  pbirth: Yup.string().required('Place of Birth is required'),
  barangay: Yup.string().required('Barangay is required'),
  cityM: Yup.string().required('City/Municipality is required'),
  province: Yup.string().required('Province is required'),
  Zcode: Yup.number().required('Zip Code is required'),
  fileinput: Yup.mixed().nullable(),
})

export function useHooks() {
  const router = useRouter()
  const { addToast } = useToast()
  const { registrationId } = router.query
  const { registration, isLoading } = useStudent(registrationId)
  const { handleError } = useHandleError()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({ resolver: yupResolver(schema) })

  const [updateRegistration, { isLoading: isUpdating }] =
    studentApi.useUpdateRegistrationMutation()

  const onSubmit = async (formData) => {
    try {
      const updatedData = {
        ...formData,
        registrationId,
      }
      await updateRegistration(updatedData).unwrap()
      addToast({
        message: 'Updated registration successfully',
      })
      router.push(`/registration/${registrationId}`)
    } catch (error) {
      handleError(error)
    }
  }
  useEffect(() => {
    if (registration) {
      reset({ ...registration })
    }
  }, [registration, reset])

  return {
    registration,
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      register,
      isLoading: isLoading || isUpdating,
      updateRegistration,
      control,
    },
  }
}

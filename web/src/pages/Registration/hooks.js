import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { studentApi } from '@/hooks/api/studentApi'
import { useToast } from '@/hooks/useToast'

const registrationSchema = Yup.object().shape({
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
  courseId: Yup.string().required('Course is required'),
})

export function useHooks() {
  const router = useRouter()
  const { addToast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  })

  const [CreateRegistrationMutation] =
    studentApi.useCreateRegistrationMutation()

  const onSubmit = async (data) => {
    const payload = new FormData()

    // Iterate over form data keys
    Object.keys(data).forEach((key) => {
      const value = data[key]

      if (key === 'fileinput') {
        // Handle fileinput (image) field
        if (value instanceof FileList) {
          // Handle multiple file uploads
          for (let i = 0; i < value.length; i++) {
            payload.append('fileinput[]', value[i]) // Append each file to 'fileinput[]'
          }
        } else if (value instanceof File) {
          // Handle single file upload
          payload.append('fileinput[]', value)
        }
      } else {
        // Append other form data fields
        payload.append(key, value)
      }
    })

    try {
      const { message } = await CreateRegistrationMutation(payload).unwrap()
      addToast({ message })
      router.push('/registration/referenceView') // Redirect to success page
    } catch (error) {
      console.error('Error creating student:', error)
      // Handle error
      addToast({ message: 'Failed to submit registration' }) // Example of error handling with toast message
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

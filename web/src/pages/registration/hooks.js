import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useFieldArray, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { studentApi } from '@/hooks/api/studentApi'
import { useToast } from '@/hooks/useToast'

const registrationSchema = Yup.object().shape({
  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  birthdate: Yup.string().required('Birthdate is required'),
  contactnumber: Yup.string().required('Contact Number is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  pbirth: Yup.string().required('Place of Birth is required'),
  home_address: Yup.string().required('Home address is required'),
  present_address: Yup.string().required('Present address is required'),
  studenttype: Yup.string().required('Student application is required'),
  StudentCat: Yup.string().required('Student category is required'),
  father_name: Yup.string().required("Father's name is required"),
  mother_maiden_name: Yup.string().required("Mother's maiden name is required"),
  total_monthly_income: Yup.string().required('Total monthly income is required'),
  family_members: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().nullable(),
        relationship: Yup.string().nullable(),
        age: Yup.string().nullable(),
        mobile: Yup.string().nullable(),
        education: Yup.string().nullable(),
        occupation: Yup.string().nullable(),
        income: Yup.string().nullable(),
      }),
    )
    .min(1, 'Please add at least one household member'),
  fileinput: Yup.mixed().test(
    'file-required',
    'ID photo is required',
    (value) => value && value.length > 0,
  ),
  psa_certificate: Yup.mixed().nullable(),
  marriage_certificate: Yup.mixed().nullable(),
  courseId: Yup.string().required('Course is required'),
})

const emptyFamilyMember = () => ({
  name: '',
  relationship: '',
  age: '',
  mobile: '',
  education: '',
  occupation: '',
  income: '',
})

export function useHooks() {
  const router = useRouter()
  const { addToast } = useToast()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      family_members: [emptyFamilyMember()],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'family_members',
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
      } else if (key === 'family_members' && Array.isArray(value)) {
        value.forEach((member, index) => {
          if (!member) return
          Object.entries(member).forEach(([memberKey, memberValue]) => {
            payload.append(
              `family_members[${index}][${memberKey}]`,
              memberValue ?? '',
            )
          })
        })
      } else if (['psa_certificate', 'marriage_certificate'].includes(key)) {
        if (value instanceof FileList) {
          if (value.length > 0) {
            payload.append(key, value[0])
          }
        } else if (value instanceof File) {
          payload.append(key, value)
        }
      } else {
        // Append other form data fields
        payload.append(key, value ?? '')
      }
    })

    try {
      const { message, reference_number } = await CreateRegistrationMutation(
        payload,
      ).unwrap()
      addToast({ message })
      // Redirect to the reference view with the specific reference number
      if (reference_number) {
        router.push(`/registration/referenceView?ref=${reference_number}`)
      } else {
        router.push('/registration/referenceView')
      }
    } catch (error) {
      addToast({ message: 'Failed to submit registration' }) // Example of error handling with toast message
    }
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      register,
    },
    familyMembers: fields,
    addFamilyMember: () => append(emptyFamilyMember()),
    removeFamilyMember: (index) => {
      if (fields.length === 1) return
      remove(index)
    },
    watch,
    setValue,
  }
}

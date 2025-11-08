import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { studentApi } from '@/hooks/api/studentApi'
import { useStudent } from '@/hooks/redux/useStudents'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'

const schema = Yup.object().shape({
  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  birthdate: Yup.string().required('Birthdate is required'),
  contactnumber: Yup.string().required('Contact Number is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  pbirth: Yup.string().required('Place of Birth is required'),
  barangay: Yup.string().required('Barangay is required'),
  cityM: Yup.string().required('City/Municipality is required'),
  province: Yup.string().required('Province is required'),
  Zcode: Yup.number().required('Zip Code is required'),
  home_address: Yup.string().required('Home address is required'),
  present_address: Yup.string().required('Present address is required'),
  semester: Yup.string().required('Semester is required'),
  academic_year_start: Yup.string().required('Academic year start is required'),
  academic_year_end: Yup.string().required('Academic year end is required'),
  application_date: Yup.string().required('Date of application is required'),
  studenttype: Yup.string().required('Student application is required'),
  StudentCat: Yup.string().required('Student category is required'),
  father_name: Yup.string().required("Father's name is required"),
  mother_maiden_name: Yup.string().required("Mother's maiden name is required"),
  total_monthly_income: Yup.string().required('Total monthly income is required'),
  courseId: Yup.string().required('Course is required'),
  family_members: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().nullable(),
      relationship: Yup.string().nullable(),
      age: Yup.string().nullable(),
      mobile: Yup.string().nullable(),
      education: Yup.string().nullable(),
      occupation: Yup.string().nullable(),
      income: Yup.string().nullable(),
    }),
  ),
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
  const { registrationId } = router.query
  const { registration, isLoading } = useStudent(registrationId)
  const { handleError } = useHandleError()
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      application_date: new Date().toISOString().split('T')[0],
      family_members: [emptyFamilyMember()],
    },
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'family_members',
  })

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
      const birthdate = registration.birthdate
        ? dayjs(registration.birthdate).format('YYYY-MM-DD')
        : deriveBirthdate(registration)

      const applicationDate = registration.application_date
        ? dayjs(registration.application_date).format('YYYY-MM-DD')
        : new Date().toISOString().split('T')[0]

      const householdMembers =
        (registration.family_members && registration.family_members.length > 0
          ? registration.family_members
          : [emptyFamilyMember()])

      reset({
        ...registration,
        birthdate,
        application_date: applicationDate,
        family_members: householdMembers,
      })
      replace(householdMembers)
    }
  }, [registration, reset, replace])

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

const deriveBirthdate = (registration) => {
  if (!registration?.year || !registration?.monthoption) return ''
  const date = registration.date || 1
  const normalized = new Date(
    `${registration.monthoption} ${date}, ${registration.year}`,
  )
  if (Number.isNaN(normalized.getTime())) return ''
  return normalized.toISOString().split('T')[0]
}

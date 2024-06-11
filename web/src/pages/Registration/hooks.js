import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { useCreateStudentMutation } from '@/hooks/api/studentApi'
import { useToast } from '@/hooks/useToast'

const registrationSchema = Yup.object().shape({
  fname: Yup.string().required('First name is required'),
  lname: Yup.string().required('Last name is required'),
  mname: Yup.string().required('Middle name is required'),
  pref: Yup.string()
    .nullable()
    .oneOf(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV'], 'Invalid suffix'),
  age: Yup.number().integer().required('Age is required'),
  monthoption: Yup.string().required('Month is required'),
  date: Yup.number().integer().required('Date is required'),
  year: Yup.number().integer().required('Year is required'),
  sex: Yup.string().required('Sex is required').oneOf(['male', 'female']),
  gender: Yup.string()
    .required('Gender is required')
    .oneOf(['man', 'woman', 'lgbtqa+']),
  civilstatus: Yup.string()
    .required('Civil status is required')
    .oneOf(['single', 'married', 'widowed', 'singleparent', 'livein']),
  contactnumber: Yup.string()
    .required('Contact number is required')
    .matches(/^\d{11}$/, 'Invalid contact number'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  pbirth: Yup.string().required('Place of birth is required'),
  indigentP: Yup.string()
    .required('Indigent information is required')
    .oneOf(['yes', 'no']),
  indigentPy: Yup.string().when('indigentP', {
    is: 'yes',
    then: Yup.string().required('Specify indigenous group'),
    otherwise: Yup.string().nullable(),
  }),
  pbs: Yup.string().required('Purok/Block/Sitio is required'),
  district: Yup.string()
    .required('District is required')
    .oneOf(['d1', 'd2', 'd3']),
  barangay: Yup.string().required('Barangay is required'),
  cityM: Yup.string().required('City/Municipality is required'),
  province: Yup.string().required('Province is required'),
  Zcode: Yup.number().integer().required('Zip code is required'),
  familyB: Yup.string()
    .required('Family background is required')
    .oneOf(['plt', 'df', 'dm', 'dr', 'mr', 'pssw']),
  sincewhen: Yup.string().when('familyB', {
    is: (val) => val === 'plt',
    then: Yup.string().required('Specify since when'),
  }),
  Nsibling: Yup.string().required('Number of siblings is required'),
  supstudy: Yup.string().required('Support for study is required'),
  ofw: Yup.string().nullable().oneOf(['yes', 'no']),
  ofwProfession: Yup.string().when('ofw', {
    is: 'yes',
    then: Yup.string().required('Specify profession of family member abroad'),
    otherwise: Yup.string().nullable(),
  }),
  StudentCat: Yup.string()
    .required('Student category is required')
    .oneOf(['Ftime', 'Wstudent']),
  Nwork: Yup.string().when('StudentCat', {
    is: 'Wstudent',
    then: Yup.string().required('Nature of work is required'),
    otherwise: Yup.string().nullable(),
  }),
  studenttype: Yup.string()
    .required('Student type is required')
    .oneOf(['college1', 'trans', 'returnee', 'crossenrolle']),
  F_nameSchool: Yup.string().when('studenttype', {
    is: 'college1',
    then: Yup.string().required('Last school attended is required'),
    otherwise: Yup.string().nullable(),
  }),
  F_Atrack: Yup.string().when('studenttype', {
    is: 'college1',
    then: Yup.string().required('Academic track is required'),
    otherwise: Yup.string().nullable(), // Corrected closing parenthesis
  }),
})

export function useHooks() {
  const router = useRouter()
  const { addToast } = useToast()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: {}, resolver: yupResolver(registrationSchema) })
  const [createStudentMutation] = useCreateStudentMutation()

  const onSubmit = async (data) => {
    try {
      const { message } = await createStudentMutation(data).unwrap()
      addToast({
        message: message,
      })
      router.push('/subfile')
    } catch (error) {
      error('Error creating student:', error)
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

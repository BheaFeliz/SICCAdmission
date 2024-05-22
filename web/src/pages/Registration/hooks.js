import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'

const validationSchema = Yup.object().shape({
  fname: Yup.string().required(),
  lname: Yup.string().required(),
  mname: Yup.string().required(),
  prefix: Yup.string().nullable(),
  age: Yup.number().integer().required(),
  Monthoption: Yup.string()
    .required()
    .oneOf(dateoption.map((option) => option.value)),
  date: Yup.number().integer().required(),
  year: Yup.number().integer().required(),
  sex: Yup.string()
    .required()
    .oneOf(sex.map((option) => option.value)),
  gender: Yup.string()
    .required()
    .oneOf(Gender.map((option) => option.value)),
  civilstatus: Yup.string()
    .required()
    .oneOf(Civilstatus.map((option) => option.value)),
  contactnumber: Yup.string()
    .required()
    .matches(/^\d{11}$/, 'Invalid contact number'),
  email: Yup.string().email().required(),
  pbirth: Yup.string().nullable(),
  IndigentP: Yup.string()
    .required()
    .oneOf(IndigentP.map((option) => option.value)),
  IndigentPy: Yup.string().nullable(),
  pbs: Yup.string().nullable(),
  district: Yup.string().required(),
  brgy: Yup.string().required(),
  cityM: Yup.string().required(),
  province: Yup.string().required(),
  Zcode: Yup.number().integer().nullable(),
  familyB: Yup.string()
    .required()
    .oneOf(famBackground.map((option) => option.value)),
  sincewhen: Yup.string().nullable(),
  Nsibling: Yup.string().nullable(),
  supstudy: Yup.string().nullable(),
  ofw: Yup.string()
    .nullable()
    .oneOf(ofw.map((option) => option.value)),
  ofwProfession: Yup.string().nullable(),
  Studenttype: Yup.string()
    .required()
    .oneOf(Studenttype.map((option) => option.value)),
  StudentCat: Yup.string()
    .required()
    .oneOf(Scategory.map((option) => option.value)),
  F_nameSchool: Yup.string().required(),
  F_Atrack: Yup.string().required(),
  F_AMprovince: Yup.string().nullable(),
  F_Ygrad: Yup.string().required(),
  T_nameSchool: Yup.string().required(),
  T_Atrack: Yup.string().required(),
  T_AMprovince: Yup.string().nullable(),
  T_Ygrad: Yup.string().required(),
  selectcourse: Yup.string()
    .required()
    .oneOf(Scourse.map((option) => option.value)),
  email_verified_at: Yup.date().nullable(),
})

export default validationSchema

export function useFormSubmission() {
  const router = useRouter()
  const { addToast } = useToast()
  const { handleError } = useHandleError()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      // Provide default values for your form fields here
    },
    resolver: yupResolver(schema), // Use Yup schema for form validation
  })

  const onSubmit = async (data) => {
    // Logic for form submission
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      register,
      control,
    },
  }
}

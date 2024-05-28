import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useCreateStudentMutation } from '@/hooks/api/studentApi';
import { useToast } from '@/hooks/useToast';

const registrationSchema = Yup.object().shape({
  fname: Yup.string().required(),
  lname: Yup.string().required(),
  mname: Yup.string().required(),
  pref: Yup.string().nullable().oneOf(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV', null]),
  age: Yup.number().integer().required(),
  Monthoption: Yup.string().required().oneOf(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']),
  date: Yup.number().integer().required(),
  year: Yup.number().integer().required(),
  sex: Yup.string().required().oneOf(['male', 'female']),
  gender: Yup.string().required().oneOf(['man', 'woman', 'lgbtqa+']),
  civilstatus: Yup.string().required().oneOf(['single', 'married', 'widowed', 'singleparent', 'livein']),
  contactnumber: Yup.string().required().matches(/^\d{11}$/, 'Invalid contact number'),
  email: Yup.string().email().required(),
  pbirth: Yup.string().nullable(),
  IndigentP: Yup.string().required().oneOf(['yes', 'no']),
  IndigentPy: Yup.string().nullable(),
  pbs: Yup.string().nullable(),
  district: Yup.string().required().oneOf(['d1', 'd2', 'd3']),
  barangay: Yup.string().required(),
  cityM: Yup.string().required(),
  province: Yup.string().required(),
  Zcode: Yup.number().integer().nullable(),
  familyB: Yup.string().required().oneOf(['plt', 'df', 'dm', 'dr', 'mr', 'pssw']),
  sincewhen: Yup.string().nullable(),
  Nsibling: Yup.string().nullable(),
  supstudy: Yup.string().nullable(),
  ofw: Yup.string().nullable().oneOf(['yes', 'no']),
  ofwProfession: Yup.string().nullable(),
  studenttype: Yup.string().required().oneOf(['college1', 'trans', 'returnee', 'crossenrolle']),
  Nwork: Yup.string().nullable().required(),
  StudentCat: Yup.string().required().oneOf(['Ftime', 'Wstudent']),
  F_nameSchool: Yup.string().required(),
  F_Atrack: Yup.string().required(),
  F_AMprovince: Yup.string().nullable(),
  F_Ygrad: Yup.string().required(),
  T_nameSchool: Yup.string().required(),
  T_Atrack: Yup.string().required(),
  T_AMprovince: Yup.string().nullable(),
  T_Ygrad: Yup.string().required(),
  selectcourse: Yup.string().required().oneOf(['bsab', 'bse', 'bpa', 'bstmt', 'bsc']),
  email_verified_at: Yup.date().nullable(),
});

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
    const { message } = await createStudentMutation(data).unwrap()
    addToast({
      message: message,
    })
    router.push('/subfile')
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      register,
    },
  }
}

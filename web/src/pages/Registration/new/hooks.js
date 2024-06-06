import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useCreateRegistrationMutation } from '@/hooks/api/studentApi';
import { useToast} from '@/hooks/useToast';


const registrationSchema = Yup.object().shape({
  fname: Yup.string().required('Required'),
  lname: Yup.string().required('Required'),
  mname: Yup.string().required('Required'),
  pref: Yup.string().required('Required').nullable().oneOf([,'Jr.', 'Sr.', 'I', 'II', 'III', 'IV', "null"]),
  age: Yup.number().integer().required().typeError('Required'),
  Monthoption: Yup.string().required().oneOf(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']),
  date: Yup.number().integer().required().typeError('Required'),
  year: Yup.number().integer().required('Required').typeError('Required'),
  sex: Yup.string().required().oneOf(['male', 'female']),
  gender: Yup.string().required().oneOf(['man', 'woman', 'lgbtqa+']),
  civilstatus: Yup.string().required().oneOf(['single', 'married', 'widowed', 'singleparent', 'livein']),
  contactnumber: Yup.string().required().matches(/^\d{11}$/, 'Invalid contact number').typeError('Required'),
  email: Yup.string().email().required('Required'),
  pbirth: Yup.string().nullable().required('Required'),
  indigentP: Yup.string().required('Required').oneOf(['yes', 'no']),
  indigentPy: Yup.string().nullable().required('Required') ,
  pbs: Yup.string().nullable().required('Required'),
  district: Yup.string().required().oneOf(['d1', 'd2', 'd3']),
  barangay: Yup.string().required('Required'),
  cityM: Yup.string().required('Required'),
  province: Yup.string().required('Required'),
  Zcode: Yup.number().integer().nullable().required('Required'),
  familyB: Yup.string().required().oneOf(['plt', 'df', 'dm', 'dr', 'mr', 'pssw']),
  sincewhen: Yup.string().nullable().required('Required'),
  Nsibling: Yup.string().nullable().required('Required'),
  supstudy: Yup.string().nullable().required('Required'),
  ofw: Yup.string().nullable().oneOf([,'yes', 'no']),
  ofwProfession: Yup.string().nullable().required(),
  StudentCat: Yup.string().required().oneOf(['Ftime', 'Wstudent,']),
  Nwork: Yup.string().nullable().required('Required'),
  studenttype: Yup.string().required().oneOf(['college1', 'trans', 'returnee', 'crossenrolle']),
  F_nameSchool: Yup.string().required('Required'),
  F_Atrack: Yup.string().required('Required'),
  F_AMprovince: Yup.string().nullable().required('Required'),
  F_Ygrad: Yup.string().required('Required'),
  T_nameSchool: Yup.string().required('Required'),
  T_Atrack: Yup.string().required('Required'),
  T_AMprovince: Yup.string().nullable('Required'),
  T_Ygrad: Yup.string().required('Required'),
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
  const [CreateRegistrationMutation] = useCreateRegistrationMutation()

  const onSubmit = async (data) => {
    try {
      const { message } = await CreateRegistrationMutation(data).unwrap();
      addToast({
        message: message,
      });
      router.push('/subfile');
    } catch (error) {
      error('Error creating student:', error);
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

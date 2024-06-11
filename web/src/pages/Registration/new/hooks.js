import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { studentApi } from '@/hooks/api/studentApi';
import { useToast } from '@/hooks/useToast';

const registrationSchema = Yup.object().shape({
  fname: Yup.string().required('First Name is Required'),
  lname: Yup.string().required('Last Name is Required'),
  mname: Yup.string().nullable(),
  pref: Yup.string().nullable().oneOf(['Jr.', 'Sr.', 'I', 'II', 'III', 'IV', null]),
  age: Yup.number().integer().nullable().typeError('Number is Required'),
  Monthoption: Yup.string().nullable().oneOf(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']),
  date: Yup.number().integer().nullable().typeError('Date is Required'),
  year: Yup.number().integer().nullable().typeError('Year is Required'),
  sex: Yup.string().nullable().oneOf(['male', 'female']),
  gender: Yup.string().nullable().oneOf(['man', 'woman', 'lgbtqa+']),
  civilstatus: Yup.string().nullable().oneOf(['single', 'married', 'widowed', 'singleparent', 'livein']),
  contactnumber: Yup.string().nullable().matches(/^\d{11}$/, 'Invalid contact number').typeError('Contact number is Required'),
  email: Yup.string().email().required('E-mail is Required'),
  pbirth: Yup.string().nullable(),
  indigentP: Yup.string().nullable().oneOf(['yes', 'no']),
  indigentPy: Yup.string().nullable(),
  pbs: Yup.string().nullable(),
  district: Yup.string().nullable().oneOf(['d1', 'd2', 'd3']),
  barangay: Yup.string().nullable(),
  cityM: Yup.string().nullable(),
  province: Yup.string().nullable(),
  Zcode: Yup.number().integer().nullable(),
  familyB: Yup.string().nullable().oneOf(['plt', 'df', 'dm', 'dr', 'mr', 'pssw']),
  sincewhen: Yup.string().nullable(),
  Nsibling: Yup.string().nullable(),
  supstudy: Yup.string().nullable(),
  ofw: Yup.string().nullable().oneOf(['yes', 'no']),
  ofwProfession: Yup.string().nullable(),
  StudentCat: Yup.string().nullable().oneOf(['Ftime', 'Wstudent']),
  Nwork: Yup.string().nullable(),
  studenttype: Yup.string().nullable().oneOf(['college1', 'trans', 'returnee', 'crossenrolle']),
  F_nameSchool: Yup.string().nullable(),
  F_Atrack: Yup.string().nullable(),
  F_AMprovince: Yup.string().nullable(),
  F_Ygrad: Yup.string().nullable(),
  T_nameSchool: Yup.string().nullable(),
  T_Atrack: Yup.string().nullable(),
  T_AMprovince: Yup.string().nullable('Required'),
  T_Ygrad: Yup.string().required('Required'),
  selectcourse: Yup.string().required().oneOf(['bsab', 'bse', 'bpa', 'bstmt', 'bsc']),
  email_verified_at: Yup.date().nullable(),
});

export function useHooks() {
  const router = useRouter();
  const { addToast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const [CreateRegistrationMutation] = studentApi.useCreateRegistrationMutation();

  const onSubmit = async (data) => {
    console.log('Submitting form with data:', data); // Log the form data being submitted
    try {
      const { message } = await CreateRegistrationMutation(data).unwrap();
      console.log('Form submission successful:', message); // Log success message
      addToast({ message });
      router.push('/registration');
    } catch (error) {
      console.error('Error creating student:', error); // Log any errors that occur
      // Handle error appropriately
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      register,
    },
  };
}

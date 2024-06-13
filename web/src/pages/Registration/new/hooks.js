import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { studentApi } from '@/hooks/api/studentApi';
import { useToast } from '@/hooks/useToast';

const registrationSchema = Yup.object().shape({
  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  age: Yup.string().required('Age is required'),
  date: Yup.string().required('Date is required'),
  year: Yup.string().required('Year is required'),
  contactnumber: Yup.number().required('Contact Number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  pbirth: Yup.string().required('Place of Birth is required'),
  barangay: Yup.string().required('Barangay is required'),
  cityM: Yup.string().required('City/Municipality is required'),
  province: Yup.string().required('Province is required'),
  Zcode: Yup.number().required('Zip Code is required'),
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

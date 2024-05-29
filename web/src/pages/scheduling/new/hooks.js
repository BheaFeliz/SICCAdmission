import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { scheduleApi } from '@/hooks/api/scheduleApi';
import { useHandleError } from '@/hooks/useHandleError';

const schema = yup.object().shape({
  date: yup.date().required('Date is required'),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string().required('End time is required').test(
    'is-greater',
    'End time should be later than start time',
    function (value) {
      const { startTime } = this.parent;
      return value > startTime;
    }
  ),
  description: yup.string().nullable().max(100, 'Description cannot be more than 100 characters'),
});

const useHooks = () => {
  const router = useRouter();
  const { handleError } = useHandleError();
  const [createScheduleMutation] = scheduleApi.useCreateScheduleMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      // Format the date to 'yyyy-MM-dd' before sending it to the server
      data.date = format(new Date(data.date), 'yyyy-MM-dd');
      
      await createScheduleMutation({
        ...data,
      }).unwrap();
      router.push('/scheduling');
    } catch (error) {
      handleError(error);
    }
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
};

export default useHooks;

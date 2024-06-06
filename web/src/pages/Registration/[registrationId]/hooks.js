import { useRouter } from 'next/router';

import { useDeleteRegistrationMutation,useGetRegistrationByIdQuery } from '@/hooks/api/studentApi'; // Adjust the import path as needed
import { useToast } from '@/hooks/useToast';

const useHooks = (registrationId) => {
  const router = useRouter();
  const { addToast } = useToast();

  const { data: registration, isLoading } = useGetRegistrationByIdQuery(registrationId);
  const [deleteRegistration, { isLoading: isDeleteLoading }] = useDeleteRegistrationMutation();

  const handleDelete = async () => {
    try {
      await deleteRegistration(registrationId);
      router.push(`/registration`);
    } catch (error) {
      addToast({ message: 'Error deleting registration', type: 'error' });
    }
  };

  return {
    registration,
    isLoading,
    isDeleteLoading,
    handleDelete,
  };
};

export default useHooks;

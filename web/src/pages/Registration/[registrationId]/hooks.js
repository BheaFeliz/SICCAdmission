import { useRouter } from 'next/router';

import { useDeleteRegistrationMutation } from '@/hooks/api/studentApi'; // Adjust the import path as needed
import { useStudent } from '@/hooks/redux/useStudents';
import { useToast } from '@/hooks/useToast';

const useHooks = (registrationId) => {
  const router = useRouter();
  const { addToast } = useToast();

  const { registration, isLoading } = useStudent(registrationId);
  const [deleteRegistration, { isLoading: isDeleteLoading }] = useDeleteRegistrationMutation();

  const handleDelete = async () => {
    try {
      await deleteRegistration(registrationId).unwrap();
      addToast({ message: 'Registration deleted successfully', type: 'success' });
      router.push('/registration');
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

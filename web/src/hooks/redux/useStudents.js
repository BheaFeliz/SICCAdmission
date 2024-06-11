import { useMemo } from 'react';

import { useGetRegistrationsQuery } from '../api/studentApi';

export const useStudents = () => {
  const { data, isError, isLoading } = useGetRegistrationsQuery();

  const registrations = useMemo(() => data?.registrations || [], [data]);

  return {
    registrations,
    isError,
    isLoading,
  };
};

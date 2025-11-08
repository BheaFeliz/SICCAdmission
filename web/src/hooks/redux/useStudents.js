import { useMemo } from 'react';

import { useGetRegistrationByIdQuery, useGetRegistrationsQuery } from '../api/studentApi';

export const useStudents = () => {
  const { data, isError, isLoading } = useGetRegistrationsQuery();

  const registrations = useMemo(() => data?.registrations || [], [data]);

  return {
    registrations,
    isError,
    isLoading,
  };
};

export const useStudent = (registrationId) => {
  const { data, isError, isLoading } = useGetRegistrationByIdQuery(registrationId, {
    skip: !registrationId,
  })
  const registration = useMemo(() => data?.registration || [], [data]);

  return {
    registration,
    isError,
    isLoading,
  }
}

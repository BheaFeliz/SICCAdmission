// roomdetailsHooks.js

import { useState } from 'react';

import { useGetSchedulesQuery } from '@/hooks/api/scheduleApi';
import { useStudents } from '@/hooks/redux/useStudents';

const useRoomDetails = (cardId) => {
  const { data: scheduling, error: scheduleError, isLoading: scheduleLoading } = useGetSchedulesQuery(cardId);
  const { registrations, isLoading: studentsLoading } = useStudents();

  const [currentPage, setCurrentPage] = useState(1);

  return {
    scheduling,
    scheduleError,
    scheduleLoading,
    studentsError: null, // Assuming no separate error state for students in the given code
    studentsLoading,
    registrations,
    currentPage,
    setCurrentPage,
  };
};

export default useRoomDetails;

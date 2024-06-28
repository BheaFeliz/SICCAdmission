import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillSchedule } from "react-icons/ai";

import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi';
import { useGetRegistrationsQuery } from '@/hooks/api/studentApi';

const useCardDetailsHooks = () => {
  const router = useRouter();
  const { cardId } = router.query;

  const [schedule, setSchedule] = useState(null);
  const [students, setStudents] = useState([]);

  const { data: scheduleData, error: scheduleError, isLoading: scheduleLoading } = useGetScheduleByIdQuery(cardId);
  const { data: registrationsData, error: registrationsError, isLoading: registrationsLoading } = useGetRegistrationsQuery();

  useEffect(() => {
    if (scheduleData && !scheduleLoading) {
      setSchedule(scheduleData);
    }
    if (scheduleError) {
      console.error('Error fetching schedule:', scheduleError);
    }
  }, [scheduleData, scheduleLoading, scheduleError]);

  useEffect(() => {
    if (registrationsData && !registrationsLoading && schedule) {
      const filteredStudents = registrationsData.filter(reg => reg.roomId === schedule.id);
      setStudents(filteredStudents);
    }
    if (registrationsError) {
      console.error('Error fetching registrations:', registrationsError);
    }
  }, [registrationsData, registrationsLoading, registrationsError, schedule]);

  const breadcrumbs = [
    { href: '/scheduling', title: 'Scheduling', icon: AiFillSchedule },
    { href: `/scheduling/${cardId}/roomdetails`, title: `Room ${cardId}` }
  ];

  return {
    cardData: schedule,
    students,
    isLoading: scheduleLoading,
    error: scheduleError,
    breadcrumbs,
  };
};

export default useCardDetailsHooks;

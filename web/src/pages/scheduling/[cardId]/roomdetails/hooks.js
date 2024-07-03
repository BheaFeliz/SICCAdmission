import { useEffect,useState } from 'react';

import { useGetSchedulesQuery } from '@/hooks/api/scheduleApi';
import { useGetRegistrationsQuery } from '@/hooks/api/studentApi';

const useRoomDetails = (cardId) => {
    const { data: scheduling, error: scheduleError, isLoading: scheduleLoading } = useGetSchedulesQuery(cardId);
    const { data: registrations, error: studentsError, isLoading: studentsLoading, refetch } = useGetRegistrationsQuery({ schedule_id: cardId });

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refetch();
    }, [cardId, refetch]);

    // Console logging
    useEffect(() => {
        console.log('Scheduling data:', scheduling);
        console.log('Registrations data:', registrations);
        console.log('Errors:', { scheduleError, studentsError });
    }, [scheduling, registrations, scheduleError, studentsError]);

    return {
        scheduling,
        scheduleError,
        scheduleLoading,
        studentsError,
        studentsLoading,
        registrations: registrations?.registrations || [],
        currentPage,
        setCurrentPage,
    };
};

export default useRoomDetails;

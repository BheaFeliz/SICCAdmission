// cardIdHooks.js
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi';
import { useGetRegistrationByIdQuery } from '@/hooks/api/studentApi';

const useCardDetailsHooks = () => {
  const router = useRouter();
  const { cardId } = router.query;

  const { data: cardData, error: scheduleError, isLoading: scheduleLoading } = useGetScheduleByIdQuery(cardId);
  const { data: studentsData, error: studentsError, isLoading: studentsLoading } = useGetRegistrationByIdQuery(cardId);

  const students = useMemo(() => {
    return studentsData ? studentsData.filter(student => student.roomId === cardId) : [];
  }, [studentsData, cardId]);

  const breadcrumbs = useMemo(() => [
    { title: 'Home', href: '/' },
    { title: 'Card Details', href: `/cards/${cardId}` }
  ], [cardId]);

  const handleDeleteCard = (cardId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this card?");
    if (confirmDelete) {
      console.log('Deleting card:', cardId);
    }
  };

  return {
    cardData,
    students,
    isLoading: scheduleLoading || studentsLoading,
    error: scheduleError || studentsError,
    breadcrumbs,
    handleDeleteCard,
  };
};

export default useCardDetailsHooks;

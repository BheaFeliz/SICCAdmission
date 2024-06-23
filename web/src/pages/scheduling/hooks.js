import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useCreateScheduleMutation,useGetSchedulesQuery } from '@/hooks/api/scheduleApi';
import { useGetRegistrationsQuery } from '@/hooks/api/studentApi';

const useHooks = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState([]); // Initialize as an empty array
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);

  const { data: schedules, error: scheduleError, isLoading: scheduleLoading } = useGetSchedulesQuery();
  const { data: registrations, error: registrationError, isLoading: registrationLoading } = useGetRegistrationsQuery();
  const [createSchedule] = useCreateScheduleMutation();

  useEffect(() => {
    if (schedules) {
      setCardData(schedules.data || []); // Ensure schedules.data is an array
    }
  }, [schedules]);

  useEffect(() => {
    if (registrations && cardData.length > 0) {
      const updatedCardData = cardData.map(card => {
        const roomStudents = registrations.filter(reg => reg.roomId === card.id).slice(0, 30);
        return { ...card, students: roomStudents };
      });
      setCardData(updatedCardData);
    }
  }, [registrations, cardData]);

  useEffect(() => {
    localStorage.setItem('cardData', JSON.stringify(cardData));
  }, [cardData]);

  const addCard = () => {
    const newCardTitle = prompt("Enter the title for the new card:");
    if (newCardTitle) {
      const newCardId = cardData.length > 0 ? Math.max(cardData.map(card => card.id)) + 1 : 1;
      const newCard = {
        id: newCardId,
        title: newCardTitle,
        schedule: [],
        students: []
      };
      setCardData(prevCardData => [...prevCardData, newCard]);
    }
  };

  const deleteCard = (cardId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    if (confirmDelete) {
      setCardData(prevCardData => prevCardData.filter(card => card.id !== cardId));
      setSelectedRoom(null);
    }
  };

  const handleSchedule = () => {
    router.push(`/scheduling/new`);
  };

  const addSchedule = async (date) => {
    if (selectedRoom !== null) {
      const updatedCardData = cardData.map(card => {
        if (card.id === selectedRoom) {
          return {
            ...card,
            schedule: [...card.schedule, date]
          };
        }
        return card;
      });
      setCardData(updatedCardData);
      setScheduleDate(date);
      setSelectedRoom(null);

      const selectedCard = updatedCardData.find(card => card.id === selectedRoom);
      try {
        await createSchedule({
          id: selectedCard.id,
          title: selectedCard.title,
          schedule: selectedCard.schedule,
          students: selectedCard.students
        });
      } catch (error) {
        console.error('Failed to add schedule:', error);
      }
    }
  };

  return {
    cardData,
    selectedRoom,
    scheduleDate,
    addCard,
    deleteCard,
    handleSchedule,
    addSchedule,
    registrationLoading,
    registrationError,
    scheduleLoading,
    scheduleError
  };
};

export default useHooks;

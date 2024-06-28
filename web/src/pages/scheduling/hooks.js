import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useHooks = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);

  useEffect(() => {
    fetchCardData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cardData', JSON.stringify(cardData));
  }, [cardData]);

  const fetchCardData = () => {
    const storedCardData = JSON.parse(localStorage.getItem('cardData')) || [];
    setCardData(storedCardData);
  };

  const addCard = () => {
    const newCardTitle = prompt('Enter the title for the new card:');
    if (newCardTitle) {
      const newCardId = cardData.length + 1; // Generate sequential ID
      const newCard = {
        id: newCardId,
        title: newCardTitle,
        schedule: []
      };
      setCardData(prevCardData => [...prevCardData, newCard]);
    }
  };

  const deleteCard = (cardId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this room?');
    if (confirmDelete) {
      setCardData(prevCardData => prevCardData.filter(card => card.id !== cardId));
      setSelectedRoom(null);
    }
  };

  const handleSchedule = (cardId) => {
    router.push(`/scheduling/${cardId}/roomdetails`);
  };

  const addSchedule = (date) => {
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
    }
  };

  return {
    cardData,
    selectedRoom,
    scheduleDate,
    addCard,
    deleteCard,
    handleSchedule,
    addSchedule
  };
};

export default useHooks;

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
    const newCardTitle = prompt("Enter the title for the new card:");
    if (newCardTitle) {
      const newCardId = cardData.length + 1; // Generate sequential ID
      const newCard = {
        id: newCardId,
        title: newCardTitle,
        schedule: [],
        student: [],
      };
      setCardData(prevCardData => [...prevCardData, newCard]);
    }
  };
  
  const assignRoomToStudent = () => {
    const totalStudents = cardData.reduce((sum, card) => sum + card.students.length, 0);
    return Math.floor(totalStudents / 30) + 1;
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

  const addSchedule = (date, student) => {
    const roomNumber = assignRoomToStudent(student);
    if (selectedRoom !== null) {
      const updatedCardData = cardData.map(card => {
        if (card.id === roomNumber) {
          return {
            ...card,
            schedule: [...card.schedule, date],
            students: [...card.students, student], // Add student to the room
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
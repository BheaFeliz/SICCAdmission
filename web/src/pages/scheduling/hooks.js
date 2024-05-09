import { useRouter } from 'next/router'; // Import useRouter from next/router
import { useEffect, useState } from 'react';

const useHooks = () => {
    const router = useRouter(); // Initialize useRouter

  // State to store card data and selected room
  const [cardData, setCardData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);

  // Function to fetch card data from the backend
  const fetchCardData = async () => {
    try {
      const response = await axios.get('/api/cardData');
      setCardData(response.data);
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };

  // Fetch card data on component mount
  useEffect(() => {
    fetchCardData();
  }, []);

  // Function to add a new card
  const addCard = () => {
    const newCardTitle = prompt("Enter the title for the new card:");
    if (newCardTitle) {
      const newCard = {
        id: Date.now(),
        title: newCardTitle,
        schedule: []
      };
      setCardData(prevCardData => [...prevCardData, newCard]);
    }
  };

  // Function to delete a card with confirmation
  const deleteCard = () => {
    if (selectedRoom !== null) {
      const confirmDelete = window.confirm("Are you sure you want to delete this room?");
      if (confirmDelete) {
        setCardData(prevCardData => prevCardData.filter(card => card.id !== selectedRoom));
        setSelectedRoom(null);
      }
    } else {
      alert("Please select a room to delete.");
    }
  };

  // Function to handle scheduling
  const handleSchedule = () => {
    router.push(`/scheduling/new`); // Navigate to the scheduling page with the room ID as a parameter
  };

  // Function to add a schedule to the selected room
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
    }
  }

  export default useHooks
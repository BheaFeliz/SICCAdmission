import React, { useState } from 'react';

import CardItem from '@/components/organisms/CardItem';
import Template from "@/components/templates/Template";
import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi';

import useHooks from './hooks';

const CardWithSchedule = ({ card }) => {
  const { data: scheduling, error, isLoading } = useGetScheduleByIdQuery(card.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>No schedule available</div>;

  return (
    <CardItem
      title={card.title}
      description={card.description}
      date={scheduling ? scheduling.date : null}
      startTime={scheduling ? scheduling.startTime : null}
      endTime={scheduling ? scheduling.endTime : null}
    />
  );
};

const Scheduling = () => {
  const {
    cardData,
    selectedRoom,
    scheduleDate,
    addCard,
    deleteCard,
    handleSchedule,
    addSchedule
  } = useHooks();

  const [schedulingMode, setSchedulingMode] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState(null);

  const toggleSchedulingMode = () => {
    setSchedulingMode(!schedulingMode);
    setSelectedForDeletion(null);
  };

  const handleCardClick = (cardId) => {
    if (schedulingMode) {
      handleSchedule(cardId);
    } else {
      setSelectedForDeletion(selectedForDeletion === cardId ? null : cardId);
    }
  };

  const handleDeleteCard = (cardId) => {
    deleteCard(cardId);
    setSelectedForDeletion(null);
  };

  return (
    <Template>
      <div className="flex justify-between items-center mt-4 mb-4">
        <div>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${schedulingMode ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
            onClick={toggleSchedulingMode}
          >
            {schedulingMode ? 'Scheduling Mode Active' : 'Schedule'}
          </button>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {cardData.map((card) => (
          <div key={card.id} className={`relative ${selectedRoom === card.id ? 'border border-blue-500 cursor-pointer' : 'cursor-default'}`} onClick={() => handleCardClick(card.id)}>
            <CardWithSchedule card={card} addSchedule={addSchedule} />
            {scheduleDate && selectedRoom === card.id && (
              <div className="text-sm text-gray-500">{scheduleDate.toLocaleDateString()}</div>
            )}
            {selectedForDeletion === card.id && (
              <div className="absolute top-0 right-0">
                <button className="text-red-500 ml-1" onClick={() => handleDeleteCard(card.id)}>X</button>
              </div>
            )}
          </div>
        ))}
        <div className="bg-gray-100 p-4 flex justify-center items-center cursor-pointer" onClick={addCard}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11 9V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 1 0 0-2h-4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </Template>
  );
};

export default Scheduling;

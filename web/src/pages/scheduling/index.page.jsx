import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillSchedule } from "react-icons/ai";

import CardItem from '@/components/organisms/CardItem';
import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/Template';
import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi';

import useHooks from './hooks';

const breadcrumbs = [
  {
    href: '#',
    title: 'Scheduling',
    icon: AiFillSchedule,
  },
];

const Scheduling = () => {
  const router = useRouter();
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
    setSchedulingMode((prev) => !prev);
    setSelectedForDeletion(null);
  };

  const handleCardClick = (cardId) => {
    if (schedulingMode) {
      handleSchedule(cardId);
    } else {
      setSelectedForDeletion((prev) => (prev === cardId ? null : cardId));
    }
  };

  const handleDeleteCard = (cardId) => {
    deleteCard(cardId);
    setSelectedForDeletion(null);
  };

  const viewDetails = (cardId) => {
    router.push(`/scheduling/${cardId}/roomdetails`);
  };

  const CardWithSchedule = ({ card }) => {
    const { data: scheduling, error, isLoading } = useGetScheduleByIdQuery(card.id);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading schedule</div>;

    return (
      <CardItem
        title={card.title}
        description={card.description}
        date={scheduling ? scheduling.date : null}
        startTime={scheduling ? scheduling.startTime : null}
        endTime={scheduling ? scheduling.endTime : null}
        onDateSelect={(date) => addSchedule(date)}
        onDetailsClick={() => viewDetails(card.id)}
      />
    );
  };

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div className="flex justify-between items-center mt-4 mb-4">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${schedulingMode ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
          onClick={toggleSchedulingMode}
        >
          {schedulingMode ? 'Scheduling Mode Active' : 'Schedule'}
        </button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {Array.isArray(cardData) && cardData.map((card) => (
          <div key={card.id} className={`relative ${selectedRoom === card.id ? 'border border-blue-500 cursor-pointer' : 'cursor-default'}`} onClick={() => handleCardClick(card.id)}>
            <CardWithSchedule card={card} />
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
          <span className="text-2xl font-semibold text-gray-500">+</span>
        </div>
      </div>
    </Template>
  );
};

export default Scheduling;

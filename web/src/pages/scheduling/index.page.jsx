<<<<<<< Updated upstream

import Datepicker from "@/components/organisms/Datepicker";
import Template from "@/components/templates/Template";

const Scheduling = () => {
  return (
    <Template>
      <Datepicker />
    </Template>
  
  );
=======
import React, { useState } from 'react'

import CardItem from '@/components/organisms/Card'
import Datepicker from '@/components/organisms/Datepicker'
import Template from '@/components/templates/Template'

import useHooks from './hooks'

const Scheduling = () => {
  const {
    cardData,
    selectedRoom,
    scheduleDate,
    addCard,
    deleteCard,
    handleSchedule,
    addSchedule,
  } = useHooks()

  const [schedulingMode, setSchedulingMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [selectedForDeletion, setSelectedForDeletion] = useState(null)

  const toggleSchedulingMode = () => {
    setSchedulingMode(!schedulingMode)
  }

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode)
  }

  const handleCardClick = (cardId) => {
    if (deleteMode && selectedForDeletion === null) {
      setSelectedForDeletion(cardId)
    } else if (deleteMode && selectedForDeletion === cardId) {
      deleteCard(cardId)
      setSelectedForDeletion(null)
    } else if (schedulingMode) {
      handleSchedule(cardId)
    }
  }

  return (
    <Template>
      <div className='flex justify-between items-center mt-4 mb-4'>
        <div>
          <Datepicker
            onDateSelect={(date) => addSchedule(date)}
            disabled={!selectedRoom || schedulingMode}
          />
        </div>
        <div>
          <button
            className={`bg-red-500 text-white px-4 py-2 rounded-md ${deleteMode ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
            onClick={toggleDeleteMode}
            disabled={schedulingMode}
          >
            {deleteMode ? 'Delete Mode Active' : 'Activate Delete Mode'}
          </button>
        </div>
      </div>

      <div className='flex justify-center mb-4'>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${schedulingMode ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
          onClick={toggleSchedulingMode}
          disabled={deleteMode}
        >
          {schedulingMode ?
            'Scheduling Mode Active'
          : 'Activate Scheduling Mode'}
        </button>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`relative ${selectedRoom === card.id ? 'border border-blue-500 cursor-pointer' : 'cursor-default'}`}
            onClick={() => handleCardClick(card.id)}
          >
            <CardItem
              title={card.title}
              schedule={card.schedule}
              onDateSelect={(date) => addSchedule(date)}
            />
            {scheduleDate && selectedRoom === card.id && (
              <div className='text-sm text-gray-500'>
                {scheduleDate.toDateString()}
              </div>
            )}
          </div>
        ))}
        <div
          className='bg-gray-100 p-4 flex justify-center items-center cursor-pointer'
          onClick={addCard}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10 text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M11 9V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 1 0 0-2h-4z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>
    </Template>
  )
>>>>>>> Stashed changes
}

export default Scheduling

import { Card as FlowbiteCard } from 'flowbite-react';
import React from 'react';

const CardItem = ({ title, description, date, startTime, endTime }) => (
  <FlowbiteCard className='max-w-sm border border-solid border-blue-400 p-4 mb-4'>
    <h5 className='text-2xl font-bold tracking-tight text-blue-700 dark:text-white mb-2'>
      {title}
    </h5>
    <p className='text-sm font-normal text-gray-700 dark:text-gray-400 mb-4'>
      {description}
    </p>
    {date && startTime && endTime && (
      <div className='mb-4'>
        <p className='text-sm font-normal text-gray-700 dark:text-gray-400'>Date: {date}</p>
        <p className='text-sm font-normal text-gray-700 dark:text-gray-400'>Time: {startTime} - {endTime}</p>
      </div>
    )}
  </FlowbiteCard>
);

export default CardItem;

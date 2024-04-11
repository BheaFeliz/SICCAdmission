import { Card as FlowbiteCard } from 'flowbite-react'
import React from 'react'

const Card = ({ title, description }) => {
  return (
    <FlowbiteCard
      href='#'
      className='max-w-sm border border-solid border-blue-400 p-2 mb-4'
    >
      <h5 className='text-2xl font-bold tracking-tight text-blue-700 dark:text-white mb-2'>
        {title}
      </h5>
      <p className='text-sm font-normal text-gray-700 dark:text-gray-400'>
        {description}
      </p>
    </FlowbiteCard>
  )
}

export default Card

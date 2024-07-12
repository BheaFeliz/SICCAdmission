import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

import Template from '@/components/templates/Template'

import useHooks from './hook'

const Schedule = () => {
  const { schedules, isLoading, isError, handleDeleteSchedule } = useHooks()

  if (isLoading) {
    return <Template>Loading...</Template>
  }

  if (isError) {
    return <Template>Error fetching schedules.</Template>
  }

  return (
    <Template>
      <div className='grid grid-cols-3 gap-2'>
        {schedules && schedules.length > 0 ?
          schedules.map((schedule) => (
            <div key={schedule.id} className='border rounded p-4'>
              <h2 className='text-lg font-bold'>{schedule.name}</h2>
              <p>Start Time: {schedule.startTime}</p>
              <p>End Time: {schedule.endTime}</p>
              <p>{schedule.description}</p>
              <div className='flex space-x-2 mt-2'>
                <Link href={`/schedule/${schedule.id}`} passHref>
                  <Button as='a' size='xs' color='blue'>
                    View Details
                  </Button>
                </Link>
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-md'
                  onClick={() => handleDeleteSchedule(schedule.id)}
                >
                  Delete Schedule
                </button>
              </div>
            </div>
          ))
        : <p>No schedules available.</p>}
      </div>

      <div className='mt-4'>
        <Link href='/schedule/new'>
          <Button size='xs' color='warning'>
            Add Schedule
          </Button>
        </Link>
      </div>
    </Template>
  )
}

export default Schedule

import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

import Template from '@/components/templates/Template'

import useHooks from './hook' // Ensure this import path is correct

const Schedule = () => {
  const { schedules, isLoading, isError, handleDeleteSchedule } = useHooks()

  // Function to convert 24-hour time to 12-hour time format
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours, 10)
    const period = hour >= 12 ? 'PM' : 'AM'
    const adjustedHour = hour % 12 || 12
    return `${adjustedHour}:${minutes} ${period}`
  }

  if (isLoading) {
    return <Template>Loading...</Template>
  }

  if (isError) {
    return <Template>Error fetching schedules.</Template>
  }

  return (
    <Template>
      <div className='flex flex-wrap justify-start items-center mb-8 space-x-4 '>
        <div>
          <Link href='/schedule/new'>
            <Button size='lg' color='blue'>
              Add Schedule
            </Button>
          </Link>
        </div>

        <div>
          <Link href='/schedule/history'>
            <Button size='lg' color='blue'>
              View History
            </Button>
          </Link>
        </div>

        <div>
          <Link href='/schedule/new'>
            <Button size='lg' color='blue'>
              Set Slots
            </Button>
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2'>
        {schedules && schedules.length > 0 ?
          schedules.map((schedule) => (
            <div key={schedule.id} className='border rounded p-4'>
              <h2 className='text-lg font-bold'>{schedule.name}</h2>
              <p>Date: {schedule.date}</p>
              <p>Start Time: {convertTo12HourFormat(schedule.startTime)}</p>
              <p>End Time: {convertTo12HourFormat(schedule.endTime)}</p>
              <p>{schedule.description}</p>
              <div className='flex space-x-2 mt-2'>
                <Link href={`/schedule/${schedule.id}`} passHref>
                  <Button as='a' size='lg' color='blue'>
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
    </Template>
  )
}

export default Schedule

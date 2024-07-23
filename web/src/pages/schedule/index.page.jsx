import { Button, Card } from 'flowbite-react' // Import Card here
import Link from 'next/link'
import React from 'react'
import { IoCalendarSharp } from 'react-icons/io5'

import PageHeader from '@/components/organisms/PageHeader'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { useUser } from '@/hooks/redux/auth'

import useHooks from './hook' // Ensure this import path is correct

const breadcrumbs = [
  {
    href: '#',
    title: 'Scheduling',
    icon: IoCalendarSharp,
  },
]

const Schedule = () => {
  const { schedules, isError, handleDeleteSchedule } = useHooks()
  const { user } = useUser() // Ensure you import useUser hook

  // Function to convert 24-hour time to 12-hour time format
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours, 10)
    const period = hour >= 12 ? 'PM' : 'AM'
    const adjustedHour = hour % 12 || 12
    return `${adjustedHour}:${minutes} ${period}`
  }

  // Function to convert date to month-day-year format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1 // getMonth() returns zero-based month
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month}-${day}-${year}`
  }

  if (isError) {
    return (
      <Template>
        <p>Error fetching schedules.</p>
      </Template>
    )
  }

  return (
    <div>
      {user.role === 'admin' ?
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />

          <div className='flex flex-wrap justify-start items-center mb-8 space-x-4'>
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
                <Card key={schedule.id} className='p-2'>
                  {' '}
                  {/* Use Card component */}
                  <h2 className='text-lg font-bold'>{schedule.name}</h2>
                  <p>Date: {formatDate(schedule.date)}</p>
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
                </Card>
              ))
            : <p>No schedules available.</p>}
          </div>
        </Template>
      : <StaffTemplate>
          <PageHeader breadcrumbs={breadcrumbs} />

          <div className='flex flex-wrap justify-start items-center mb-8 space-x-4'>
            <div>
              <Link href='/schedule/history'>
                <Button size='lg' color='blue'>
                  View History
                </Button>
              </Link>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-2'>
            {schedules && schedules.length > 0 ?
              schedules.map((schedule) => (
                <Card key={schedule.id} className='p-4'>
                  {' '}
                  {/* Use Card component */}
                  <h2 className='text-lg font-bold'>{schedule.name}</h2>
                  <p>Date: {formatDate(schedule.date)}</p>
                  <p>Start Time: {convertTo12HourFormat(schedule.startTime)}</p>
                  <p>End Time: {convertTo12HourFormat(schedule.endTime)}</p>
                  <p>{schedule.description}</p>
                  <div className='flex space-x-2 mt-2'>
                    <Link href={`/schedule/${schedule.id}`} passHref>
                      <Button as='a' size='lg' color='blue'>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))
            : <p>No schedules available.</p>}
          </div>
        </StaffTemplate>
      }
    </div>
  )
}

export default Schedule

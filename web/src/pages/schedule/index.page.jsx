import { Button, Card, Modal, TextInput } from 'flowbite-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { IoCalendarSharp } from 'react-icons/io5'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { useUser } from '@/hooks/redux/auth'

import useHooks from './hooks'

const breadcrumbs = [
  {
    href: '#',
    title: 'Scheduling',
    icon: IoCalendarSharp,
  },
]

const Schedule = () => {
  const {
    schedules,
    isError,
    isLoading,
    handleDeleteSchedule,
  
  } = useHooks()
  const { user } = useUser()
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const [selectedDate, setSelectedDate] = useState('')

  // Function to convert 24-hour time to 12-hour time format
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours, 10)
    const period = hour >= 12 ? 'PM' : 'AM'
    const adjustedHour = hour % 12 || 12
    return `${adjustedHour}:${minutes} ${period}`
  }

  // Function to convert date to month-day-year format with month in words
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const month = monthNames[date.getMonth()] // getMonth() returns zero-based month
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }


  const handleOpenDeleteModal = (schedule) => {
    setSelectedSchedule(schedule)
    setOpenDeleteModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenDeleteModal(false)
    setSelectedSchedule(null)
    setIsDeleting(false)
  }

  const handleConfirmDelete = async () => {
    if (selectedSchedule) {
      setIsDeleting(true)
      await handleDeleteSchedule(selectedSchedule.id)
      setIsDeleting(false)
      handleCloseModal()
    }
  }

  

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }

  const filteredSchedules =
    selectedDate ?
      schedules.filter((schedule) => formatDate(schedule.date) === selectedDate)
    : schedules

  if (isLoading) {
    return (
      <Template>
        <div className='flex justify-center items-center h-screen'>
          <Loading />
        </div>
      </Template>
    )
  }

  if (isError) {
    return (
      <Template>
        <p>Error fetching schedules.</p>
      </Template>
    )
  }

  return (
    <div className='bg-white dark:bg-gray-900 text-gray-800 dark:text-white'>
      {user.role === 'admin' ?
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />

          <div className='flex justify-start mb-8 space-x-4'>
            <div>
              <Link href='/schedule/scheduleRoom'>
                <Button size='lg' color='blue'>
                  Add Schedule
                </Button>
              </Link>
            </div>


            <div>
              <Link href='/schedule/history'>
                <Button size='lg' color='failure'>
                  View History
                </Button>
              </Link>
            </div>
          </div>

          <div className='flex justify-start mb-4'>
            <select
              value={selectedDate}
              onChange={handleDateChange}
              className='p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white'
            >
              <option value=''>All Dates</option>
              {schedules.map((schedule) => (
                <option key={schedule.id} value={formatDate(schedule.date)}>
                  {formatDate(schedule.date)}
                </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-3 gap-2'>
            {filteredSchedules.length > 0 ?
              filteredSchedules.map((schedule) => (
                <Card
                  key={schedule.id}
                  className='p-2 relative dark:bg-gray-800 dark:text-white'
                >
                  {isDeleting && selectedSchedule?.id === schedule.id && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <Loading /> {/* Show loading in card when deleting */}
                    </div>
                  )}
                  <div className='relative'>
                    <h2 className='text-lg font-bold'>{schedule.name}</h2>
                    <p>Date: {formatDate(schedule.date)}</p>
                    <p>
                      Start Time: {convertTo12HourFormat(schedule.startTime)}
                    </p>
                    <p>End Time: {convertTo12HourFormat(schedule.endTime)}</p>
                    <p>Max Registrations: {schedule.max_registrations}</p>
                    <p>{schedule.session}</p>
                    <p>{schedule.remark}</p>
                    <div className='flex space-x-2 mt-2'>
                      <Link href={`/schedule/${schedule.id}`} passHref>
                        <Button as='a' size='lg' color='blue'>
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size='lg'
                        color='failure'
                        onClick={() => handleOpenDeleteModal(schedule)}
                      >
                        Delete Schedule
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            : <p>No schedules available.</p>}
          </div>

          {selectedSchedule && (
            <Modal
              show={openDeleteModal}
              size='md'
              onClose={handleCloseModal}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                {isDeleting ?
                  <div className='flex justify-center items-center'>
                    <Loading />
                  </div>
                : <div className='text-center'>
                    <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                    <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                      Are you sure you want to delete the schedule{' '}
                      {selectedSchedule.name}?
                    </h3>
                    <div className='flex justify-center gap-4'>
                      <Button color='failure' onClick={handleConfirmDelete}>
                        {'Yes'}
                      </Button>
                      <Button color='gray' onClick={handleCloseModal}>
                        No
                      </Button>
                    </div>
                  </div>
                }
              </Modal.Body>
            </Modal>
          )}

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

          <div className='flex justify-start mb-4'>
            <select
              value={selectedDate}
              onChange={handleDateChange}
              className='p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white'
            >
              <option value=''>All Dates</option>
              {schedules.map((schedule) => (
                <option key={schedule.id} value={formatDate(schedule.date)}>
                  {formatDate(schedule.date)}
                </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-3 gap-2'>
            {filteredSchedules.length > 0 ?
              filteredSchedules.map((schedule) => (
                <Card
                  key={schedule.id}
                  className='p-4 relative dark:bg-gray-800 dark:text-white'
                >
                  {isDeleting && selectedSchedule?.id === schedule.id && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <Loading /> {/* Show loading in card when deleting */}
                    </div>
                  )}
                  <div className='relative'>
                    <h2 className='text-lg font-bold'>{schedule.name}</h2>
                    <p>Date: {formatDate(schedule.date)}</p>
                    <p>
                      Start Time: {convertTo12HourFormat(schedule.startTime)}
                    </p>
                    <p>End Time: {convertTo12HourFormat(schedule.endTime)}</p>
                    <p>Max Registrations: {schedule.max_registrations}</p>
                    <p>{schedule.session}</p>
                    <p>{schedule.remark}</p>
                    <div className='flex space-x-2 mt-2'>
                      <Link href={`/schedule/${schedule.id}`} passHref>
                        <Button as='a' size='lg' color='blue'>
                          View Details
                        </Button>
                      </Link>
                    </div>
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

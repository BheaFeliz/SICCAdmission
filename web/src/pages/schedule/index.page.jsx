import { Button, Card, Modal } from 'flowbite-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoCalendarSharp } from 'react-icons/io5'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'

// import { useUser } from '@/hooks/redux/auth'
import useHooks from './hooks'

const breadcrumbs = [
  {
    href: '#',
    title: 'Scheduling',
    icon: IoCalendarSharp,
  },
]

const Schedule = () => {
  const { schedules, isError, isLoading, handleDeleteSchedule } = useHooks()
  // const { user } = useUser()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours, 10)
    const period = hour >= 12 ? 'PM' : 'AM'
    const adjustedHour = hour % 12 || 12
    return `${adjustedHour}:${minutes} ${period}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // e.g., "2024-08-18"
  }

  const formatDisplayDate = (dateString) => {
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
    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  const handleOpenDeleteModal = (schedule) => {
    setSelectedSchedule(schedule)
    setOpenDeleteModal(true)
  }

  const handleCloseModal = () => {
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

  const uniqueDates = [
    ...new Set(schedules.map((schedule) => formatDate(schedule.date))),
  ]

  return (
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

        <div className='flex justify-start mb-4'>
          <select
            value={selectedDate}
            onChange={handleDateChange}
            className='p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white text-lg'
          >
            <option value=''>All Dates</option>
            {uniqueDates.map((date, index) => (
              <option key={index} value={date}>
                {formatDisplayDate(date)}
              </option>
            ))}
          </select>
        </div>
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
                  <Loading />
                </div>
              )}
              <div className='relative'>
                <h2 className='text-lg font-bold'>{schedule.name}</h2>
                <p>Date: {formatDisplayDate(schedule.date)}</p>
                <p>Start Time: {convertTo12HourFormat(schedule.startTime)}</p>
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

      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this schedule?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color='gray' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            color='failure'
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Template>
  )
}

export default Schedule

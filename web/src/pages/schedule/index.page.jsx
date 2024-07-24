import { Button, Card, Modal } from 'flowbite-react' // Ensure this import is correct
import Link from 'next/link'
import React, { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { IoCalendarSharp } from 'react-icons/io5'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { useUser } from '@/hooks/redux/auth' // Ensure you import useUser hook

import useHooks from './hooks' // Ensure this import path is correct

const breadcrumbs = [
  {
    href: '#',
    title: 'Scheduling',
    icon: IoCalendarSharp,
  },
]

const Schedule = () => {
  const { schedules, isError, handleDeleteSchedule } = useHooks()
  const { user } = useUser()
  const [openModal, setOpenModal] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleOpenModal = (schedule) => {
    setSelectedSchedule(schedule)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedSchedule(null)
    setIsDeleting(false)
  }

  const handleConfirmDelete = async () => {
    if (selectedSchedule) {
      setIsDeleting(true)
      await handleDeleteSchedule(selectedSchedule.id)
      handleCloseModal()
    }
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
                  <h2 className='text-lg font-bold'>{schedule.name}</h2>
                  <p>Date: {formatDate(schedule.date)}</p>
                  <p>Start Time: {convertTo12HourFormat(schedule.startTime)}</p>
                  <p>End Time: {convertTo12HourFormat(schedule.endTime)}</p>
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
                      onClick={() => handleOpenModal(schedule)}
                    >
                      Delete Schedule
                    </Button>
                  </div>
                </Card>
              ))
            : <p>No schedules available.</p>}
          </div>

          {selectedSchedule && (
            <Modal show={openModal} size='md' onClose={handleCloseModal} popup>
              <Modal.Header />
              <Modal.Body>
                {isDeleting ?
                  <Loading />
                : <div className='text-center'>
                    <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                    <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                      Are you sure you want to delete the schedule{' '}
                      {selectedSchedule.name}?
                    </h3>
                    <div className='flex justify-center gap-4'>
                      <Button color='failure' onClick={handleConfirmDelete}>
                        {"Yes, I'm sure"}
                      </Button>
                      <Button color='gray' onClick={handleCloseModal}>
                        No, cancel
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

          <div className='grid grid-cols-3 gap-2'>
            {schedules && schedules.length > 0 ?
              schedules.map((schedule) => (
                <Card key={schedule.id} className='p-4'>
                  <h2 className='text-lg font-bold'>{schedule.name}</h2>
                  <p>Date: {formatDate(schedule.date)}</p>
                  <p>Start Time: {convertTo12HourFormat(schedule.startTime)}</p>
                  <p>End Time: {convertTo12HourFormat(schedule.endTime)}</p>
                  <p>{schedule.session}</p>
                  <p>{schedule.remark}</p>
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

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
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

const ScheduleCard = ({
  schedule,
  onDelete,
  isDeleting,
  convertTo12HourFormat,
  formatDisplayDate,
  isAdmin,
}) => (
  <div className='relative overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/90'>
    {isDeleting && (
      <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-gray-900/70'>
        <Loading />
      </div>
    )}
    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-blue-500'>
      {schedule.session || 'Schedule'}
    </p>
    <h2 className='mt-2 text-xl font-semibold text-slate-900 dark:text-white'>
      {schedule.name}
    </h2>
    <dl className='mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-200'>
      <div className='flex justify-between'>
        <dt className='font-semibold text-slate-500'>Date</dt>
        <dd>{formatDisplayDate(schedule.date)}</dd>
      </div>
      <div className='flex justify-between'>
        <dt className='font-semibold text-slate-500'>Time</dt>
        <dd>
          {convertTo12HourFormat(schedule.startTime)} –{' '}
          {convertTo12HourFormat(schedule.endTime)}
        </dd>
      </div>
      <div className='flex justify-between'>
        <dt className='font-semibold text-slate-500'>Capacity</dt>
        <dd>{schedule.max_registrations} slots</dd>
      </div>
      {schedule.remark && (
        <div>
          <dt className='font-semibold text-slate-500'>Notes</dt>
          <dd>{schedule.remark}</dd>
        </div>
      )}
    </dl>
    <div className='mt-6 flex flex-wrap gap-3'>
      <Link
        href={`/schedule/${schedule.id}`}
        className='inline-flex flex-1 min-w-[140px] items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200'
      >
        View details
      </Link>
      {isAdmin && (
        <button
          type='button'
          onClick={() => onDelete(schedule)}
          className='inline-flex flex-1 min-w-[140px] items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200'
        >
          Schedule done
        </button>
      )}
    </div>
  </div>
)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const period = hour >= 12 ? 'PM' : 'AM'
  const adjustedHour = hour % 12 || 12
  return `${adjustedHour}:${minutes} ${period}`
}

const formatDisplayDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const Schedule = () => {
  const { schedules, isError, isLoading, handleDeleteSchedule } = useHooks()
  const { user } = useUser()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

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

  const normalizedSchedules = useMemo(() => schedules || [], [schedules])

  const uniqueDates = useMemo(() => {
    if (!normalizedSchedules.length) return []
    const formattedDates = normalizedSchedules.map((schedule) =>
      formatDate(schedule.date),
    )
    return [...new Set(formattedDates)]
  }, [normalizedSchedules])

  const filteredSchedules = useMemo(() => {
    if (!selectedDate) return normalizedSchedules
    return normalizedSchedules.filter(
      (schedule) => formatDate(schedule.date) === selectedDate,
    )
  }, [normalizedSchedules, selectedDate])

  const role = user?.role

  const Layout = role === 'admin' ? Template : StaffTemplate

  if (isLoading) {
    return (
      <Layout>
        <div className='flex h-64 items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/60'>
          <Loading />
        </div>
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>
        <div className='rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700'>
          Error fetching schedules. Please try again later.
        </div>
      </Layout>
    )
  }

  const totalSchedules = normalizedSchedules.length
  const filteredCount = filteredSchedules.length

  return (
    <Layout>
      <div className='space-y-8'>
        <PageHeader breadcrumbs={breadcrumbs} />
        <section className='rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm lg:p-8 dark:border-gray-800 dark:bg-gray-900/80'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-blue-500'>
                Scheduling hub
              </p>
              <h1 className='mt-3 text-3xl font-semibold text-slate-900 dark:text-white'>
                Manage admissions schedules
              </h1>
              <p className='mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-300'>
                Filter sessions by date, review capacity, and keep staff informed
                from any device. All cards adapt to smaller screens for quick
                mobile checks.
              </p>
            </div>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-2xl border border-slate-200 bg-white/90 p-4 text-center dark:border-gray-700 dark:bg-gray-800/80'>
                <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>
                  Total sessions
                </p>
                <p className='mt-2 text-3xl font-semibold text-slate-900 dark:text-white'>
                  {totalSchedules}
                </p>
              </div>
              <div className='rounded-2xl border border-slate-200 bg-white/90 p-4 text-center dark:border-gray-700 dark:bg-gray-800/80'>
                <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>
                  Showing now
                </p>
                <p className='mt-2 text-3xl font-semibold text-slate-900 dark:text-white'>
                  {filteredCount}
                </p>
              </div>
            </div>
          </div>

          <div className='mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-gray-700 dark:bg-gray-800/60 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-wrap gap-3'>
              {role === 'admin' && (
                <Link
                  href='/schedule/scheduleRoom'
                  className='inline-flex items-center rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500'
                >
                  Add schedule
                </Link>
              )}
              <Link
                href='/schedule/history'
                className='inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50'
              >
                View history
              </Link>
            </div>
            <div className='flex items-center gap-3'>
              <label className='text-sm font-semibold text-slate-500 dark:text-slate-200'>
                Filter by date
              </label>
              <select
                value={selectedDate}
                onChange={handleDateChange}
                className='rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100'
              >
                <option value=''>All Dates</option>
                {uniqueDates.map((date) => (
                  <option key={date} value={date}>
                    {formatDisplayDate(date)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-xl font-semibold text-slate-900 dark:text-white'>
            Upcoming sessions
          </h2>
          {filteredSchedules.length > 0 ?
            <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
              {filteredSchedules.map((schedule) => (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  onDelete={handleOpenDeleteModal}
                  isDeleting={
                    isDeleting && selectedSchedule?.id === schedule.id
                  }
                  convertTo12HourFormat={convertTo12HourFormat}
                  formatDisplayDate={formatDisplayDate}
                  isAdmin={role === 'admin'}
                />
              ))}
            </div>
          : <div className='rounded-3xl border border-dashed border-slate-200 bg-white/80 p-10 text-center text-sm text-slate-500 dark:border-gray-700 dark:bg-gray-800/70'>
              No schedules available for the selected date.
            </div>}
        </section>
      </div>

      <Modal show={openDeleteModal} onClose={handleCloseModal}>
        <ModalHeader>Mark schedule as settled?</ModalHeader>
        <ModalBody>
          <p>
            Confirm that this admission session is done so all registrations move
            to settled status.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color='gray' onClick={handleCloseModal}>
            Keep open
          </Button>
          <Button
            color='failure'
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Marking…' : 'Mark as Done'}
          </Button>
        </ModalFooter>
      </Modal>
    </Layout>
  )
}

export default Schedule

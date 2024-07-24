import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'
import { IoCalendarSharp } from 'react-icons/io5'

import PageHeader from '@/components/organisms/PageHeader'
import Table from '@/components/organisms/Table'
import Template from '@/components/templates/Template'

import { useDeletedSchedules } from './hooks'

const breadcrumbs = [
  {
    href: '/schedule',
    title: 'Scheduling',
    icon: IoCalendarSharp,
  },
  {
    href: '/history',
    title: 'View History',
  },
]

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const month = date.getMonth() + 1 // getMonth() returns zero-based month
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month}-${day}-${year}`
}

const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const period = hour >= 12 ? 'PM' : 'AM'
  const adjustedHour = hour % 12 || 12
  return `${adjustedHour}:${minutes} ${period}`
}

const ScheduleHistory = () => {
  const { deletedSchedules, isLoading, isError } = useDeletedSchedules()
  const rows = [
    { key: 'name', header: 'Name', render: (row) => row.name },
    {
      key: 'date',
      header: 'Date',
      render: (row) => formatDate(row.date) || row.date,
    },
    {
      key: 'startTime',
      header: 'Start Time',
      render: (row) => convertTo12HourFormat(row.startTime) || row.startTime,
    },
    {
      key: 'endTime',
      header: 'End Time',
      render: (row) => convertTo12HourFormat(row.endTime) || row.endTime,
    },
    {
      key: 'session',
      header: 'Session',
      render: (row) => row.session,
    },
    {
      key: 'remark',
      header: 'Remark',
      render: (row) => row.remark,
    },
    {
      key: 'registrations',
      header: 'Registrations',
      render: (row) =>
        row.registrations.map((reg) => `${reg.fname} ${reg.lname}`).join(', '),
    },
  ]

  if (isLoading) {
    return <Template>Loading...</Template>
  }

  if (isError) {
    return <Template>Error fetching deleted schedules.</Template>
  }

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <h1 className='text-xl font-bold mb-4'>Deleted Schedules</h1>
      {deletedSchedules && deletedSchedules.length > 0 ?
        <Table rows={rows} data={deletedSchedules} />
      : <p>No deleted schedules available.</p>}
      <div className='mt-5'>
        <Link href='/schedule'>
          <Button size='lg' color='blue'>
            Back to Schedules
          </Button>
        </Link>
      </div>
    </Template>
  )
}

export default ScheduleHistory

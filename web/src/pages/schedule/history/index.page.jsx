import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

import Table from '@/components/organisms/Table'
import Template from '@/components/templates/Template'

import { useDeletedSchedules } from './hooks'

const ScheduleHistory = () => {
  const { deletedSchedules, isLoading, isError } = useDeletedSchedules()
  const rows = [
    { key: 'name', header: 'Name', render: (row) => row.name },
    { key: 'date', header: 'Date', render: (row) => row.date },
    { key: 'startTime', header: 'Start Time', render: (row) => row.startTime },
    { key: 'endTime', header: 'End Time', render: (row) => row.endTime },
    {
      key: 'description',
      header: 'Description',
      render: (row) => row.description,
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

import { useRouter } from 'next/router'
import React from 'react'

import Table from '@/components/organisms/Table'
import Template from '@/components/templates/Template'

import useHooks from './hooks'

const Schedule = () => {
  const router = useRouter()
  const { scheduleId } = router.query
  const { registrations, isLoading, isError } = useHooks()

  const filteredRegistrations = registrations.filter(
    (registration) => registration.schedule_id.toString() === scheduleId,
  )

  const rows = [
    { key: 'lname', header: 'Last Name', render: (row) => row.lname },
    { key: 'fname', header: 'First Name', render: (row) => row.fname },
    { key: 'age', header: 'Age', render: (row) => row.age.toString() },
    { key: 'sex', header: 'Sex', render: (row) => row.sex },
    { key: 'gender', header: 'Gender', render: (row) => row.gender },
    { key: 'barangay', header: 'Barangay', render: (row) => row.barangay },
    {
      key: 'selectcourse',
      header: 'Course',
      render: (row) => row.selectcourse,
    },
    {
      key: 'schedule_id',
      header: 'Room',
      render: (row) => row.schedule_id,
    },
  ]

  return (
    <Template>
      {isLoading ?
        <p>Loading...</p>
      : isError ?
        <p>Error fetching data.</p>
      : <div className='flex pb-4 space-x-4'>
          <Table rows={rows} data={filteredRegistrations} />
        </div>
      }
    </Template>
  )
}

export default Schedule

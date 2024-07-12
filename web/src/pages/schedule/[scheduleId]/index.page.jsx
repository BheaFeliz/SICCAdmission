import React from 'react'

import Table from '@/components/organisms/Table'
import Template from '@/components/templates/Template'

import useHooks from './hooks'

const Schedule = () => {
  const { registrations, isLoading, isError } = useHooks()

  const rows = [
    { key: 'lname', header: 'Lirst Name', render: (row) => row.lname }, // Assuming fname is the property name in registrations
    { key: 'fname', header: 'First Name', render: (row) => row.fname }, // Assuming lname is the property name in registrations
    { key: 'age', header: 'Age', render: (row) => row.age.toString() },
    { key: 'sex', header: 'Sex', render: (row) => row.sex },
    { key: 'gender', header: 'Gender', render: (row) => row.gender },
    { key: 'barangay', header: 'Barangay', render: (row) => row.barangay },
    {
      key: 'selectcourse',
      header: 'Course',
      render: (row) => row.selectcourse,
    },
    // mag add pag ref number //
    //remove ra after and schedule_id
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
          <Table rows={rows} data={registrations} />
        </div>
      }
    </Template>
  )
}

export default Schedule

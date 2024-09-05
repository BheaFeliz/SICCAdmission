import { Table } from 'flowbite-react'
import React from 'react'
import { useGetDeletedSchedulesQuery } from 'src/hooks/api/scheduleApi'

import AdminGuard from '@/components/templates/AdminGuard'
import Template from '@/components/templates/Template'

const DeletedRegistrationsTable = () => {
  const {
    data: deletedSchedules,
    isLoading,
    isError,
  } = useGetDeletedSchedulesQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load deleted schedules</div>

  return (
    <AdminGuard>
      <Template>
        <div className='p-4'>
          <h1 className='text-2xl font-semibold mb-4'>Deleted Registrations</h1>
          {deletedSchedules && deletedSchedules.length > 0 ?
            <Table>
              <Table.Head>
                <Table.HeadCell>Schedule Name</Table.HeadCell>
                <Table.HeadCell>Reference Number</Table.HeadCell>
                <Table.HeadCell>Last Name</Table.HeadCell>
                <Table.HeadCell>First Name</Table.HeadCell>
                <Table.HeadCell>Date Deleted</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {deletedSchedules.map((schedule) =>
                  schedule.registrations.map((registration) => (
                    <Table.Row key={registration.id}>
                      <Table.Cell>{schedule.name}</Table.Cell>
                      <Table.Cell>{registration.reference_number}</Table.Cell>
                      <Table.Cell>{registration.lname}</Table.Cell>
                      <Table.Cell>{registration.fname}</Table.Cell>
                      {/* Adjust field name if needed */}
                      <Table.Cell>
                        {new Date(registration.deleted_at).toLocaleString()}
                      </Table.Cell>
                    </Table.Row>
                  )),
                )}
              </Table.Body>
            </Table>
          : <p>No deleted registrations available.</p>}
        </div>
      </Template>
    </AdminGuard>
  )
}

export default DeletedRegistrationsTable

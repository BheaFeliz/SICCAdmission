import { Table } from 'flowbite-react'
import React from 'react'

import AdminGuard from '@/components/templates/AdminGuard'
import Template from '@/components/templates/Template'
import { useGetActiveSchedulesQuery } from '@/hooks/api/scheduleApi' // Ensure this import is correct

const ActiveRegistrationsTable = () => {
  const {
    data: schedules = [],
    isLoading,
    isError,
  } = useGetActiveSchedulesQuery() // Set default value to empty array

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load schedules</div>

  // Filter out schedules and registrants that are not deleted
  const activeSchedules = (schedules || []).filter(
    (schedule) => !schedule.deleted_at,
  )

  return (
    <AdminGuard>
      <Template>
        <div className='p-4'>
          <h1 className='text-2xl font-semibold mb-4'>Active Registrations</h1>
          {activeSchedules.length > 0 ?
            <Table>
              <Table.Head>
                <Table.HeadCell>Schedule Name</Table.HeadCell>
                <Table.HeadCell>Reference Number</Table.HeadCell>
                <Table.HeadCell>Last Name</Table.HeadCell>
                <Table.HeadCell>First Name</Table.HeadCell>
                <Table.HeadCell>Registration Date</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {activeSchedules.map((schedule) =>
                  schedule.registrations
                    .filter((registration) => !registration.deleted_at)
                    .map((registration) => (
                      <Table.Row key={registration.id}>
                        <Table.Cell>{schedule.name}</Table.Cell>
                        <Table.Cell>{registration.reference_number}</Table.Cell>
                        <Table.Cell>{registration.lname}</Table.Cell>
                        <Table.Cell>{registration.fname}</Table.Cell>
                        <Table.Cell>
                          {new Date(
                            registration.created_at,
                          ).toLocaleDateString()}
                        </Table.Cell>
                      </Table.Row>
                    )),
                )}
              </Table.Body>
            </Table>
          : <p>No active registrations available.</p>}
        </div>
      </Template>
    </AdminGuard>
  )
}

export default ActiveRegistrationsTable

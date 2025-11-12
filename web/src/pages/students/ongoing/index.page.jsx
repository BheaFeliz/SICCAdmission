import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
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
              <TableHead>
                <TableHeadCell>Schedule Name</TableHeadCell>
                <TableHeadCell>Reference Number</TableHeadCell>
                <TableHeadCell>Last Name</TableHeadCell>
                <TableHeadCell>First Name</TableHeadCell>
                <TableHeadCell>Registration Date</TableHeadCell>
              </TableHead>
              <TableBody>
                {activeSchedules.map((schedule) =>
                  schedule.registrations
                    .filter((registration) => !registration.deleted_at)
                    .map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell>{schedule.name}</TableCell>
                        <TableCell>{registration.reference_number}</TableCell>
                        <TableCell>{registration.lname}</TableCell>
                        <TableCell>{registration.fname}</TableCell>
                        <TableCell>
                          {new Date(
                            registration.created_at,
                          ).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    )),
                )}
              </TableBody>
            </Table>
          : <p>No active registrations available.</p>}
        </div>
      </Template>
    </AdminGuard>
  )
}

export default ActiveRegistrationsTable

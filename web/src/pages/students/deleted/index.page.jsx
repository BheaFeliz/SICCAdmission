import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import AdminGuard from '@/components/templates/AdminGuard'
import Template from '@/components/templates/Template'
import { useGetDeletedSchedulesQuery } from '@/hooks/api/scheduleApi'

const DeletedRegistrationsTable = () => {
  const {
    data: deletedSchedules = [],
    isLoading,
    isError,
  } = useGetDeletedSchedulesQuery()
  const router = useRouter()
  const { scheduleId } = router.query

  const filteredSchedules = useMemo(() => {
    if (!scheduleId) return deletedSchedules
    return deletedSchedules.filter(
      (schedule) => String(schedule.id) === String(scheduleId),
    )
  }, [deletedSchedules, scheduleId])

  const hasSettledRegistrations = filteredSchedules.some(
    (schedule) => schedule.registrations && schedule.registrations.length > 0,
  )

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load deleted schedules</div>

  return (
    <AdminGuard>
      <Template>
        <div className='p-4'>
          <h1 className='text-2xl font-semibold mb-2'>Settled Registrations</h1>
          {scheduleId && filteredSchedules.length > 0 && (
            <p className='mb-4 text-sm text-gray-500'>
              Showing settled registrations for <strong>{filteredSchedules[0].name}</strong>
            </p>
          )}
          {hasSettledRegistrations ?
            <Table>
              <TableHead>
                <TableHeadCell>Schedule Name</TableHeadCell>
                <TableHeadCell>Reference Number</TableHeadCell>
                <TableHeadCell>Last Name</TableHeadCell>
                <TableHeadCell>First Name</TableHeadCell>
                <TableHeadCell>Date Deleted</TableHeadCell>
              </TableHead>
              <TableBody>
                {filteredSchedules.map((schedule) =>
                  (schedule.registrations || []).map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>{schedule.name}</TableCell>
                      <TableCell>{registration.reference_number}</TableCell>
                      <TableCell>{registration.lname}</TableCell>
                      <TableCell>{registration.fname}</TableCell>
                      {/* Adjust field name if needed */}
                      <TableCell>
                        {new Date(registration.deleted_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  )),
                )}
              </TableBody>
            </Table>
          : <p>
              {scheduleId ?
                'No settled registrations for this schedule yet.'
              : 'No settled registrations available.'}
            </p>}
        </div>
      </Template>
    </AdminGuard>
  )
}

export default DeletedRegistrationsTable

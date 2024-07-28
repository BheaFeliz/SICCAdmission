import { Button, Card, Table } from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/StudentTemplate'
import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi'
import { useGetRegistrationsQuery } from '@/hooks/api/studentApi'
import { useCourses } from '@/hooks/redux/useCourses'
import Link from 'next/link'
import Loading from '@/components/atoms/Loading'

function convertTo12HourFormat(time24) {
  const [hour, minute] = time24.split(':')
  let period = 'AM'
  let hour12 = parseInt(hour, 10)

  if (hour12 >= 12) {
    period = 'PM'
    if (hour12 > 12) {
      hour12 -= 12
    }
  } else if (hour12 === 0) {
    hour12 = 12
  }

  return `${hour12}:${minute} ${period}`
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

function InfoTable({
  name,
  course,
  referenceNumber,
  scheduleDate,
  scheduleStartTime,
  scheduleEndTime,
  session,
  remark,
  roomName,
}) {
  return (
    <Table>
      <Table.Head className='bg-gray-200'>
        <Table.HeadCell className='px-9 py-4 font-semibold text-xl'>
          Reference Number:
        </Table.HeadCell>
        <Table.HeadCell className='px-9 py-4 font-bold text-xl text-center'>
          {referenceNumber}
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className='divide-y divide-gray-200'>
        <Table.Row>
          <Table.Cell className='px-9 py-2 font-semibold'>Name:</Table.Cell>
          <Table.Cell className='px-9 py-2 text-center'>{name}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className='px-9 py-2 font-semibold'>Course:</Table.Cell>
          <Table.Cell className='px-9 py-2 text-center'>{course}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className='px-9 py-2 font-semibold'>
            Scheduled Date:
          </Table.Cell>
          <Table.Cell className='px-9 py-2 text-center'>
            {scheduleDate}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className='px-9 py-2 font-semibold'>
            Scheduled Start Time:
          </Table.Cell>
          <Table.Cell className='px-9 py-2 text-center'>
            {scheduleStartTime}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className='px-9 py-2 font-semibold'>
            Scheduled End Time:
          </Table.Cell>
          <Table.Cell className='px-9 py-2 text-center'>
            {scheduleEndTime}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className='px-9 py-2 font-semibold'>Session:</Table.Cell>
          <Table.Cell className='px-9 py-2 text-center'>{session}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className='px-9 py-2 font-semibold'>Remark:</Table.Cell>
          <Table.Cell className='px-9 py-2 text-center'>{remark}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className='px-9 py-2 font-semibold'>
            Room Number:
          </Table.Cell>
          <Table.Cell className='px-9 py-2 text-center'>{roomName}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

function Component() {
  const router = useRouter()
  const { ref } = router.query
  const {
    data: registrationsData,
    error: registrationsError,
    isLoading: isLoadingRegistrations,
  } = useGetRegistrationsQuery()

  const { courses } = useCourses()

  const [scheduleId, setScheduleId] = useState(null)

  useEffect(() => {
    if (!isLoadingRegistrations && registrationsData) {
      const registration = registrationsData.registrations.find(
        (reg) => reg.reference_number === ref,
      )
      if (registration) {
        setScheduleId(registration.schedule_id)
      } else {
        router.push('/error')
      }
    }
  }, [isLoadingRegistrations, registrationsData, ref, router])

  const {
    data: scheduleData,
    error: scheduleError,
    isLoading: isLoadingSchedule,
  } = useGetScheduleByIdQuery(scheduleId, {
    skip: !scheduleId,
  })

  useEffect(() => {
    if (scheduleData) {
      console.log('Schedule Data:', scheduleData)
    }
  }, [scheduleData])

  if (isLoadingRegistrations || isLoadingSchedule) {
    return (
      <div className='flex justify-center items-center h-64'>
        <Loading />
      </div>
    )
  }

  if (registrationsError || scheduleError) {
    return
  }

  if (!registrationsData || !scheduleData) {
    return
  }

  const registration = registrationsData.registrations.find(
    (reg) => reg.reference_number === ref,
  )

  const formattedStartTime =
    scheduleData ? convertTo12HourFormat(scheduleData.startTime) : 'N/A'
  const formattedEndTime =
    scheduleData ? convertTo12HourFormat(scheduleData.endTime) : 'N/A'

  const formattedDate = scheduleData ? formatDate(scheduleData.date) : 'N/A'

  const courseMap = courses.reduce((map, course) => {
    map[course.id] = course.label
    return map
  }, {})

  return (
    <Template>
      <PageHeader>Admission Application Status</PageHeader>

      <div className='m-2'>
        <Card>
          <p className='font-bold'>
            Instructions: Please remember to bring the necessary Documents (PSA,
            Form 137 and Report Card) upcoming examination
          </p>
        </Card>
      </div>

      <div className='container mx-auto mt-8'>
        <Card className='w-full mb-20'>
          <InfoTable
            name={`${registration.fname} ${registration.lname}`}
            course={courseMap[registration.courseId]}
            scheduleDate={formattedDate}
            scheduleStartTime={formattedStartTime}
            scheduleEndTime={formattedEndTime}
            session={scheduleData ? scheduleData.session : 'N/A'}
            remark={scheduleData ? scheduleData.remark : 'N/A'}
            referenceNumber={registration.reference_number}
            roomName={scheduleData ? scheduleData.name : 'N/A'}
          />
        </Card>
      </div>

      <div className='flex justify-end'>
        <Link href='/studentdashboard'>
          <Button color='blue' size='lg'>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </Template>
  )
}

export default Component

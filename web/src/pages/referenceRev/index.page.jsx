import { Card } from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/StudentTemplate'
import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi'
import { useGetRegistrationsQuery } from '@/hooks/api/studentApi'
import { Scourse } from '@/hooks/redux/const'

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
  title,
  description,
}) {
  return (
    <table className='w-full'>
      <thead className='bg-gray-200'>
        <tr>
          <th className='px-4 py-2 font-semibold'>Reference Number:</th>
          <th className='px-4 py-2'>{referenceNumber}</th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        <tr>
          <td className='px-4 py-2 font-semibold'>Name:</td>
          <td className='px-4 py-2'>{name}</td>
        </tr>
        <tr>
          <td className='px-4 py-2 font-semibold'>Course Selected:</td>
          <td className='px-4 py-2'>{course}</td>
        </tr>
        <tr>
          <td className='px-4 py-2 font-semibold'>Scheduled Date:</td>
          <td className='px-4 py-2'>{scheduleDate}</td>
        </tr>
        <tr>
          <td className='px-4 py-2 font-semibold'>Scheduled Start Time:</td>
          <td className='px-4 py-2'>{scheduleStartTime}</td>
        </tr>
        <tr>
          <td className='px-4 py-2 font-semibold'>Scheduled End Time:</td>
          <td className='px-4 py-2'>{scheduleEndTime}</td>
        </tr>
        <tr>
          <td className='px-4 py-2 font-semibold'>Description:</td>
          <td className='px-4 py-2'>{description}</td>
        </tr>
        <tr>
          <td className='px-4 py-2 font-semibold'>Room Number:</td>
          <td className='px-4 py-2'>{title}</td>
        </tr>
      </tbody>
    </table>
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

  const [scheduleId, setScheduleId] = useState(null)

  useEffect(() => {
    if (registrationsData) {
      const registration = registrationsData.registrations.find(
        (reg) => reg.reference_number === ref,
      )
      if (registration) {
        setScheduleId(registration.schedule_id)
      }
    }
  }, [registrationsData, ref])

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

  if (isLoadingRegistrations || isLoadingSchedule) return <div>Loading...</div>
  if (registrationsError || scheduleError) return <div>Error loading data</div>

  if (!registrationsData || !scheduleData)
    return <div>No registration found</div>

  const registration = registrationsData.registrations.find(
    (reg) => reg.reference_number === ref,
  )

  const courseLabelMap = Scourse.reduce((acc, course) => {
    acc[course.value] = course.label
    return acc
  }, {})

  const formattedStartTime =
    scheduleData ? convertTo12HourFormat(scheduleData.startTime) : 'N/A'
  const formattedEndTime =
    scheduleData ? convertTo12HourFormat(scheduleData.endTime) : 'N/A'

  const formattedDate = scheduleData ? formatDate(scheduleData.date) : 'N/A'

  return (
    <Template>
      <PageHeader>Admission Application Status</PageHeader>

      <div className='m-2'>
        <Card>
          <p>
            Instructions: Please remember to bring the following items for you
            upcoming examination
          </p>
        </Card>
      </div>

      <div className='container mx-auto mt-8'>
        <Card className='w-full mb-20'>
          <InfoTable
            name={`${registration.fname} ${registration.lname}`}
            course={
              courseLabelMap[registration.selectcourse] ||
              registration.selectcourse
            }
            scheduleDate={formattedDate}
            scheduleStartTime={formattedStartTime}
            scheduleEndTime={formattedEndTime}
            referenceNumber={registration.reference_number}
            title={scheduleData ? scheduleData.title : 'N/A'}
            description={scheduleData ? scheduleData.description : 'N/A'}
          />
        </Card>
      </div>
    </Template>
  )
}

export default Component

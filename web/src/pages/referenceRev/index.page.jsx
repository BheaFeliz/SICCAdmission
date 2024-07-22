import { Card } from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/StudentTemplate'
import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi'
import { useGetRegistrationsQuery } from '@/hooks/api/studentApi'
import { Scourse } from '@/hooks/redux/const'

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
          <td className='px-4 py-2 font-semibold'>Title:</td>
          <td className='px-4 py-2'>{title}</td>
        </tr>
        <tr>
          <td className='px-4 py-2 font-semibold'>Description:</td>
          <td className='px-4 py-2'>{description}</td>
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

  return (
    <Template>
      <PageHeader>Admission Application Status</PageHeader>

      <div className='m-2'>
        <Card>
          <p>
            Fill out this form carefully and TYPE all the information requested.
            Select the appropriate choices. if the item is not applicable
            indicate select or type N/A. INCOMPLETE FORMS WILL BE NOT PROCESSED.
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
            scheduleDate={scheduleData ? scheduleData.date : 'N/A'}
            scheduleStartTime={scheduleData ? scheduleData.startTime : 'N/A'}
            scheduleEndTime={scheduleData ? scheduleData.endTime : 'N/A'}
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

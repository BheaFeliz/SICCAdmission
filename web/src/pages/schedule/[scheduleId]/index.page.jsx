import { Button } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { IoCalendarSharp } from 'react-icons/io5'

import Loading from '@/components/atoms/Loading' // Import the Loading component
import PageHeader from '@/components/organisms/PageHeader'
import Table from '@/components/organisms/Table'
import StaffTemplate from '@/components/templates/StaffTemplate' // Import the StaffTemplate component
import Template from '@/components/templates/Template'
import { capitalizeFirstLetter } from '@/hooks/lib/util'
import { useUser } from '@/hooks/redux/auth' // Import the useUser hook
import { useCourses } from '@/hooks/redux/useCourses'

import useHooks from './hooks'

const breadcrumbs = [
  {
    href: '/schedule',
    title: 'Scheduling',
    icon: IoCalendarSharp,
  },
  {
    href: '#',
    title: 'View Details',
  },
]

const sanitizeFileName = (value) =>
  value ?
    value
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_')
  : ''

const formatDateForFilename = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatTimeForFilename = (timeString) => {
  if (!timeString) return ''
  const [rawHours, rawMinutes] = timeString.split(':')
  if (rawHours === undefined) return ''
  const hours = parseInt(rawHours, 10)
  if (Number.isNaN(hours)) return ''
  const minutes = (rawMinutes || '00').slice(0, 2)
  const period = hours >= 12 ? 'PM' : 'AM'
  const normalizedHour = hours % 12 || 12
  return `${String(normalizedHour).padStart(2, '0')}-${minutes}${period}`
}

const buildScheduleFileName = (schedule, fallbackName) => {
  const namePart = sanitizeFileName(schedule?.name || fallbackName || 'schedule')
  const datePart = formatDateForFilename(schedule?.date)
  const startPart =
    formatTimeForFilename(schedule?.startTime) ||
    formatTimeForFilename(schedule?.start_time)
  const endPart =
    formatTimeForFilename(schedule?.endTime) ||
    formatTimeForFilename(schedule?.end_time)
  const timePart = [startPart, endPart].filter(Boolean).join('-to-')
  return [namePart, timePart, datePart].filter(Boolean).join('_')
}

const Schedule = () => {
  const router = useRouter()
  const { scheduleId } = router.query
  const { schedule, scheduleName, registrations, isLoading, isError } = useHooks()
  const { user } = useUser() // Get the user data

  const TemplateComponent = user.role === 'admin' ? Template : StaffTemplate // Choose the template based on user role

  const { courses } = useCourses()
  const courseMap = courses.reduce((map, course) => {
    map[course.id] = course.label
    return map
  }, {})

  const filteredRegistrations = React.useMemo(() => {
    if (!Array.isArray(registrations)) return []
    if (!scheduleId) return registrations

    const regsHaveScheduleId = registrations.some(
      (registration) => registration.schedule_id !== undefined && registration.schedule_id !== null,
    )

    if (!regsHaveScheduleId) return registrations

    return registrations.filter(
      (registration) =>
        registration.schedule_id &&
        registration.schedule_id.toString() === scheduleId,
    )
  }, [registrations, scheduleId])

  const rows = [
    { key: 'lname', header: 'Last Name', render: (row) => row.lname },
    { key: 'fname', header: 'First Name', render: (row) => row.fname },
    { key: 'age', header: 'Age', render: (row) => row.age },
    {
      key: 'sex',
      header: 'Sex',
      render: (row) => capitalizeFirstLetter(row.sex),
    },
    {
      key: 'gender',
      header: 'Gender',
      render: (row) => capitalizeFirstLetter(row.gender),
    },
    { key: 'barangay', header: 'Barangay', render: (row) => row.barangay },
    {
      key: 'selectcourse',
      header: 'Course',
      render: (row) => courseMap[row.courseId] || row.courseId,
    },
  ]

  const escapeForCsv = (value) => {
    if (value === null || value === undefined) return ''
    const stringValue = value.toString()
    return /[",\n]/.test(stringValue) ?
        `"${stringValue.replace(/"/g, '""')}"`
      : stringValue
  }

  const handleDownloadCsv = () => {
    const dataToExport = filteredRegistrations.map((registration) => ({
      'Last Name': registration.lname || '',
      'First Name': registration.fname || '',
      Gender: registration.gender ?
        capitalizeFirstLetter(registration.gender)
      : '',
      'Mobile Number': registration.contactnumber || '',
    }))

    if (!dataToExport.length) {
      window.alert('No registrations available to export yet.')
      return
    }

    const headers = Object.keys(dataToExport[0])
    const csvRows = [
      headers.join(','),
      ...dataToExport.map((row) =>
        headers.map((header) => escapeForCsv(row[header])).join(','),
      ),
    ]
    const csvContent = csvRows.join('\n')
    const filenameBase =
      buildScheduleFileName(schedule, scheduleName) || sanitizeFileName(scheduleName)
    const filename = `${filenameBase || 'schedule'}_registrations.csv`

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: 'text/csv;charset=utf-8;',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <TemplateComponent>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div
        size='lg'
        className='flex flex-wrap justify-start items-center mb-8 space-x-4'
      >
        <Link href='/schedule'>
          <Button color='blue'>Back to Schedules</Button>
        </Link>
        <Button color='success' onClick={handleDownloadCsv} className='whitespace-nowrap'>
          Download Excel
        </Button>
      </div>

      {isLoading ?
        <div className='flex justify-center items-center h-screen'>
          <Loading /> {/* Show global loading spinner */}
        </div>
      : isError ?
        <p>Error fetching data.</p>
      : <div className='flex pb-4 space-x-4'>
          {/* Show table if data is available */}
          <div className='relative'>
            <Table rows={rows} data={filteredRegistrations} />
            {isLoading && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Loading /> {/* Show loading in table */}
              </div>
            )}
          </div>
        </div>
      }
    </TemplateComponent>
  )
}

export default Schedule

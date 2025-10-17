import { Alert, Button } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCalendarSharp } from 'react-icons/io5'

import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'
import { useGetCoursesQuery } from '@/hooks/api/courseApi'

import useHooks from './hooks'

const breadcrumbs = [
  {
    href: '/schedule',
    title: 'Scheduling',
    icon: IoCalendarSharp,
  },
  {
    href: '#',
    title: 'Schedule Room',
  },
]

const Field = ({
  id,
  label,
  type = 'text',
  register,
  errors,
  value,
  onChange,
  children,
}) => (
  <div className='mb-4'>
    <label htmlFor={id} className='block text-sm font-semibold mb-2'>
      {label}
    </label>
    {type === 'textarea' ?
      <textarea
        id={id}
        {...register(id)}
        value={value}
        onChange={onChange}
        className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
          errors[id] ? 'border-red-500' : ''
        }`}
      />
    : type === 'select' ?
      <select
        id={id}
        {...register(id)}
        value={value}
        onChange={onChange}
        className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
          errors[id] ? 'border-red-500' : ''
        }`}
      >
        {children}
      </select>
    : <input
        type={type}
        id={id}
        {...register(id)}
        value={value}
        onChange={onChange}
        className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
          errors[id] ? 'border-red-500' : ''
        }`}
      />
    }
    {errors[id] && <p className='text-red-500 text-sm'>{errors[id].message}</p>}
  </div>
)

const RoomSchedulingForm = () => {
  const [session, setSession] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [maxRegistrations, setMaxRegistrations] = useState(0)
  const [successMessage, setSuccessMessage] = useState('')

  const showSuccessMessage = () => {
    setSuccessMessage('Schedule has been created successfully!')
  }

  const { register, errors, handleSubmit } = useHooks(showSuccessMessage)
  const { data: coursesData } = useGetCoursesQuery()

  const handleSessionChange = (e) => {
    const selectedSession = e.target.value
    setSession(selectedSession)

    if (selectedSession === 'Morning Session') {
      setStartTime('01:00')
      setEndTime('10:00')
    } else if (selectedSession === 'Morning-Afternoon Session') {
      setStartTime('10:00')
      setEndTime('13:00')
    } else if (selectedSession === 'Afternoon Session') {
      setStartTime('13:30')
      setEndTime('14:30')
    } else {
      setStartTime('')
      setEndTime('')
    }
  }

  useEffect(() => {
    if (!startTime) return

    const startHour = parseInt(startTime.split(':')[0])
    const startPeriod = startHour < 12 ? 'AM' : 'PM'

    if (startPeriod === 'AM' && startHour >= 6 && startHour < 11) {
      setSession('Morning Session')
    } else if (startPeriod === 'AM' && startHour >= 11 && startHour < 13) {
      setSession('Morning-Afternoon Session')
    } else if (startPeriod === 'PM' && startHour >= 13 && startHour < 20) {
      setSession('Afternoon Session')
    } else {
      setSession('')
    }
  }, [startTime])

  const handleMaxRegistrationsChange = (event) => {
    setMaxRegistrations(event.target.value)
  }

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div className='flex justify-center items-center mt-4'>
        <h2 className='text-2xl font-bold mb-4'>Schedule Room</h2>
      </div>

      {successMessage && (
        <Alert color='success' className='mb-4'>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <Field
          id='name'
          label='Room Name'
          register={register}
          errors={errors}
        />
        <Field
          id='date'
          label='Date'
          type='date'
          register={register}
          errors={errors}
        />
        <Field
          id='startTime'
          label='Start Time'
          type='time'
          register={register}
          errors={errors}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <Field
          id='endTime'
          label='End Time'
          type='time'
          register={register}
          errors={errors}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <Field
          id='session'
          label='Session'
          type='select'
          register={register}
          errors={errors}
          value={session}
          onChange={handleSessionChange}
        >
          <option value=''>Select Session</option>
          <option value='Morning Session'>Morning Session</option>
          <option value='Morning-Afternoon Session'>
            Morning-Afternoon Session
          </option>
          <option value='Afternoon Session'>Afternoon Session</option>
        </Field>

        <Field
          id='max_registrations'
          label='Max Registrations'
          type='number'
          register={register}
          errors={errors}
          value={maxRegistrations}
          onChange={handleMaxRegistrationsChange}
        />

        <Field
          id='remark'
          label='Remark'
          type='textarea'
          register={register}
          errors={errors}
        />

        <div className='mb-4'>
          <label className='block text-sm font-semibold mb-2'>
            Allowed Courses
          </label>
          <div className='grid grid-cols-1 gap-2'>
            {coursesData?.courses?.map((course) => (
              <label
                key={course.id}
                className='inline-flex items-center space-x-2'
              >
                <input
                  type='checkbox'
                  value={course.id}
                  {...register('allowed_courses')}
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <span>{course.label}</span>
              </label>
            ))}
          </div>
          {errors?.allowed_courses && (
            <p className='text-red-500 text-sm'>
              {errors.allowed_courses.message}
            </p>
          )}
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div className='flex justify-start'>
            <Link href='/schedule'>
              <Button color='failure'>Back to Schedules</Button>
            </Link>
          </div>
          <div className='flex justify-end'>
            <Button type='submit' color='blue'>
              Create Schedule
            </Button>
          </div>
        </div>
      </form>
    </Template>
  )
}

export default RoomSchedulingForm

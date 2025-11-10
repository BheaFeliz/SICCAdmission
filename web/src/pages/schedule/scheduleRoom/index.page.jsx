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
  helper,
}) => {
  const error = errors[id]
  const baseClasses =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'

  const fieldRegistration = register(id)

  const commonProps = {
    id,
    ...fieldRegistration,
    className: `${baseClasses} ${error ? 'border-red-400 ring-red-100' : ''}`,
  }

  if (value !== undefined) {
    commonProps.value = value
  }

  if (onChange) {
    commonProps.onChange = (event) => {
      fieldRegistration.onChange(event)
      onChange(event)
    }
  }

  let inputElement = null
  if (type === 'textarea') {
    inputElement = <textarea rows={3} {...commonProps} />
  } else if (type === 'select') {
    inputElement = (
      <select {...commonProps}>
        {children}
      </select>
    )
  } else {
    inputElement = <input type={type} {...commonProps} />
  }

  return (
    <div className='space-y-2'>
      <label
        htmlFor={id}
        className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300'
      >
        {label}
      </label>
      {helper && <p className='text-xs text-slate-400 dark:text-slate-500'>{helper}</p>}
      {inputElement}
      {error && <p className='text-xs font-semibold text-red-500'>{error.message}</p>}
    </div>
  )
}

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
      <div className='space-y-8'>
        <PageHeader breadcrumbs={breadcrumbs} />
        <section className='rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm lg:p-8'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-blue-500'>
                Room scheduling
              </p>
              <h1 className='mt-3 text-3xl font-semibold text-slate-900'>
                Set up a new testing room
              </h1>
              <p className='mt-3 max-w-2xl text-sm text-slate-500'>
                Capture session details, automatically adjust time blocks, and
                restrict the room to relevant courses. The layout adapts to
                mobile so coordinators can create schedules on the go.
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Link
                href='/schedule'
                className='inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700'
              >
                Back to all schedules
              </Link>
              <Link
                href='/schedule/history'
                className='inline-flex items-center rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500'
              >
                View session history
              </Link>
            </div>
          </div>
        </section>

        <section className='grid gap-6 lg:grid-cols-[2fr,1fr]'>
          <div className='rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm lg:p-8'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-slate-900'>
                Room configuration
              </h2>
              {successMessage && (
                <Alert color='success' className='rounded-2xl text-sm'>
                  {successMessage}
                </Alert>
              )}
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid gap-6 md:grid-cols-2'>
                <Field
                  id='name'
                  label='Room name'
                  register={register}
                  errors={errors}
                  helper='Example: AVR-101 or Lecture Hall B'
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
                  label='Start time'
                  type='time'
                  register={register}
                  errors={errors}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <Field
                  id='endTime'
                  label='End time'
                  type='time'
                  register={register}
                  errors={errors}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              <Field
                id='session'
                label='Session'
                type='select'
                register={register}
                errors={errors}
                value={session}
                onChange={handleSessionChange}
                helper='Preset options auto-fill the start/end time.'
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
                label='Max registrations'
                type='number'
                register={register}
                errors={errors}
                value={maxRegistrations}
                onChange={handleMaxRegistrationsChange}
                helper='Number of examinees you can host for this session.'
              />

              <Field
                id='remark'
                label='Notes / reminders'
                type='textarea'
                register={register}
                errors={errors}
              />

              <div className='space-y-3'>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500'>
                  Allowed courses
                </p>
                <div className='grid gap-2 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:grid-cols-2'>
                  {coursesData?.courses?.map((course) => (
                    <label
                      key={course.id}
                      className='inline-flex items-center gap-3 rounded-2xl border border-transparent bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-blue-100 hover:bg-blue-50/50'
                    >
                      <input
                        type='checkbox'
                        value={course.id}
                        {...register('allowed_courses')}
                        className='h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500'
                      />
                      <span>{course.label}</span>
                    </label>
                  ))}
                </div>
                {errors?.allowed_courses && (
                  <p className='text-xs font-semibold text-red-500'>
                    {errors.allowed_courses.message}
                  </p>
                )}
              </div>

              <div className='flex flex-wrap gap-3'>
                <Link href='/schedule' className='flex-1 min-w-[140px]'>
                  <Button color='gray' className='w-full rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700'>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type='submit'
                  color='blue'
                  className='flex-1 min-w-[140px] rounded-2xl bg-blue-600 text-white shadow-sm hover:bg-blue-500'
                >
                  Create schedule
                </Button>
              </div>
            </form>
          </div>

          <aside className='rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm lg:p-8'>
            <h3 className='text-lg font-semibold text-slate-900'>
              Quick tips
            </h3>
            <ul className='mt-4 space-y-4 text-sm text-slate-600'>
              <li className='rounded-2xl border border-slate-100 bg-slate-50/80 p-4'>
                Pick a session preset first so start/end times auto-fill. Adjust
                manually only if needed.
              </li>
              <li className='rounded-2xl border border-slate-100 bg-slate-50/80 p-4'>
                Limit courses to avoid overbooking. You can select multiple
                programs per room.
              </li>
              <li className='rounded-2xl border border-slate-100 bg-slate-50/80 p-4'>
                Keep remarks concise—students will see these notes on their
                schedule overview.
              </li>
            </ul>
          </aside>
        </section>
      </div>
    </Template>
  )
}

export default RoomSchedulingForm

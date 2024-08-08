import { Button } from 'flowbite-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoCalendarSharp } from 'react-icons/io5'

import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'

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
        className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors[id] ? 'border-red-500' : ''}`}
      />
    : type === 'select' ?
      <select
        id={id}
        {...register(id)}
        value={value}
        onChange={onChange}
        className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors[id] ? 'border-red-500' : ''}`}
      >
        {children}
      </select>
    : <input
        type={type}
        id={id}
        {...register(id)}
        value={value}
        onChange={onChange}
        className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors[id] ? 'border-red-500' : ''}`}
      />
    }
    {errors[id] && <p className='text-red-500 text-sm'>{errors[id].message}</p>}
  </div>
)

const RoomSchedulingForm = () => {
  const { register, errors, handleSubmit } = useHooks()
  const [maxRegistrations, setMaxRegistrations] = useState(0)

  const handleMaxRegistrationsChange = (event) => {
    setMaxRegistrations(event.target.value)
  }

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div className='flex justify-center items-center mt-4'>
        <h2 className='text-2xl font-bold mb-4'>Schedule Room</h2>
      </div>
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
        />
        <Field
          id='endTime'
          label='End Time'
          type='time'
          register={register}
          errors={errors}
        />
        <Field
          id='session'
          label='Session'
          type='select'
          register={register}
          errors={errors}
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

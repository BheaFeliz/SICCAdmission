import React from 'react'

import Template from '@/components/templates/Template'

import useHooks from './hooks'

const Field = ({ id, label, type = 'text', register, errors }) => (
  <div className='mb-4'>
    <label htmlFor={id} className='block text-sm font-semibold mb-2'>
      {label}
    </label>
    {type === 'textarea' ?
      <textarea
        id={id}
        {...register(id)}
        className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors[id] ? 'border-red-500' : ''}`}
      />
    : <input
        type={type}
        id={id}
        {...register(id)}
        className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors[id] ? 'border-red-500' : ''}`}
      />
    }
    {errors[id] && <p className='text-red-500 text-sm'>{errors[id].message}</p>}
  </div>
)

const RoomSchedulingForm = () => {
  const { register, errors, handleSubmit } = useHooks()

  return (
    <Template>
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
          id='description'
          label='Description'
          type='textarea'
          register={register}
          errors={errors}
        />
        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
          >
            Confirm
          </button>
        </div>
      </form>
    </Template>
  )
}

export default RoomSchedulingForm

import React from 'react';

import Template from "@/components/templates/Template";

import useHooks from './hooks';

const RoomSchedulingForm = () => {
  const {
    register,
    errors,
    handleSubmit,
  } = useHooks();

  return (
    <Template>
      <div className="flex justify-center items-center mt-4">
        <h2 className="text-2xl font-bold mb-4">Schedule Room</h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-semibold mb-2">Date</label>
          <input 
            type="date" 
            id="date" 
            {...register('date')} 
            className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.date ? 'border-red-500' : ''}`} 
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="start-time" className="block text-sm font-semibold mb-2">Start Time</label>
          <input 
            type="time" 
            id="start-time" 
            {...register('startTime')} 
            className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.startTime ? 'border-red-500' : ''}`} 
          />
          {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="end-time" className="block text-sm font-semibold mb-2">End Time</label>
          <input 
            type="time" 
            id="end-time" 
            {...register('endTime')} 
            className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.endTime ? 'border-red-500' : ''}`} 
          />
          {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">Description</label>
          <textarea 
            id="description" 
            {...register('description')} 
            className={`w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.description ? 'border-red-500' : ''}`} 
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Confirm</button>
        </div>
      </form>
    </Template>
  );
};

export default RoomSchedulingForm;

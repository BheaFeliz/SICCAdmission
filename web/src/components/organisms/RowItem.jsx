import React from 'react'

const RowItem = ({ label, value, icon }) => {
  return (
    <div className='flex justify-between items-center py-3 border-b border-gray-200'>
      <span className='font-semibold'>{label}:</span>
      <span className='flex items-center'>
        {!!icon && icon}
        <span className='ml-2'>{value}</span>
      </span>
    </div>
  )
}

export default RowItem

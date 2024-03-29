import { Pagination as FlowbitePagination } from 'flowbite-react'
import React from 'react'

const Paginations = ({ currentPage, onPageChange, totalPages }) => {
  return (
    <div className='flex overflow-x-auto sm:justify-center'>
      <FlowbitePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default Paginations

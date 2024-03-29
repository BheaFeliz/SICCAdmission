import { Pagination as FlowbitePagination } from 'flowbite-react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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

export default Pagination

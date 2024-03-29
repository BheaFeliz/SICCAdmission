import { Avatar } from 'flowbite-react'

const Bubble = ({ isSender }) => {
  return (
    <div
      className={`flex items-start gap-2.5  ${isSender && 'flex-row-reverse'}`}
    >
      <Avatar rounded />
      <div className='flex flex-col min-w-[250px] max-w-[800px] leading-1.5'>
        <div
          className={`flex items-center space-x-2 rtl:space-x-reverse ${
            isSender && 'justify-end'
          }`}
        >
          <span className='text-sm font-semibold text-gray-900 dark:text-white'>
            Bonnie Green
          </span>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
            11:46
          </span>
        </div>
        <div className='flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
          <p className='text-sm font-normal text-gray-900 dark:text-white'>
            Thats awesome. I think our users will really appreciate the
            improvements. Thats awesome. I think our users will really
            appreciate the improvements. Thats awesome. I think our users will
            really appreciate the improvements. Thats awesome. I think our users
            will really appreciate the improvements.
          </p>
        </div>
        <span
          className={`text-sm font-normal text-gray-500 dark:text-gray-400 ${
            isSender && 'text-right'
          }`}
        >
          Delivered
        </span>
      </div>
    </div>
  )
}

export default Bubble

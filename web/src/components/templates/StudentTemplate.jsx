import Navbar from '@/components/organisms/StudentNavbar'

const StudentTemplate = ({ children, contentSx }) => {
  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white'>
      <Navbar />
      <div className={`px-4 py-4 w-full ${contentSx}`}>{children}</div>
    </div>
  )
}

export default StudentTemplate

import StaffNavbar from '../organisms/StaffNavbar'
import StaffSidebar from '../organisms/StaffSideBar'

const StaffTemplate = ({ children, contentSx }) => {
  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white'>
      <StaffNavbar />
      <div className='flex-1 flex stretch'>
        <StaffSidebar />
        <div className={`px-4 py-4 w-full ${contentSx}`}>{children}</div>
      </div>
    </div>
  )
}

export default StaffTemplate

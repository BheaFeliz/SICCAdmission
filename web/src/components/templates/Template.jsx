import Navbar from '@/components/organisms/Navbar'
import Sidebar from '@/components/organisms/SideBar'

const Template = ({ children, contentSx }) => {
  return (
    <div className='flex flex-col min-h-screen bg-white text-gray-800'>
      <Navbar />
      <div className='flex-1 flex stretch'>
        <Sidebar />
        <div className={`px-4 py-4 w-full ${contentSx}`}>{children}</div>
      </div>
    </div>
  )
}

export default Template

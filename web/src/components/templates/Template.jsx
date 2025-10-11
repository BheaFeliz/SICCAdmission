import { Flowbite, useThemeMode } from 'flowbite-react'
import { useEffect } from 'react'

import Navbar from '@/components/organisms/Navbar'
import Sidebar from '@/components/organisms/SideBar'

const Template = ({ children, contentSx }) => {
  const { setMode } = useThemeMode()

  useEffect(() => {
    // Force light mode only
    setMode('light')
  }, [setMode])

  return (
    <Flowbite>
      <div className='flex flex-col min-h-screen bg-white text-gray-800'>
        <Navbar />
        <div className='flex-1 flex stretch'>
          <Sidebar />
          <div className={`px-4 py-4 w-full ${contentSx}`}>{children}</div>
        </div>
      </div>
    </Flowbite>
  )
}

export default Template

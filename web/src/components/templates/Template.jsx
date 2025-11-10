import { Flowbite, useThemeMode } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiMenuAlt2, HiX } from 'react-icons/hi'

import Navbar from '@/components/organisms/Navbar'
import Sidebar from '@/components/organisms/SideBar'

const Template = ({ children, contentSx }) => {
  const { setMode } = useThemeMode()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  useEffect(() => {
    // Force light mode only
    setMode('light')
  }, [setMode])

  return (
    <Flowbite>
      <div className='flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 text-gray-800'>
        <Navbar />
        <div className='relative flex w-full flex-1 gap-6 px-4 py-6 sm:px-6 lg:px-10 xl:px-14'>
          <div className='hidden lg:block lg:w-72 lg:flex-shrink-0'>
            <div className='sticky top-6 rounded-3xl border border-slate-200 bg-white/90 p-2 shadow-sm backdrop-blur'>
              <Sidebar />
            </div>
          </div>

          <div className='flex-1 pb-10 min-w-0'>
            <button
              type='button'
              onClick={() => setSidebarOpen(true)}
              className='mb-4 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 lg:hidden'
            >
              <HiMenuAlt2 className='text-lg' />
              Open menu
            </button>

            <div
              className={`w-full min-w-0 rounded-3xl border border-slate-200 bg-white/95 px-4 py-5 shadow-sm overflow-x-auto sm:px-6 lg:px-8 lg:overflow-visible ${contentSx || ''}`}
            >
              {children}
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div className='fixed inset-0 z-40 flex lg:hidden'>
            <div
              className='absolute inset-0 bg-slate-900/40 backdrop-blur-sm'
              onClick={closeSidebar}
            />
            <div className='relative mr-auto flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-2xl'>
              <div className='flex items-center justify-between border-b border-slate-100 px-4 py-3'>
                <p className='text-sm font-semibold text-slate-700'>Navigation</p>
                <button
                  type='button'
                  onClick={closeSidebar}
                  className='rounded-full border border-slate-200 p-1 text-slate-500 transition hover:border-slate-300 hover:text-slate-700'
                  aria-label='Close menu'
                >
                  <HiX className='text-lg' />
                </button>
              </div>
              <div className='flex-1 overflow-y-auto px-1 py-4'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </div>
    </Flowbite>
  )
}

export default Template

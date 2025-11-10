import Navbar from '@/components/organisms/Navbar'

const Template = ({ children, contentSx }) => {
  return (
    <div className='flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 text-gray-800 dark:bg-gray-900 dark:text-white'>
      <Navbar />
      <main className='flex-1'>
        <div className='mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='rounded-3xl border border-slate-200 bg-white/95 px-4 py-5 shadow-sm transition overflow-x-auto dark:border-gray-800 dark:bg-gray-800/90 sm:px-6 lg:px-8 lg:overflow-visible'>
            <div className={`w-full min-w-0 ${contentSx || ''}`}>{children}</div>
          </div>
        </div>
      </main>
      <footer className='px-6 pb-6 text-center text-xs text-slate-400'>
        Samal Island City College · Admissions Experience
      </footer>
    </div>
  )
}

export default Template

import Navbar from '@/components/organisms/StudentNavbar'

const StudentTemplate = ({ children, contentSx }) => {
  return (
    <div className='flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 text-gray-800'>
      <Navbar />
      <main className='flex-1'>
        <div className='mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='rounded-3xl border border-slate-200 bg-white/95 px-4 py-5 shadow-sm overflow-x-auto sm:px-6 lg:px-8 lg:overflow-visible'>
            <div className={`w-full min-w-0 ${contentSx || ''}`}>{children}</div>
          </div>
        </div>
      </main>
      <footer className='px-6 pb-6 text-center text-xs text-slate-400'>
        Samal Island City College Admissions · Stay informed anywhere
      </footer>
    </div>
  )
}

export default StudentTemplate

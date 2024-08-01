import Image from 'next/image'
import Link from 'next/link'

const StudentNavbar = () => {
  return (
    <nav className='p-3 px-8 flex justify-between items-center bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-white'>
      <Link href='/studentdashboard' className='font-bold flex items-center'>
        <Image src='/logo.png' width={50} height={50} alt='logo' />
        <span className='px-2 text-xl font-medium'>
          Samal Island City College
        </span>
      </Link>
    </nav>
  )
}

export default StudentNavbar

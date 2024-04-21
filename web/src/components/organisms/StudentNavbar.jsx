import Image from 'next/image'
import Link from 'next/link'

const StudentNavbar = () => {
  return (
    <nav className='p-3 px-8 flex justify-between items-center bg-gray-50'>
      <Link href='/' className='font-bold flex items-center'>
        <Image src='/logo.png' width={30} height={30} alt='logo' />
        <span className='px-2'>Samal Island State College</span>
      </Link>
    </nav>
  )
}

export default StudentNavbar

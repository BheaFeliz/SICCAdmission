import Image from 'next/image'
import Link from 'next/link'
import { HiLogout, HiOutlineUserCircle } from 'react-icons/hi'

import { useUser } from '@/hooks/redux/auth'

const StaffNavbar = () => {
  const { user } = useUser()
  return (
    <nav className='p-3 px-8 flex justify-between items-center bg-blue-100'>
      <Link href='/' className='font-bold flex items-center'>
        <Image src='/logo.png' width={50} height={50} alt='logo' />
        <span className='px-2 text-xl font-medium'>
          Samal Island City College
        </span>
      </Link>

      <div className='flex gap-5 '>
        {user.name}

        <HiOutlineUserCircle className='cursor-pointer hover:text-orange-700 text-xl' />

        <Link href='/logout'>
          <HiLogout className='cursor-pointer hover:text-orange-700 text-xl'>
            Logout
          </HiLogout>
        </Link>
      </div>
    </nav>
  )
}

export default StaffNavbar

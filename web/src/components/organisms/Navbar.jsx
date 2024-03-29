import Image from 'next/image'
import Link from 'next/link'
import { HiLogout, HiOutlineUserCircle } from 'react-icons/hi'

const Navbar = () => {
  return (
    <nav className='p-3 px-8 flex justify-between items-center bg-gray-50'>
      <Link href='/' className='font-bold flex items-center'>
        <Image src='/logo.png' width={30} height={30} alt='logo' />
        <span className='px-2'>PC Bee Parts Ordering System</span>
      </Link>

      <div className='flex gap-5 '>
        <Link href='/profile'>
          <HiOutlineUserCircle className='cursor-pointer hover:text-orange-700 text-xl' />
        </Link>
        <Link href='/logout'>
          <HiLogout className='cursor-pointer hover:text-orange-700 text-xl'>
            Logout
          </HiLogout>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

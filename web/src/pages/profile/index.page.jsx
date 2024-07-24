import { Avatar, Card } from 'flowbite-react'
import Link from 'next/link'
import { HiOutlinePhone, HiOutlineUser } from 'react-icons/hi'

import BreadCrumbs from '@/components/atoms/BreadCrumbs'
import PageHeader from '@/components/organisms/PageHeader'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { useUser } from '@/hooks/redux/auth'
import { useInitials } from '@/hooks/useInitials'

function Component() {
  const { user } = useUser()
  const initials = useInitials(user?.name || '')

  return (
    <div>
      {user.role === 'admin' ?
        <Template>
          <PageHeader>
            <BreadCrumbs />
          </PageHeader>

          <div className='flex justify-center items-right'>
            <Card className='w-80 mb-20'>
              <div className='flex flex-col items-center'>
                <Avatar
                  placeholderInitials={initials}
                  rounded
                  size='lg'
                  text='lg'
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                  {user.name}
                </h5>
                <span className='text-sm text-gray-500 dark:text-black-400 mb-2 text-center'>
                  {user.position}
                </span>

                <div className='w-full px-2 py-3 mt-4 bg-gray-100 flex items-center'>
                  <HiOutlineUser className='mx-2' />
                  {user.role}
                </div>
                <div className='w-full px-2 py-3 mt-4 bg-gray-100 flex items-center'>
                  <HiOutlinePhone className='mx-2' />
                  {user.phone}
                </div>
                <Link
                  href='/profile/change-password'
                  className='mt-12 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                >
                  Change Password
                </Link>
              </div>
            </Card>
          </div>
        </Template>
      : <StaffTemplate>
          <PageHeader>
            <BreadCrumbs />
          </PageHeader>

          <div className='flex justify-center items-right'>
            <Card className='w-80 mb-20'>
              <div className='flex flex-col items-center'>
                <Avatar
                  placeholderInitials={initials}
                  rounded
                  size='lg'
                  text='lg'
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                  {user.name}
                </h5>
                <span className='text-sm text-gray-500 dark:text-black-400 mb-2 text-center'>
                  {user.position}
                </span>

                <div className='w-full px-2 py-3 mt-4 bg-gray-100 flex items-center'>
                  <HiOutlineUser className='mx-2' />
                  {user.role}
                </div>
                <div className='w-full px-2 py-3 mt-4 bg-gray-100 flex items-center'>
                  <HiOutlinePhone className='mx-2' />
                  {user.phone}
                </div>
                <Link
                  href='/profile/change-password'
                  className='mt-12 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                >
                  Change Password
                </Link>
              </div>
            </Card>
          </div>
        </StaffTemplate>
      }
    </div>
  )
}

export default Component

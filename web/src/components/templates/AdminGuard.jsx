import { Button } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiArrowLeft, HiOutlineInformationCircle } from 'react-icons/hi'

import { useUser } from '@/hooks/redux/auth'

import Template from './blanktemplate'

const AdminGuard = ({ children }) => {
  const router = useRouter()
  const { user } = useUser()

  const Forbidden = () => {
    return (
      <Template>
        <section className='bg-white dark:bg-gray-900 '>
          <div className='container flex items-center min-h-[50vh] px-6 py-12 mx-auto'>
            <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
              <p className='p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800'>
                <HiOutlineInformationCircle size={30} />
              </p>
              <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
                Page not found
              </h1>
              <p className='mt-4 text-gray-500 dark:text-gray-400'>
                You&apos;re not permitted to see this. <br />
                The page you&apos;re trying to access has restricted access.{' '}
                <br />
                If you feel this is a mistake, contact your admin.
              </p>

              <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
                <Button color='white' onClick={() => router.back()}>
                  <HiArrowLeft /> Go Back
                </Button>

                <Link href='/dashboard'>
                  <Button color='blue'>Take me home</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Template>
    )
  }

  return user.role === 'admin' ? children : <Forbidden />
}

export default AdminGuard

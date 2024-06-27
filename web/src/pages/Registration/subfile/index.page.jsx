import {Card, } from 'flowbite-react'
import Link from 'next/link'

import BreadCrumbs from '@/components/atoms/BreadCrumbs'
import FilePickerInput from '@/components/organisms/FilePickerInput '
import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/StudentTemplate'

function Component() {

  return (
    <Template>
      <PageHeader>
        <BreadCrumbs />
      </PageHeader>

      <div className='flex justify-center items-right '>
        <Card className='w-96 mb-20'>
          <div className='flex flex-col'>

            <label className="text-sm font-medium text-gray-900 dark:text-white">Import Picture:</label>
            <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
              <FilePickerInput
              name="importP"
              />
            </h5>

            <div className='w-full px-1 mt-2 flex justify-end'>
            <Link
              color="blue"
              href='/registration/referenceView'
              className='mt-12 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
            >
              Submit
            </Link>
            </div>

          </div>
        </Card>
      </div>
    </Template>
  )
}

export default Component

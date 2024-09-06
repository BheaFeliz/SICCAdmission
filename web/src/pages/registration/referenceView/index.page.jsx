import { Card } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/StudentTemplate'
import { useGetRegistrationsQuery } from '@/hooks/api/studentApi'

function Component() {
  const { data, isLoading, error } = useGetRegistrationsQuery()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error fetching registrations: {error.message}</p>
  }

  const registrations = Array.isArray(data) ? data : data?.registrations || []
  const mostRecentRegistration =
    registrations.length > 0 ? registrations[registrations.length - 1] : null

  return (
    <Template>
      <PageHeader>Admission Application Received:</PageHeader>
      <div className='container mx-auto mb-8'>
        <h1 className='text-4xl'>Admission Applications Received:</h1>
      </div>
      <div className='container mx-auto mt-8'>
        {mostRecentRegistration ?
          <Card key={mostRecentRegistration.id} className='w-full mb-2'>
            <p>
              We have successfully received your Admission Application. Your
              Reference No.{' '}
              <Link href={`/referenceRev?ref=${mostRecentRegistration.reference_number}`}>
                <span style={{ fontWeight: 'bold', fontSize: '18px', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                  {mostRecentRegistration.reference_number}
                </span>
              </Link>
            </p>
            <p>
              The documents you submitted, if any, will be verified by the
              Registrar&rsquo;s office. In case you did not upload documents,
              kindly bring them to the scheduled date of your admission test and
              give them to the Admission Officer.
            </p>

            <div className='w-full px-1 mt-2 flex justify-end'>
              <Link
                href='/studentdashboard'
                className='inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
              >
                Done
              </Link>
            </div>
          </Card>
        : <p>No current registration found.</p>}
      </div>
    </Template>
  )
}

export default Component

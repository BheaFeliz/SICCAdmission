import { Card } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';

import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/StudentTemplate';


function InfoTable({ name, course, classroom, schoolYear, referenceNumber }) {
  return (
    <table className="w-full">
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-4 py-2 font-semibold">Name:</td>
          <td className="px-4 py-2">{name}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-semibold">Course Selected:</td>
          <td className="px-4 py-2">{course}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-semibold">Classroom #:</td>
          <td className="px-4 py-2">{classroom}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-semibold">School Year:</td>
          <td className="px-4 py-2">{schoolYear}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-semibold">Reference Number:</td>
          <td className="px-4 py-2">{referenceNumber}</td>
        </tr>
      </tbody>
    </table>
  );
}

function Component() {
  return (
    <Template>
      <PageHeader >
asd
      </PageHeader>
      <div className="container mx-auto mb-8" >
      <h1 className='text-5xl'>Addmission Application Status</h1>
      </div>

      <div className="container mx-auto mt-8">
        <Card className='w-full mb-20'>
          <InfoTable
            name="bath#"
            course="Computer Science"
            classroom="#123"
            schoolYear="2024-2025"
            referenceNumber="REF123456"
          />
          <div className='w-full px-1 mt-2 flex justify-end'>
            <Link
              href='/studentStatusDashboard'
              className='inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
            >
              Done
            </Link>
          </div>
        </Card>
      </div>
    </Template>
  );
}

export default Component;

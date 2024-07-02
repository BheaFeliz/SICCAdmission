import { Card } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';

import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/StudentTemplate';


function Component() {
  return (
    <Template>
      <PageHeader >
asd
      </PageHeader>
      <div className="container mx-auto mb-8" >
      <h1 className='text-5xl'>Addmission Application Recieved:</h1>
      </div>

      <div className="container mx-auto mt-8">
      <Card className='w-full mb-2'>
        <p>We have succesfully recieved your Admission Application . Your Reference No. 104507</p>
         <p>The Documents you submitted, if any, will be verified by the Registrars office. 
          incase you did not upload documments kindly bring them to the scheduled date of your 
          admission test and give it to the Admission Officer.   </p>
         <p>Important Notice : Monitor the Contact number you&lsquo;ve given for the scheduled date of admission test. </p>

         <div className='w-full px-1 mt-2 flex justify-end'>
            <Link
              href='/studentdashboard'
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

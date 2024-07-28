import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { IoCalendarSharp } from 'react-icons/io5';

import PageHeader from '@/components/organisms/PageHeader';
import Table from '@/components/organisms/Table';
import Template from '@/components/templates/Template';
import { capitalizeFirstLetter } from '@/hooks/lib/util';
import { useCourses } from '@/hooks/redux/useCourses';
import Loading from '@/components/atoms/Loading'; // Import the Loading component

import useHooks from './hooks';

const breadcrumbs = [
  {
    href: '/schedule',
    title: 'Scheduling',
    icon: IoCalendarSharp,
  },
  {
    href: '#',
    title: 'View Details',
  },
];

const Schedule = () => {
  const router = useRouter();
  const { scheduleId } = router.query;
  const { scheduleName, registrations, isLoading, isError } = useHooks();

  const { courses } = useCourses();
  const courseMap = courses.reduce((map, course) => {
    map[course.id] = course.label;
    return map;
  }, {});

  const filteredRegistrations = registrations.filter(
    (registration) => registration.schedule_id.toString() === scheduleId,
  );

  const rows = [
    { key: 'lname', header: 'Last Name', render: (row) => row.lname },
    { key: 'fname', header: 'First Name', render: (row) => row.fname },
    { key: 'age', header: 'Age', render: (row) => row.age },
    {
      key: 'sex',
      header: 'Sex',
      render: (row) => capitalizeFirstLetter(row.sex),
    },
    {
      key: 'gender',
      header: 'Gender',
      render: (row) => capitalizeFirstLetter(row.gender),
    },
    { key: 'barangay', header: 'Barangay', render: (row) => row.barangay },
    {
      key: 'selectcourse',
      header: 'Course',
      render: (row) => courseMap[row.courseId] || row.courseId,
    },
  ];

  const handleDownloadExcel = () => {
    // Implement the download logic here
  };

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div
        size='lg'
        className='flex flex-wrap justify-start items-center mb-8 space-x-4'
      >
        <Link href='/schedule'>
          <Button color='blue'>Back to Schedules</Button>
        </Link>
        <Button onClick={handleDownloadExcel} className='btn-download'>
          Download Excel
        </Button>
      </div>

      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loading /> {/* Show global loading spinner */}
        </div>
      ) : isError ? (
        <p>Error fetching data.</p>
      ) : (
        <div className='flex pb-4 space-x-4'>
          {/* Show table if data is available */}
          <div className='relative'>
            <Table rows={rows} data={filteredRegistrations} />
            {isLoading && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Loading /> {/* Show loading in table */}
              </div>
            )}
          </div>
        </div>
      )}
    </Template>
  );
};

export default Schedule;

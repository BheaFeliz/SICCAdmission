import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';
import { IoCalendarSharp } from 'react-icons/io5';

import Loading from '@/components/atoms/Loading'; // Import the Loading component
import PageHeader from '@/components/organisms/PageHeader';
import StaffTemplate from '@/components/templates/StaffTemplate'; // Import the StaffTemplate component
import Template from '@/components/templates/Template';
import { useUser } from '@/hooks/redux/auth'; // Import the useUser hook

import { useDeletedSchedules } from './hooks';

const breadcrumbs = [
  {
    href: '/schedule',
    title: 'Scheduling',
    icon: IoCalendarSharp,
  },
  {
    href: '/history',
    title: 'View History',
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // getMonth() returns zero-based month
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour}:${minutes} ${period}`;
};

const ScheduleHistory = () => {
  const { user } = useUser(); // Get the user data
  const { deletedSchedules, isLoading, isError } = useDeletedSchedules();

  const TemplateComponent = user.role === 'admin' ? Template : StaffTemplate; // Choose the template based on user role

  if (isLoading) {
    return (
      <TemplateComponent>
        <div className='flex justify-center items-center h-screen'>
          <Loading /> {/* Show global loading spinner */}
        </div>
      </TemplateComponent>
    );
  }

  if (isError) {
    return <TemplateComponent>Error fetching deleted schedules.</TemplateComponent>;
  }

  return (
    <TemplateComponent>
      <PageHeader breadcrumbs={breadcrumbs} />
      <h1 className='text-xl font-bold mb-4'>Deleted Schedules</h1>
      <div className='grid grid-cols-3 gap-2'>
        {deletedSchedules && deletedSchedules.length > 0 ? (
          deletedSchedules.map((schedule) => (
            <Card key={schedule.id} className='p-2 relative'>
              {/* Overlay loading spinner */}
              <div className='absolute inset-0 flex items-center justify-center'>
                {isLoading && <Loading />} {/* Show loading in card */}
              </div>
              <div className='relative'>
                <h2 className='text-lg font-bold'>{schedule.name}</h2>
                <p>Date: {formatDate(schedule.date)}</p>
                <p>Start Time: {convertTo12HourFormat(schedule.startTime)}</p>
                <p>End Time: {convertTo12HourFormat(schedule.endTime)}</p>
                <p>Max Registrations: {schedule.max_registrations}</p>
                <p>{schedule.session}</p>
                <p>{schedule.remark}</p>

                <div className='flex space-x-2 mt-2'>
                  <Link href={`/schedule/${schedule.id}`} passHref>
                    <Button as='a' size='lg' color='blue'>
                      Deleted Registrations
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No deleted schedules available.</p>
        )}
      </div>
      <div className='mt-5 flex justify-end mr-6'>
        <Link href='/schedule'>
          <Button size='lg' color='blue'>
            Back to Schedules
          </Button>
        </Link>
      </div>
    </TemplateComponent>
  );
};

export default ScheduleHistory;
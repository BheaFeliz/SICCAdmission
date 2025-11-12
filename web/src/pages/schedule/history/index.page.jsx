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
    href: '/schedule/history',
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

const escapeForCsv = (value) => {
  if (value === null || value === undefined) return '';
  const stringValue = value.toString();
  return /[",\n]/.test(stringValue) ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
};

const formatGender = (gender) => {
  if (!gender) return '';
  const lower = gender.toString().toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const sanitizeFileName = (value) =>
  value ?
    value
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_')
  : '';

const formatDateForFilename = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTimeForFilename = (timeString) => {
  if (!timeString) return '';
  const [rawHours, rawMinutes] = timeString.split(':');
  if (rawHours === undefined) return '';
  const hours = parseInt(rawHours, 10);
  if (Number.isNaN(hours)) return '';
  const minutes = (rawMinutes || '00').slice(0, 2);
  const period = hours >= 12 ? 'PM' : 'AM';
  const normalizedHour = hours % 12 || 12;
  return `${String(normalizedHour).padStart(2, '0')}-${minutes}${period}`;
};

const buildScheduleFileName = (schedule) => {
  const namePart = sanitizeFileName(schedule?.name || 'schedule');
  const datePart = formatDateForFilename(schedule?.date);
  const startPart =
    formatTimeForFilename(schedule?.startTime) ||
    formatTimeForFilename(schedule?.start_time);
  const endPart =
    formatTimeForFilename(schedule?.endTime) ||
    formatTimeForFilename(schedule?.end_time);
  const timePart = [startPart, endPart].filter(Boolean).join('-to-');
  return [namePart, timePart, datePart].filter(Boolean).join('_');
};

const buildScheduleRows = (schedule) => {
  if (!schedule.registrations?.length) {
    return [];
  }

  return schedule.registrations.map((registration) => ({
    'Last Name': registration.lname || '',
    'First Name': registration.fname || '',
    Gender: formatGender(registration.gender),
    'Mobile Number': registration.contactnumber || '',
  }));
};

const downloadCsv = (rows, filename) => {
  if (!rows.length) {
    window.alert('No data available to export yet.');
    return;
  }

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => escapeForCsv(row[header])).join(',')),
  ].join('\n');

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
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

  const handleExportAllCsv = () => {
    if (!deletedSchedules?.length) {
      window.alert('No settled schedules available to export yet.');
      return;
    }

    const rows = deletedSchedules.flatMap((schedule) => buildScheduleRows(schedule));
    const today = new Date();
    const filename = `all_settled_schedules_${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}.csv`;

    downloadCsv(rows, filename);
  };

  const handleExportSchedule = (schedule) => {
    const rows = buildScheduleRows(schedule);
    const baseName = buildScheduleFileName(schedule) || 'schedule';
    downloadCsv(rows, `${baseName}_settled.csv`);
  };

  return (
    <TemplateComponent>
      <PageHeader
        breadcrumbs={breadcrumbs}
        right={
          <button
            type='button'
            onClick={handleExportAllCsv}
            className='inline-flex items-center rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500'
          >
            Export all settled schedules
          </button>
        }
      />
      <h1 className='text-xl font-bold mb-4'>Settled Schedules</h1>
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
                  <Link href={`/students/deleted?scheduleId=${schedule.id}`} passHref>
                    <Button as='a' size='lg' color='blue'>
                      Settled Registrations
                    </Button>
                  </Link>
                  <Link href={`/schedule/${schedule.id}`} passHref>
                    <Button as='a' size='lg' color='gray'>
                      View Details
                    </Button>
                  </Link>
                  <Button
                    size='lg'
                    color='light'
                    onClick={() => handleExportSchedule(schedule)}
                  >
                    Export CSV
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No settled schedules available.</p>
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

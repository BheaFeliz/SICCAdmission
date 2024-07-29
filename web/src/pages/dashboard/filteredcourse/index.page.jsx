import { useRouter } from 'next/router';
import { IoAccessibilitySharp } from 'react-icons/io5';

import Paginations from '@/components/atoms/Pagination';
import PageHeader from '@/components/organisms/PageHeader';
import Table from '@/components/organisms/Table';
import Template from '@/components/templates/Template';
import StaffTemplate from '@/components/templates/StaffTemplate'; // Import the StaffTemplate component
import { capitalizeFirstLetter } from '@/hooks/lib/util';
import { Scourse, SDistrict } from '@/hooks/redux/const';
import Loading from '@/components/atoms/Loading';
import { useUser } from '@/hooks/redux/auth'; // Import the useUser hook

import useHooks from './hooks';
import Link from 'next/link';
import { Button } from 'flowbite-react';

const FilteredCourse = () => {
  const router = useRouter();
  const { course: courseId } = router.query;
  const numericCourseId = Number(courseId); // Convert courseId to a number

  const { user } = useUser(); // Get the user data
  const { registrations, currentPage, onPageChange, isLoading } = useHooks(numericCourseId);

  const TemplateComponent = user.role === 'admin' ? Template : StaffTemplate; // Choose the template based on user role

  const breadcrumbs = [
    {
      href: '/dashboard',
      title: 'Dashboard',
      icon: IoAccessibilitySharp,
    },
    {
      href: '#/dashboard/filteredcourse',
      title: 'Student',
    },
  ];

  const courseLabelMap = Scourse.reduce((acc, course) => {
    acc[course.value] = course.label;
    return acc;
  }, {});

  const districtLabelMap = SDistrict.reduce((acc, district) => {
    acc[district.value] = district.label;
    return acc;
  }, {});

  const rows = [
    { key: 'lname', header: 'Last Name', render: (item) => item.lname },
    { key: 'fname', header: 'First Name', render: (item) => item.fname },
    { key: 'age', header: 'Age', render: (item) => item.age },
    {
      key: 'sex',
      header: 'Sex',
      render: (item) => capitalizeFirstLetter(item.sex),
    },
    {
      key: 'gender',
      header: 'Gender',
      render: (item) => capitalizeFirstLetter(item.gender),
    },
    {
      key: 'contactnumber',
      header: 'Contact Number',
      render: (item) => item.contactnumber,
    },
    { key: 'email', header: 'Email Address', render: (item) => item.email },
    {
      key: 'courseId',
      header: 'Course',
      render: (item) => courseLabelMap[item.courseId] || item.courseId,
    },
    {
      key: 'district',
      header: 'District',
      render: (item) => districtLabelMap[item.district] || item.district,
    },
  ];

  const filteredRegistrations = numericCourseId
    ? registrations.filter(
        (registration) => registration.courseId === numericCourseId
      )
    : registrations;

  const totalCourses = filteredRegistrations.length;

  const itemsPerPage = 10;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedData = filteredRegistrations.slice(startIdx, endIdx);

  return (
    <TemplateComponent>
      <PageHeader breadcrumbs={breadcrumbs} />

      {isLoading ? (
        <div className='flex justify-center items-center h-64'>
          <Loading />
        </div>
      ) : (
        <>
          <div className='mb-4'>
            <p>Total Registered: {totalCourses}</p>
          </div>

          <Table rows={rows} data={paginatedData} />

          <div className='mt-4 flex justify-center'>
            <Paginations
              currentPage={currentPage}
              onPageChange={onPageChange}
              totalPages={Math.ceil(filteredRegistrations.length / itemsPerPage)}
            />
          </div>
        </>
      )}
      <div className='mt-5 flex justify-end mr-6'>
        <Link href='/dashboard'>
          <Button size='lg' color='blue'>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </TemplateComponent>
  );
};

export default FilteredCourse;

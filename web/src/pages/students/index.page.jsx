import React from 'react';

import Loading from '@/components/atoms/Loading';
import Paginations from '@/components/atoms/Pagination';
import Table from '@/components/organisms/Table';
import Template from '@/components/templates/Template';
import { capitalizeFirstLetter } from '@/hooks/lib/util';
import { Scourse, SDistrict } from '@/hooks/redux/const';

import useHooks from './hooks';

const Dashboard = () => {
  const {
    registrations,
    isLoading,
    currentPage,
    onPageChange,
  } = useHooks();

  const courseLabelMap = Scourse.reduce((acc, course) => {
    acc[course.value] = course.label;
    return acc;
  }, {});

  const districtLabelMap = SDistrict.reduce((acc, district) => {
    acc[district.value] = district.label;
    return acc;
  }, {});

  const rows = [
    { key: 'id', header: 'ID', render: (item) => item.id },
    { key: 'fname', header: 'First Name', render: (item) => item.fname },
    { key: 'lname', header: 'Last Name', render: (item) => item.lname },
    { key: 'age', header: 'Age', render: (item) => item.age },
    { key: 'sex', header: 'Sex', render: (item) => capitalizeFirstLetter(item.sex) },
    { key: 'gender', header: 'Gender', render: (item) => capitalizeFirstLetter(item.gender) },
    { key: 'contactnumber', header: 'Contactnumber', render: (item) => item.contactnumber },
    { key: 'email', header: 'Email', render: (item) => item.email },
    { 
      key: 'Scourse',  
      header: 'Course', 
      render: (item) => 
        courseLabelMap[item.selectcourse] || item.selectcourse 
    },
    { 
      key: 'district',  
      header: 'District', 
      render: (item) => districtLabelMap[item.district] || item.district 
    },
  ];

  // Calculate the slice of registrations to display based on the current page
  const itemsPerPage = 10;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedData = registrations.slice(startIdx, endIdx);

  return (
    <Template>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Student Registrations</h1>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <>
            <Table rows={rows} data={paginatedData} />
            <div className="mt-4 flex justify-center">
              <Paginations
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={Math.ceil(registrations.length / itemsPerPage)}
              />
            </div>
          </>
        )}
      </div>
    </Template>
  );
};

export default Dashboard;

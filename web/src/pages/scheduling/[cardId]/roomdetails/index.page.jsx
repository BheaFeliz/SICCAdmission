import React from 'react';
import { useParams } from 'react-router-dom';

import Loading from '@/components/atoms/Loading';
import Paginations from '@/components/atoms/Pagination';
import SelectInput from '@/components/organisms/SelectInput';
import Table from '@/components/organisms/Table';
import Template from '@/components/templates/Template';

import useHooks from './hooks';

const RoomDetails = ({ cardId }) => {
  const { id } = useParams();
  const actualCardId = cardId || id; // Use cardId prop or route param
  const {
    scheduling,
    scheduleError,
    scheduleLoading,
    studentsError,
    studentsLoading,
    currentPage,
    setCurrentPage,
    selectedCourse,
    setSelectedCourse,
    selectedDistrict,
    setSelectedDistrict,
    selectedAge,
    setSelectedAge,
    selectedSex,
    setSelectedSex,
    selectedGender,
    setSelectedGender,
    courseLabelMap,
    districtLabelMap,
    filteredRegistrations,
    paginatedStudents,
    totalPages,
    uniqueAges,
    uniqueSexes,
    uniqueGenders,
  } = useHooks(actualCardId);

  if (scheduleLoading || studentsLoading) {
    return (
      <Template>
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      </Template>
    );
  }

  if (scheduleError || studentsError) {
    return (
      <Template>
        <div className="container mx-auto p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Error loading data</h2>
            {scheduleError && <p>Schedule Error: {scheduleError.message}</p>}
            {studentsError && <p>Students Error: {studentsError.message}</p>}
          </div>
        </div>
      </Template>
    );
  }

  const rows = [
    { key: 'id', header: 'ID', render: (item) => item.id },
    { key: 'fname', header: 'First Name', render: (item) => item.fname },
    { key: 'lname', header: 'Last Name', render: (item) => item.lname },
    { key: 'age', header: 'Age', render: (item) => item.age },
    { key: 'sex', header: 'Sex', render: (item) => capitalizeFirstLetter(item.sex) },
    { key: 'gender', header: 'Gender', render: (item) => capitalizeFirstLetter(item.gender) },
    { key: 'contactnumber', header: 'Contact Number', render: (item) => item.contactnumber },
    { key: 'email', header: 'Email', render: (item) => item.email },
    { key: 'Scourse', header: 'Course', render: (item) => courseLabelMap[item.selectcourse] || item.selectcourse },
    { key: 'district', header: 'District', render: (item) => districtLabelMap[item.district] || item.district },
  ];

  const noDataMessage = "No students found for this schedule.";

  return (
    <Template>
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">{scheduling?.roomName || 'Room Name Not Available'}</h2>
          <div className="mb-4">
            <p><strong>Schedule Date:</strong> {scheduling?.date || 'Date Not Available'}</p>
            <p><strong>Start Time:</strong> {scheduling?.startTime || 'Start Time Not Available'}</p>
            <p><strong>End Time:</strong> {scheduling?.endTime || 'End Time Not Available'}</p>
          </div>
          <div className="flex flex-wrap justify-start items-center mb-8 space-x-4">
            <SelectInput
              options={[{ value: '', label: 'All Courses' }, ...Scourse]}
              name='course'
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            />
            <SelectInput
              options={[{ value: '', label: 'All Districts' }, ...SDistrict]}
              name='district'
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            />
            <SelectInput
              options={[{ value: '', label: 'All Ages' }, ...uniqueAges]}
              name='age'
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
            />
            <SelectInput
              options={[{ value: '', label: 'All Sexes' }, ...uniqueSexes]}
              name='sex'
              value={selectedSex}
              onChange={(e) => setSelectedSex(e.target.value)}
            />
            <SelectInput
              options={[{ value: '', label: 'All Genders' }, ...uniqueGenders]}
              name='gender'
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Students:</h3>
            {filteredRegistrations.length > 0 ? (
              <>
                <Table rows={rows} data={paginatedStudents} />
                <div className="mt-4 flex justify-center">
                  <Paginations
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    totalPages={totalPages}
                  />
                </div>
              </>
            ) : (
              <p>{noDataMessage}</p>
            )}
          </div>
          <div className="mt-4">
            <p>{filteredRegistrations.length >= 30 ? 'Room Full' : `Slots Available: ${30 - filteredRegistrations.length}`}</p>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default RoomDetails;

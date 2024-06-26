import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '@/components/atoms/Loading';
import Paginations from '@/components/atoms/Pagination';
import SelectInput from '@/components/organisms/SelectInput';
import Table from '@/components/organisms/Table';
import Template from '@/components/templates/Template';
import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi';
import { useGetRegistrationByIdQuery } from '@/hooks/api/studentApi';
import { capitalizeFirstLetter } from '@/hooks/lib/util';
import { Scourse, SDistrict } from '@/hooks/redux/const';

const RoomDetails = ({ cardId }) => {
  const { id } = useParams();
  const actualCardId = cardId || id; // Use cardId prop or route param

  // Fetch scheduling data
  const { data: scheduling, error: scheduleError, isLoading: scheduleLoading } = useGetScheduleByIdQuery(actualCardId);
  // Fetch student data
  const { data: students, error: studentsError, isLoading: studentsLoading } = useGetRegistrationByIdQuery(actualCardId);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  // Label mapping for courses and districts
  const courseLabelMap = Scourse.reduce((acc, course) => {
    acc[course.value] = course.label;
    return acc;
  }, {});

  const districtLabelMap = SDistrict.reduce((acc, district) => {
    acc[district.value] = district.label;
    return acc;
  }, {});

  useEffect(() => {
    if (scheduleError || studentsError) {
      console.error('Error fetching data', { scheduleError, studentsError });
    }
  }, [scheduleError, studentsError]);

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

  // Student list processing
  const studentList = students?.registrations || [];

  // Define table rows
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

  // Apply filters to the student list
  const applyFilters = (registrations) => {
    return registrations.filter((reg) => {
      return (
        (!selectedCourse || reg.selectcourse === selectedCourse) &&
        (!selectedDistrict || reg.district === selectedDistrict) &&
        (!selectedAge || reg.age.toString() === selectedAge) &&
        (!selectedSex || reg.sex.toLowerCase() === selectedSex.toLowerCase()) &&
        (!selectedGender || reg.gender.toLowerCase() === selectedGender.toLowerCase())
      );
    });
  };

  const filteredRegistrations = applyFilters(studentList);

  // Pagination logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const paginatedStudents = filteredRegistrations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const noDataMessage = "No students found for this schedule.";

  // Extract unique values for filtering options
  const uniqueAges = [...new Set(studentList.map((reg) => reg.age))].map((age) => ({ value: age, label: age }));
  const uniqueSexes = [...new Set(studentList.map((reg) => reg.sex))].map((sex) => ({ value: sex, label: capitalizeFirstLetter(sex) }));
  const uniqueGenders = [...new Set(studentList.map((reg) => reg.gender))].map((gender) => ({ value: gender, label: capitalizeFirstLetter(gender) }));

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
            <p>{studentList.length >= 30 ? 'Room Full' : `Slots Available: ${30 - studentList.length}`}</p>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default RoomDetails;

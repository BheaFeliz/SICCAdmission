import React from 'react';
import { useParams } from 'react-router-dom';

import Loading from '@/components/atoms/Loading';
import Paginations from '@/components/atoms/Pagination';
import SelectInput from '@/components/organisms/SelectInput';
import Table from '@/components/organisms/Table';
import Template from '@/components/templates/Template';

// import { useGetSchedulesQuery } from '@/hooks/api/scheduleApi'; // Corrected import
import useRoomDetails from './hooks';

const RoomDetails = ({ cardId }) => {
  const { id } = useParams();
  const actualCardId = cardId || id;
  const {
    scheduling,
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
    paginatedStudents,
    totalPages,
    uniqueAges,
    uniqueSexes,
    uniqueGenders,
  } = useRoomDetails(actualCardId);

  // Use correct function name: useGetSchedulesQuery instead of useGetSchedulesByIdQuery
  // const { data: scheduling, error: scheduleErrorData, isLoading: scheduleLoadingData } = useGetSchedulesQuery(actualCardId);

  if (scheduleLoadingData || studentsLoading) {
    return (
      <Template>
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      </Template>
    );
  }

  if (scheduleErrorData || studentsError) {
    return (
      <Template>
        <div className="flex items-center justify-center">
          <h1 className="text-red-500">Error loading data. Please try again later.</h1>
        </div>
      </Template>
    );
  }

  return (
    <Template>
      <div className="bg-white p-4">
        <h1 className="text-xl font-bold mb-4">Room Details - {scheduling?.title}</h1>
        <div className="flex mb-4 space-x-4">
          <SelectInput
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            options={courseLabelMap}
            placeholder="Filter by Course"
          />
          <SelectInput
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            options={districtLabelMap}
            placeholder="Filter by District"
          />
          <SelectInput
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            options={uniqueAges}
            placeholder="Filter by Age"
          />
          <SelectInput
            value={selectedSex}
            onChange={(e) => setSelectedSex(e.target.value)}
            options={uniqueSexes}
            placeholder="Filter by Sex"
          />
          <SelectInput
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            options={uniqueGenders}
            placeholder="Filter by Gender"
          />
        </div>
        <Table data={Array.isArray(paginatedStudents) ? paginatedStudents : []} />

        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Template>
  );
};

export default RoomDetails;

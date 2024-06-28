import { useEffect, useState } from 'react';

import Paginations from '@/components/atoms/Pagination';
import { useGetSchedulesQuery } from '@/hooks/api/scheduleApi'; // Corrected import
import { useGetRegistrationsQuery } from '@/hooks/api/studentApi';

const useRoomDetails = (cardId) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  // Corrected useGetSchedulesQuery instead of useGetSchedulesByIdQuery
  const { data: scheduling, error: scheduleError, isLoading: scheduleLoading } = useGetSchedulesQuery(cardId);
  const { data: students, error: studentsError, isLoading: studentsLoading } = useGetRegistrationsQuery();

  const courseLabelMap = students ? students.reduce((map, student) => {
    map[student.course] = student.course;
    return map;
  }, {}) : {};

  const districtLabelMap = students ? students.reduce((map, student) => {
    map[student.district] = student.district;
    return map;
  }, {}) : {};

  const uniqueAges = students ? [...new Set(students.map(student => student.age))].map(age => ({ label: age, value: age })) : [];
  const uniqueSexes = students ? [...new Set(students.map(student => student.sex))].map(sex => ({ label: sex, value: sex })) : [];
  const uniqueGenders = students ? [...new Set(students.map(student => student.gender))].map(gender => ({ label: gender, value: gender })) : [];

  const filteredRegistrations = Array.isArray(students) ? students.filter(student => {
    return (!selectedCourse || student.course === selectedCourse) &&
           (!selectedDistrict || student.district === selectedDistrict) &&
           (!selectedAge || student.age === selectedAge) &&
           (!selectedSex || student.sex === selectedSex) &&
           (!selectedGender || student.gender === selectedGender);
  }) : [];

  const { paginatedData: paginatedStudents, totalPages } = Paginations(filteredRegistrations, 10, currentPage);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedCourse, selectedDistrict, selectedAge, selectedSex, selectedGender]);

  return {
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
  };
};

export default useRoomDetails;

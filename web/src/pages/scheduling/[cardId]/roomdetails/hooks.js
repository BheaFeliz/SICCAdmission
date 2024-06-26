import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi';
import { useGetRegistrationByIdQuery } from '@/hooks/api/studentApi';
import { capitalizeFirstLetter } from '@/hooks/lib/util';
import { Scourse, SDistrict } from '@/hooks/redux/const';

const useRoomDetails = (cardId) => {
  const { id } = useParams();
  const actualCardId = cardId || id;

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

  // Student list processing
  const studentList = students?.registrations || [];

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

  // Extract unique values for filtering options
  const uniqueAges = [...new Set(studentList.map((reg) => reg.age))].map((age) => ({ value: age, label: age }));
  const uniqueSexes = [...new Set(studentList.map((reg) => reg.sex))].map((sex) => ({ value: sex, label: capitalizeFirstLetter(sex) }));
  const uniqueGenders = [...new Set(studentList.map((reg) => reg.gender))].map((gender) => ({ value: gender, label: capitalizeFirstLetter(gender) }));

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

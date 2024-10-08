import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '@/components/atoms/Loading'
import Paginations from '@/components/atoms/Pagination'
import SelectInput from '@/components/organisms/SelectInput'
import Table from '@/components/organisms/Table'
import Template from '@/components/templates/Template'
import { capitalizeFirstLetter } from '@/hooks/lib/util'
import { Scourse, SDistrict } from '@/hooks/redux/const'
import { useCourses } from '@/hooks/redux/useCourses'

import useHooks from './hooks'

const Scheduling = ({ cardId }) => {
  const { id } = useParams()
  const actualCardId = cardId || id

  const {
    scheduling,
    studentsError,
    studentsLoading,
    registrations,
    currentPage,
    setCurrentPage,
  } = useHooks(actualCardId)
  const { courses } = useCourses()

  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedAge, setSelectedAge] = useState('')
  const [selectedSex, setSelectedSex] = useState('')
  const [selectedGender, setSelectedGender] = useState('')

  // Ensure registrations is an array
  if (!Array.isArray(registrations)) {
    // console.error('Registrations is not an array:', registrations)
    return null // Or render an error message
  }

  const districtLabelMap = SDistrict.reduce((acc, district) => {
    acc[district.value] = district.label
    return acc
  }, {})

  const uniqueAges = [...new Set(registrations.map((reg) => reg.age))].map(
    (age) => ({ value: age, label: age }),
  )
  const uniqueSexes = [...new Set(registrations.map((reg) => reg.sex))].map(
    (sex) => ({ value: sex, label: capitalizeFirstLetter(sex) }),
  )
  const uniqueGenders = [
    ...new Set(registrations.map((reg) => reg.gender)),
  ].map((gender) => ({ value: gender, label: capitalizeFirstLetter(gender) }))

  const applyFilters = (registrations) => {
    return registrations.filter((reg) => {
      return (
        (!selectedCourse || reg.selectcourse === selectedCourse) &&
        (!selectedDistrict || reg.district === selectedDistrict) &&
        (!selectedAge || reg.age.toString() === selectedAge) &&
        (!selectedSex || reg.sex.toLowerCase() === selectedSex.toLowerCase()) &&
        (!selectedGender ||
          reg.gender.toLowerCase() === selectedGender.toLowerCase())
      )
    })
  }

  const filteredRegistrations = applyFilters(registrations)
  const itemsPerPage = 30 // Assuming 30 items per page
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const paginatedData = filteredRegistrations.slice(startIdx, endIdx)

  const courseMap = courses.reduce((map, course) => {
    map[course.id] = course.label
    return map
  }, {})

  const rows = [
    { key: 'id', header: 'ID', render: (item) => item.id },
    { key: 'fname', header: 'First Name', render: (item) => item.fname },
    { key: 'lname', header: 'Last Name', render: (item) => item.lname },
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
    { key: 'email', header: 'Email', render: (item) => item.email },
    {
      key: 'courseId',
      header: 'Course',
      render: (item) => courseMap[item.courseId] || 'Unknown',
    },
    {
      key: 'district',
      header: 'District',
      render: (item) => districtLabelMap[item.district] || item.district,
    },
  ]

  if (studentsLoading) {
    return (
      <Template>
        <div className='flex items-center justify-center'>
          <Loading />
        </div>
      </Template>
    )
  }

  if (studentsError) {
    return (
      <Template>
        <div className='flex items-center justify-center'>
          <h1 className='text-red-500'>
            Error loading data. Please try again later.
          </h1>
        </div>
      </Template>
    )
  }

  return (
    <Template>
      <div className='bg-white p-4'>
        <h1 className='text-xl font-bold mb-4'>
          Registrations for Schedule {scheduling?.id}
        </h1>
        <div className='flex mb-4 space-x-4'>
          <SelectInput
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            options={[{ value: '', label: 'Course' }, ...Scourse]}
            placeholder='Filter by Course'
          />
          <SelectInput
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            options={[{ value: '', label: 'District' }, ...SDistrict]}
            placeholder='Filter by District'
          />
          <SelectInput
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            options={[{ value: '', label: 'Age' }, ...uniqueAges]}
            placeholder='Filter by Age'
          />
          <SelectInput
            value={selectedSex}
            onChange={(e) => setSelectedSex(e.target.value)}
            options={[{ value: '', label: 'Sex' }, ...uniqueSexes]}
            placeholder='Filter by Sex'
          />
          <SelectInput
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            options={[{ value: '', label: 'Gender' }, ...uniqueGenders]}
            placeholder='Filter by Gender'
          />
        </div>
        <Table rows={rows} data={paginatedData} />
        {Math.ceil(filteredRegistrations.length / itemsPerPage) > 1 && (
          <Paginations
            currentPage={currentPage}
            totalPages={Math.ceil(filteredRegistrations.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </Template>
  )
}

export default Scheduling

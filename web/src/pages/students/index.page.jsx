import { Button, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { AiFillEdit, AiFillFilePdf } from 'react-icons/ai'
import { IoAccessibilitySharp } from 'react-icons/io5'

import Loading from '@/components/atoms/Loading'
import Paginations from '@/components/atoms/Pagination'
import PageHeader from '@/components/organisms/PageHeader'
import SelectInput from '@/components/organisms/SelectInput'
import Table from '@/components/organisms/Table'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { capitalizeFirstLetter } from '@/hooks/lib/util'
import { useUser } from '@/hooks/redux/auth'
import { SDistrict } from '@/hooks/redux/const'
import { useCourses } from '@/hooks/redux/useCourses'

import useHooks from './hooks'

const Dashboard = () => {
  const { registrations, isLoading, currentPage, onPageChange } = useHooks()
  const { user } = useUser()

  const { courses } = useCourses()
  const breadcrumbs = [
    {
      href: '#',
      title: 'Student Admission',
      icon: IoAccessibilitySharp,
    },
  ]

  const getAction = (item) => (
    <div className='flex'>
      <div className='mr-2 text-blue-500 text-xl'>
        <Link href={`/registration/${item.id}`}>
          <AiFillEdit size={24} />
        </Link>
      </div>
      <Link
        href={`/students/${item.id}/admission-form`}
        className='mr-2 text-blue-500 text-xl'
        target='_blank'
        rel='noopener noreferrer'
      >
        <AiFillFilePdf size={24} />
      </Link>
    </div>
  )

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

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

  const courseMap = useMemo(() => {
    return courses.reduce((map, course) => {
      map[course.id] = course.label
      return map
    }, {})
  }, [courses]);

  const uniqueCourses = registrations
  .map((reg) => reg.courseId)
  .filter((value, index, self) => self.indexOf(value) === index)
  .map((courseId) => ({ value: courseId, label: courseMap[courseId] || 'Unknown' }));

  const rows = [
    {
      key: 'images',
      header: 'Image',
      render: (item) => (
        <div className='flex space-x-2'>
          {item.images.map((image) => {
            const raw = image?.url || image?.path || ''
            if (!raw) return null
            // Normalize to a valid public URL
            const src = (/^(https?:)?\/\//i.test(raw)
              ? raw
              : raw.startsWith('/storage') || raw.startsWith('/')
              ? raw
              : `/storage/${raw.replace(/^\/+/, '')}`)

            return (
              <Image
                key={image.id}
                src={src}
                alt='Registration Image'
                width={64}
                height={64}
                className='object-cover'
              />
            )
          })}
        </div>
      ),
    },

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
      render: (item) => courseMap[item.courseId] || 'Unknown',
    },
    {
      key: 'district',
      header: 'District',
      render: (item) => districtLabelMap[item.district] || item.district,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => {
        const status = item.deleted_at ? 'Settled' : 'Ongoing';
        const statusColor = item.deleted_at ? 'text-green-500 ' : 'text-red-500';
        
        return (
          <span className={statusColor}>
            {status}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: getAction,
    },
  ]

  const applyFilters = (registrations) => {
    return registrations.filter((reg) => {
      const matchesSearch = searchQuery
        ? reg.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reg.fname.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return (
        matchesSearch &&
        (!selectedCourse || reg.courseId.toString() === selectedCourse) &&
        (!selectedDistrict || reg.district === selectedDistrict) &&
        (!selectedAge || reg.age.toString() === selectedAge) &&
        (!selectedSex || reg.sex.toLowerCase() === selectedSex.toLowerCase()) &&
        (!selectedGender || reg.gender.toLowerCase() === selectedGender.toLowerCase())
      );
    });
  };
  




  const filteredRegistrations = applyFilters(registrations)

  const resetFilters = () => {
    setSelectedCourse('')
    setSelectedDistrict('')
    setSelectedAge('')
    setSelectedSex('')
    setSelectedGender('')
  }

  // Calculate the slice of registrations to display based on the current page
  const itemsPerPage = 10
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const paginatedData = filteredRegistrations.slice(startIdx, endIdx)

  return (
    <div>
      {user.role === 'admin' ?
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />

          <div className='container mx-auto p-2'>
            <div className='flex flex-wrap justify-start items-center mb-8 space-x-4'>
              <TextInput
                type='text'
                placeholder='Search by Name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SelectInput
                name="Course"
                options={[{ value: '', label: 'Course' }, ...uniqueCourses]}
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              />

              <SelectInput
                options={SDistrict}
                name='district'
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              />
              <SelectInput
                options={uniqueAges}
                name='age'
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
              />
              <SelectInput
                options={[{ value: '', label: 'Sex' }, ...uniqueSexes]}
                name='sex'
                value={selectedSex}
                onChange={(e) => setSelectedSex(e.target.value)}
              />
              <SelectInput
                options={[{ value: '', label: 'Gender' }, ...uniqueGenders]}
                name='gender'
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              />
              <Button color='blue' onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
            {isLoading ?
              <div className='flex justify-center items-center h-64'>
                <Loading />
              </div>
            : <>
                <Table rows={rows} data={paginatedData} />
                <div className='mt-4 flex justify-center'>
                  <Paginations
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalPages={Math.ceil(
                      filteredRegistrations.length / itemsPerPage,
                    )}
                  />
                </div>
              </>
            }
          </div>
        </Template>
      : <StaffTemplate>
          <div className='container mx-auto p-2'>
            <div className='flex flex-wrap justify-start items-center mb-8 space-x-4'>
              <TextInput
                type='text'
                placeholder='Search by Name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SelectInput
                name="Course"
                options={[{ value: '', label: 'Gender' }, ...uniqueCourses]}
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              />
              <SelectInput
                options={[{ value: '', label: 'District' }, ...SDistrict]}
                name='district'
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              />
              <SelectInput
                options={[{ value: '', label: 'Age' }, ...uniqueAges]}
                name='age'
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
              />
              <SelectInput
                options={[{ value: '', label: 'Sex' }, ...uniqueSexes]}
                name='sex'
                value={selectedSex}
                onChange={(e) => setSelectedSex(e.target.value)}
              />
              <SelectInput
                options={[{ value: '', label: 'Gender' }, ...uniqueGenders]}
                name='gender'
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              />
              <Button color='blue' onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
            {isLoading ?
              <div className='flex justify-center items-center h-64'>
                <Loading />
              </div>
            : <>
                <Table rows={rows} data={paginatedData} />
                <div className='mt-4 flex justify-center'>
                  <Paginations
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalPages={Math.ceil(
                      filteredRegistrations.length / itemsPerPage,
                    )}
                  />
                </div>
              </>
            }
          </div>
        </StaffTemplate>
      }
    </div>
  )
}

export default Dashboard

import { Button, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'
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

const normalizeImageSrc = (raw = '') => {
  if (!raw) return null
  if (/^(https?:)?\/\//i.test(raw)) return raw
  if (raw.startsWith('/storage') || raw.startsWith('/')) return raw
  return `/storage/${raw.replace(/^\/+/, '')}`
}

const StudentCard = ({
  registration,
  courseLabel,
  districtLabel,
  actions,
}) => {
  const status = registration.deleted_at ? 'Settled' : 'Ongoing'
  const statusColor =
    registration.deleted_at ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
  const imageSrc = normalizeImageSrc(registration.images?.[0]?.url || registration.images?.[0]?.path)

  return (
    <div className='rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg'>
      <div className='flex items-start gap-4'>
        {imageSrc ?
          <Image
            src={imageSrc}
            alt={`${registration.fname} ${registration.lname}`}
            width={72}
            height={72}
            className='h-20 w-20 rounded-2xl object-cover'
          />
        : <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400'>
            No image
          </div>
        }
        <div className='flex-1 space-y-1'>
          <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500'>
            Applicant
          </p>
          <h3 className='text-lg font-semibold text-slate-900'>
            {registration.lname}, {registration.fname}
          </h3>
          <p className='text-sm text-slate-500'>{courseLabel}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}>
          {status}
        </span>
      </div>
      <dl className='mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600'>
        <div>
          <dt className='font-semibold text-slate-500'>Age</dt>
          <dd>{registration.age || '—'}</dd>
        </div>
        <div>
          <dt className='font-semibold text-slate-500'>Sex / Gender</dt>
          <dd>
            {capitalizeFirstLetter(registration.sex)} /{' '}
            {capitalizeFirstLetter(registration.gender)}
          </dd>
        </div>
        <div>
          <dt className='font-semibold text-slate-500'>District</dt>
          <dd>{districtLabel || registration.district || '—'}</dd>
        </div>
        <div>
          <dt className='font-semibold text-slate-500'>Contact</dt>
          <dd>{registration.contactnumber || '—'}</dd>
        </div>
        <div>
          <dt className='font-semibold text-slate-500'>Email</dt>
          <dd className='truncate text-slate-700'>{registration.email || '—'}</dd>
        </div>
      </dl>
      <div className='mt-4 flex flex-wrap gap-2'>{actions}</div>
    </div>
  )
}

const Dashboard = () => {
  const { registrations, isLoading, currentPage, onPageChange } = useHooks()
  const { user } = useUser()

  const { courses = [] } = useCourses()
  const registrationList = useMemo(() => registrations || [], [registrations])
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

  const districtLabelMap = useMemo(() => {
    return SDistrict.reduce((acc, district) => {
      acc[district.value] = district.label
      return acc
    }, {})
  }, [])

  const courseMap = useMemo(() => {
    return courses.reduce((map, course) => {
      map[course.id] = course.label
      return map
    }, {})
  }, [courses])

  const uniqueAges = useMemo(() => {
    const ages = [...new Set(registrationList.map((reg) => reg.age).filter(Boolean))]
    return ages.map((age) => ({ value: age, label: age }))
  }, [registrationList])

  const uniqueSexes = useMemo(() => {
    const sexes = [...new Set(registrationList.map((reg) => reg.sex).filter(Boolean))]
    return sexes.map((sex) => ({ value: sex, label: capitalizeFirstLetter(sex) }))
  }, [registrationList])

  const uniqueGenders = useMemo(() => {
    const genders = [
      ...new Set(registrationList.map((reg) => reg.gender).filter(Boolean)),
    ]
    return genders.map((gender) => ({
      value: gender,
      label: capitalizeFirstLetter(gender),
    }))
  }, [registrationList])

  const uniqueCourses = useMemo(() => {
    const courseIds = [
      ...new Set(registrationList.map((reg) => reg.courseId).filter(Boolean)),
    ]
    return courseIds.map((courseId) => ({
      value: courseId,
      label: courseMap[courseId] || 'Unknown',
    }))
  }, [registrationList, courseMap])

  const districtOptions = useMemo(
    () => [{ value: '', label: 'District' }, ...SDistrict],
    [],
  )
  const ageOptions = useMemo(
    () => [{ value: '', label: 'Age' }, ...uniqueAges],
    [uniqueAges],
  )
  const sexOptions = useMemo(
    () => [{ value: '', label: 'Sex' }, ...uniqueSexes],
    [uniqueSexes],
  )
  const genderOptions = useMemo(
    () => [{ value: '', label: 'Gender' }, ...uniqueGenders],
    [uniqueGenders],
  )
  const courseOptions = useMemo(
    () => [{ value: '', label: 'Course' }, ...uniqueCourses],
    [uniqueCourses],
  )

  const rows = [
    {
      key: 'images',
      header: 'Image',
      render: (item) => (
        <div className='flex space-x-2'>
          {(item.images || []).map((image) => {
            const src = normalizeImageSrc(image?.url || image?.path)
            if (!src) return null

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

  const applyFilters = useCallback(
    (list) =>
      list.filter((reg) => {
        const matchesSearch = searchQuery
          ? reg.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reg.fname.toLowerCase().includes(searchQuery.toLowerCase())
          : true

        return (
          matchesSearch &&
          (!selectedCourse || reg.courseId?.toString() === selectedCourse) &&
          (!selectedDistrict || reg.district === selectedDistrict) &&
          (!selectedAge || reg.age?.toString() === selectedAge) &&
          (!selectedSex ||
            reg.sex?.toLowerCase() === selectedSex.toLowerCase()) &&
          (!selectedGender ||
            reg.gender?.toLowerCase() === selectedGender.toLowerCase())
        )
      }),
    [
      searchQuery,
      selectedCourse,
      selectedDistrict,
      selectedAge,
      selectedSex,
      selectedGender,
    ],
  )

  const totalStudents = registrationList.length
  const ongoingCount = useMemo(
    () => registrationList.filter((reg) => !reg.deleted_at).length,
    [registrationList],
  )
  const settledCount = totalStudents - ongoingCount


  const filteredRegistrations = useMemo(
    () => applyFilters(registrationList),
    [registrationList, applyFilters],
  )

  const resetFilters = () => {
    setSearchQuery('')
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

  const role = user?.role
  const Layout = role === 'admin' ? Template : StaffTemplate

  return (
    <Layout>
      <div className='space-y-8'>
        <PageHeader breadcrumbs={breadcrumbs} />

        <section className='rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm lg:p-8'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-blue-500'>
                Admissions roster
              </p>
              <h1 className='mt-3 text-3xl font-semibold text-slate-900'>
                Review student applicants
              </h1>
              <p className='mt-3 max-w-2xl text-sm text-slate-500'>
                Search and filter applicants across programs, then switch to the
                responsive card list when viewing on mobile.
              </p>
            </div>
            <div className='grid gap-3 sm:grid-cols-3'>
              <div className='rounded-2xl border border-slate-200 bg-white/90 p-4 text-center'>
                <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>
                  Total
                </p>
                <p className='mt-2 text-3xl font-semibold text-slate-900'>
                  {totalStudents}
                </p>
              </div>
              <div className='rounded-2xl border border-slate-200 bg-white/90 p-4 text-center'>
                <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>
                  Ongoing
                </p>
                <p className='mt-2 text-3xl font-semibold text-emerald-600'>
                  {ongoingCount}
                </p>
              </div>
              <div className='rounded-2xl border border-slate-200 bg-white/90 p-4 text-center'>
                <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>
                  Settled
                </p>
                <p className='mt-2 text-3xl font-semibold text-rose-600'>
                  {settledCount}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm lg:p-8'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500'>
                Search by name
              </label>
              <TextInput
                type='text'
                placeholder='Enter applicant name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='rounded-2xl border-slate-200'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500'>
                Course
              </label>
              <SelectInput
                options={courseOptions}
                name='course'
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className='rounded-2xl border-slate-200 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500'>
                District
              </label>
              <SelectInput
                options={districtOptions}
                name='district'
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className='rounded-2xl border-slate-200 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500'>
                Age
              </label>
              <SelectInput
                options={ageOptions}
                name='age'
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className='rounded-2xl border-slate-200 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500'>
                Sex
              </label>
              <SelectInput
                options={sexOptions}
                name='sex'
                value={selectedSex}
                onChange={(e) => setSelectedSex(e.target.value)}
                className='rounded-2xl border-slate-200 text-sm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-500'>
                Gender
              </label>
              <SelectInput
                options={genderOptions}
                name='gender'
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className='rounded-2xl border-slate-200 text-sm'
              />
            </div>
          </div>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Button color='blue' onClick={resetFilters} className='rounded-2xl'>
              Reset filters
            </Button>
          </div>
        </section>

        <section className='space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-slate-900'>Results</h2>
            <span className='text-sm text-slate-500'>
              Showing {paginatedData.length} of {filteredRegistrations.length} applicants
            </span>
          </div>

          {isLoading ?
            <div className='flex h-64 items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/60'>
              <Loading />
            </div>
          : <>
              <div className='grid gap-4 md:hidden'>
                {paginatedData.length > 0 ?
                  paginatedData.map((registration) => (
                    <StudentCard
                      key={registration.id}
                      registration={registration}
                      courseLabel={courseMap[registration.courseId] || 'Unknown'}
                      districtLabel={districtLabelMap[registration.district]}
                      actions={getAction(registration)}
                    />
                  ))
                : <div className='rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-sm text-slate-500'>
                    No applicants match your filters.
                  </div>
                }
              </div>

              <div className='hidden md:block rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm'>
                {paginatedData.length > 0 ?
                  <Table rows={rows} data={paginatedData} />
                : <div className='py-16 text-center text-sm text-slate-500'>
                    No applicants match your filters.
                  </div>
                }
              </div>

              {filteredRegistrations.length > itemsPerPage && (
                <div className='flex justify-center'>
                  <Paginations
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalPages={Math.ceil(
                      filteredRegistrations.length / itemsPerPage,
                    )}
                  />
                </div>
              )}
            </>
          }
        </section>
      </div>
    </Layout>
  )
}

export default Dashboard

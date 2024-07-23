import { useState } from 'react'
import { TbLayoutDashboard } from 'react-icons/tb'

import Loading from '@/components/atoms/Loading'
import CardItem from '@/components/organisms/Card'
import PageHeader from '@/components/organisms/PageHeader'
import Table from '@/components/organisms/Table'
import Template from '@/components/templates/Template'
import { dashboardApi } from '@/hooks/api/dashboardApi'
import { Scourse } from '@/hooks/redux/const'

const Dashboard = () => {
  const { data, isLoading } = dashboardApi.useGetDashboardQuery()
  const [selectedCourse, setSelectedCourse] = useState('')

  const breadcrumbs = [
    {
      href: '#',
      title: 'Dashboard',
      icon: TbLayoutDashboard,
    },
  ]

  // Create a mapping from course codes to labels
  const courseLabelMap = Scourse.reduce((acc, course) => {
    acc[course.value] = course.label
    return acc
  }, {})

  const cardData = Object.entries(data?.course_counts ?? {}).map(
    ([course, count]) => ({
      title: count,
      description: courseLabelMap[course] || course,
      course,
    }),
  )

  const filteredStudents =
    selectedCourse && data?.students ?
      data.students.filter((student) => student.course === selectedCourse)
    : []

  const rows = [
    { key: 'id', header: 'ID', render: (item) => item.id },
    { key: 'lname', header: 'Last Name', render: (item) => item.lname },
    { key: 'fname', header: 'First Name', render: (item) => item.fname },
    { key: 'age', header: 'Age', render: (item) => item.age },
    { key: 'sex', header: 'Sex', render: (item) => item.sex },
    { key: 'gender', header: 'Gender', render: (item) => item.gender },
    {
      key: 'contactnumber',
      header: 'Contactnumber',
      render: (item) => item.contactnumber,
    },
    { key: 'email', header: 'Email', render: (item) => item.email },
    {
      key: 'course',
      header: 'Course',
      render: (item) => courseLabelMap[item.course] || item.course,
    },
  ]

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />

      <div className='mx-auto max-w-screen-lg mt-12'>
        {isLoading ?
          <div className='flex justify-center items-center h-64'>
            <Loading />
          </div>
        : <div>
            <div className='grid grid-cols-3 gap-2'>
              {cardData.map((card, index) => (
                <div key={index} onClick={() => setSelectedCourse(card.course)}>
                  <CardItem title={card.title} description={card.description} />
                </div>
              ))}
            </div>
            {selectedCourse && filteredStudents.length > 0 && (
              <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-4'>
                  Students in {courseLabelMap[selectedCourse]}
                </h2>
                <Table rows={rows} data={filteredStudents} />
              </div>
            )}
            {selectedCourse && filteredStudents.length === 0 && (
              <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-4'>
                  No students found in {courseLabelMap[selectedCourse]}
                </h2>
              </div>
            )}
          </div>
        }
      </div>
    </Template>
  )
}

export default Dashboard

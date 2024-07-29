import { TbLayoutDashboard } from 'react-icons/tb'

import Loading from '@/components/atoms/Loading'
import CardItem from '@/components/organisms/Card'
import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'
import StaffTemplate from '@/components/templates/StaffTemplate'
import { useCourses } from '@/hooks/redux/useCourses'
import { useStudents } from '@/hooks/redux/useStudents'
import { useUser } from '@/hooks/redux/auth'

const Dashboard = () => {
  const { user } = useUser()

  const {
    courses,
    isError: coursesError,
    isLoading: coursesLoading,
  } = useCourses()

  const {
    registrations,
    isError: registrationsError,
    isLoading: registrationsLoading,
  } = useStudents()

  // Combine loading states
  const isLoading = coursesLoading || registrationsLoading
  const isError = coursesError || registrationsError

  // Create a map for quick lookup of registration counts
  const registrationCounts = (registrations || []).reduce((acc, reg) => {
    acc[reg.courseId] = (acc[reg.courseId] || 0) + 1
    return acc
  }, {})

  // Map courses to card data
  const cardData = (courses || []).map((course) => ({
    title: `${registrationCounts[course.id] || 0} Admissions`,
    description: course.label,
    link: `/dashboard/filteredcourse?course=${course.id}`, // Assuming you want to link to the course details
  }))

  // Calculate total registrations
  const totalRegistrations = (registrations || []).length

  const breadcrumbs = [
    {
      href: '#',
      title: 'Dashboard',
      icon: TbLayoutDashboard,
    },
  ]

  return (
    <div>
      {user.role === 'admin' ? 
        <Template>
          <PageHeader breadcrumbs={breadcrumbs} />
          <div className='mx-auto max-w-screen-lg mt-12'>
            {isLoading ?
              <div className='flex justify-center items-center h-64'>
                <Loading />
              </div>
            : isError ?
              <div className='text-red-500'>Error loading data</div>
            : <div className='grid grid-cols-3 gap-2'>
                {cardData.map((card, index) => (
                  <CardItem
                    key={index}
                    title={card.title}
                    description={card.description}
                    link={card.link}
                  />
                ))}
              </div>
            }
            <div className='flex justify-end mt-4'>
              <CardItem
                title={`${totalRegistrations} Admissions`}
                description={<strong>Total Admissions</strong>}
              />
            </div>
          </div>
        </Template>
      : 
        <StaffTemplate>
          <PageHeader breadcrumbs={breadcrumbs} />
          <div className='mx-auto max-w-screen-lg mt-12'>
            {isLoading ?
              <div className='flex justify-center items-center h-64'>
                <Loading />
              </div>
            : isError ?
              <div className='text-red-500'>Error loading data</div>
            : <div className='grid grid-cols-3 gap-2'>
                {cardData.map((card, index) => (
                  <CardItem
                    key={index}
                    title={card.title}
                    description={card.description}
                    link={card.link}
                  />
                ))}
              </div>
            }
            <div className='flex justify-end mt-4'>
              <CardItem
                title={`${totalRegistrations} Admissions`}
                description={<strong>Total Admissions</strong>}
              />
            </div>
          </div>
        </StaffTemplate>
      }
    </div>
  )
}

export default Dashboard

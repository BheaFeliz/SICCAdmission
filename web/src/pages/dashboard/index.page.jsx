import { TbLayoutDashboard } from 'react-icons/tb'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { useUser } from '@/hooks/redux/auth'
import { useCourses } from '@/hooks/redux/useCourses'
import { useStudents } from '@/hooks/redux/useStudents'

const HighlightStat = ({ label, value, helper }) => (
  <div className='rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur'>
    <p className='text-xs font-semibold uppercase tracking-widest text-slate-500'>
      {label}
    </p>
    <p className='mt-2 text-3xl font-semibold text-slate-900'>{value}</p>
    {helper && <p className='mt-1 text-sm text-slate-500'>{helper}</p>}
  </div>
)

const CourseCard = ({ count, name, link }) => (
  <a
    href={link}
    className='group block h-full rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg'
  >
    <p className='text-xs font-semibold uppercase tracking-widest text-blue-500'>
      Enrolled
    </p>
    <p className='mt-2 text-4xl font-semibold text-slate-900'>
      {count || 0}
      <span className='ml-1 text-base font-medium text-slate-400'>students</span>
    </p>
    <p className='mt-4 text-lg font-medium text-slate-800'>{name}</p>
    <span className='mt-6 inline-flex items-center text-sm font-semibold text-blue-600'>
      View course
      <svg
        className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
        aria-hidden='true'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
      </svg>
    </span>
  </a>
)

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
  const courseCards = (courses || []).map((course) => ({
    count: registrationCounts[course.id] || 0,
    name: course.label,
    link: `/dashboard/filteredcourse?course=${course.id}`,
  }))

  // Calculate total registrations
  const totalRegistrations = (registrations || []).length
  const totalCourses = (courses || []).length

  const averagePerCourse =
    totalCourses > 0 ? Math.round(totalRegistrations / totalCourses) : 0

  const topCourse = courseCards.reduce(
    (best, current) =>
      !best || current.count > best.count ? current : best,
    null
  )

  const breadcrumbs = [
    {
      href: '#',
      title: 'Dashboard',
      icon: TbLayoutDashboard,
    },
  ]

  // Safeguard user object
  const role = user?.role

  const Layout = role === 'admin' ? Template : StaffTemplate

  const highlightStats = [
    {
      label: 'Active Programs',
      value: totalCourses,
      helper: 'Currently accepting applications',
    },
    {
      label: 'Total Admissions',
      value: `${totalRegistrations} applicants`,
      helper: 'Across all programs',
    },
    {
      label: 'Avg. Students / Program',
      value: `${averagePerCourse || 0}`,
      helper: 'Snapshot of current intake',
    },
    {
      label: 'Most Popular Program',
      value: topCourse?.name || 'No data yet',
      helper: topCourse ? `${topCourse.count} applicants` : 'Awaiting submissions',
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100'>
        <PageHeader breadcrumbs={breadcrumbs} />
        <div className='mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8'>
          <section className='rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-sm lg:p-8'>
            <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-blue-500'>
                  Admissions Pulse
                </p>
                <h1 className='mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl'>
                  Admissions overview,{` `}
                  <span className='text-blue-600'>{user?.firstName || 'team'}</span>
                </h1>
                <p className='mt-4 max-w-2xl text-base text-slate-500'>
                  Monitor program performance, track applicant volume, and jump
                  into the areas that need your attention most. This overview is
                  fully responsive so you can stay updated on any device.
                </p>
              </div>
              <div className='w-full max-w-md rounded-2xl border border-slate-100 bg-slate-900/90 p-6 text-white shadow-lg'>
                <p className='text-sm uppercase tracking-widest text-slate-300'>
                  Quick snapshot
                </p>
                <p className='mt-3 text-4xl font-semibold'>
                  {totalRegistrations}
                  <span className='ml-2 text-base font-medium text-slate-300'>
                    total applicants
                  </span>
                </p>
                <p className='mt-2 text-sm text-slate-200'>
                  {totalCourses > 0 ?
                    `Averaging ${averagePerCourse} students across ${totalCourses} programs.`
                  : 'No active programs yet. Add one to begin tracking.'}
                </p>
                <a
                  href='/students'
                  className='mt-5 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100'
                >
                  Review admissions
                </a>
              </div>
            </div>

            <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {highlightStats.map((stat) => (
                <HighlightStat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  helper={stat.helper}
                />
              ))}
            </div>
          </section>

          <section className='mt-10 space-y-6'>
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <div>
                <h2 className='text-xl font-semibold text-slate-900'>
                  Programs snapshot
                </h2>
                <p className='text-sm text-slate-500'>
                  Compare course performance across desktop and mobile views.
                </p>
              </div>
              <a
                href='/courses'
                className='inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700'
              >
                Manage courses
              </a>
            </div>

            {isLoading ?
              <div className='flex h-56 items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/70'>
                <Loading />
              </div>
            : isError ?
              <div className='rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700'>
                We were unable to load your dashboard data. Please refresh to try
                again.
              </div>
            : courseCards.length > 0 ?
              <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                {courseCards.map((card) => (
                  <CourseCard
                    key={card.name}
                    count={card.count}
                    name={card.name}
                    link={card.link}
                  />
                ))}
              </div>
            : <div className='rounded-3xl border border-dashed border-slate-200 bg-white/70 p-10 text-center'>
                <h3 className='text-lg font-semibold text-slate-900'>
                  No programs to display yet
                </h3>
                <p className='mt-2 text-sm text-slate-500'>
                  Add a course to start tracking admission performance in real
                  time.
                </p>
                <a
                  href='/courses/new'
                  className='mt-5 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500'
                >
                  Create course
                </a>
              </div>
            }
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard

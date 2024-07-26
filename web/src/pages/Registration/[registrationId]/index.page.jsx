import dayjs from 'dayjs'
import { Button } from 'flowbite-react'
import Link from 'next/link' // Import Link from next/link
import { useRouter } from 'next/router'
import { FaUser } from 'react-icons/fa'

import Loading from '@/components/atoms/Loading'
// import DeleteModal from '@/components/organisms/DeleteModal'
import PageHeader from '@/components/organisms/PageHeader'
import RowItem from '@/components/organisms/RowItem'
import Template from '@/components/templates/Template'
import { useCourses } from '@/hooks/redux/useCourses'

import useHooks from './hooks'

const Registration = () => {
  const router = useRouter()
  const { registrationId } = router.query

  const { registration, isLoading } = useHooks(registrationId)

  const { courses } = useCourses()
  const breadcrumbs = [
    {
      href: '/registration',
      title: 'Registrations',
      icon: FaUser,
    },
    {
      href: '#',
      title: 'Registration Detail',
    },
  ]

  const courseMap = courses.reduce((map, course) => {
    map[course.id] = course.label
    return map
  }, {})

  return (
    <Template>
      <PageHeader
        breadcrumbs={breadcrumbs}
        right={
          <div className='flex pb-4 space-x-4'>
            {/* <DeleteModal handleDelete={() => handleDelete(registrationId)} /> */}
            <Link href={`/registration/${registrationId}/edit`}>
              <Button size='xs' color='warning' className='m-w-20'>
                Edit
              </Button>
            </Link>
          </div>
        }
      />
      {isLoading || !registration ?
        <Loading />
      : <section className='p-8 flex flex-col space-x-4 space-y-6'>
          <div className='flex space-x-8'>
            <RowItem
              label='Date'
              value={dayjs(registration.created_at).format('MMM DD, YYYY')}
            />
          </div>
          <RowItem label='First Name' value={registration.fname} />
          <RowItem label='Last Name' value={registration.lname} />
          <RowItem label='Middle Name' value={registration.mname} />
          <RowItem label='Suffix' value={registration.pref} />
          <RowItem label='Age' value={registration.age} />
          <RowItem
            label='Birthdate'
            value={`${registration.monthoption} ${registration.date}, ${registration.year}`}
          />
          <RowItem label='Sex' value={registration.sex} />
          <RowItem label='Gender' value={registration.gender} />
          <RowItem label='Civil Status' value={registration.civilstatus} />
          <RowItem label='Contact Number' value={registration.contactnumber} />
          <RowItem label='Email' value={registration.email} />
          <RowItem label='Place of Birth' value={registration.pbirth} />
          <RowItem label='Indigent' value={registration.indigentP} />
          {registration.indigentPy && (
            <RowItem label='Indigenous Group' value={registration.indigentPy} />
          )}
          <RowItem label='Purok/Block/Sitio' value={registration.pbs} />
          <RowItem label='District' value={registration.district} />
          <RowItem label='Barangay' value={registration.barangay} />
          <RowItem label='City/Municipality' value={registration.cityM} />
          <RowItem label='Province' value={registration.province} />
          <RowItem label='Zip Code' value={registration.Zcode} />
          <RowItem label='Family Background' value={registration.familyB} />
          {registration.sincewhen && (
            <RowItem label='Since When' value={registration.sincewhen} />
          )}
          <RowItem label='Number of Siblings' value={registration.Nsibling} />
          <RowItem label='Support for Study' value={registration.supstudy} />
          <RowItem label='OFW' value={registration.ofw} />
          {registration.ofwProfession && (
            <RowItem
              label='OFW Profession'
              value={registration.ofwProfession}
            />
          )}
          <RowItem label='Student Category' value={registration.StudentCat} />
          {registration.Nwork && (
            <RowItem label='Nature of Work' value={registration.Nwork} />
          )}
          <RowItem label='Student Type' value={registration.studenttype} />
          {registration.F_nameSchool && (
            <div>
              <p>Freshmen:</p>
              <RowItem
                label='Last School Attended'
                value={registration.F_nameSchool}
              />
              <RowItem label='Academic Track' value={registration.F_Atrack} />
              <RowItem label='Address' value={registration.F_AMprovince} />
              <RowItem label='Year Graduated' value={registration.F_Ygrad} />
            </div>
          )}
          {registration.T_nameSchool && (
            <div>
              <p>Transferee:</p>
              <RowItem
                label='Last School Attended'
                value={registration.T_nameSchool}
              />
              <RowItem label='Course' value={registration.T_Atrack} />
              <RowItem label='Address' value={registration.T_AMprovince} />
              <RowItem label='Year Attended' value={registration.T_Ygrad} />
            </div>
          )}
          <RowItem label='Course' value={courseMap[registration.courseId]} />
        </section>
      }
    </Template>
  )
}

export default Registration

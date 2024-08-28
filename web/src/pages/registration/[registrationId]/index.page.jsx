import dayjs from 'dayjs'
import { Button, Card } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUser } from 'react-icons/fa'

import Loading from '@/components/atoms/Loading'
// import DeleteModal from '@/components/organisms/DeleteModal';
import PageHeader from '@/components/organisms/PageHeader'
import RowItem from '@/components/organisms/RowItem'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { useUser } from '@/hooks/redux/auth'
import {
  Civilstatus,
  famBackground,
  Gender,
  IndigentP,
  Monthoption,
  Scategory,
  SDistrict,
  sex,
  Studenttype,
} from '@/hooks/redux/const'
import { useCourses } from '@/hooks/redux/useCourses'

import useHooks from './hooks'

const Registration = () => {
  const router = useRouter()
  const { registrationId } = router.query
  const { user } = useUser()

  const { registration, isLoading } = useHooks(registrationId)

  const { courses } = useCourses()

  const breadcrumbs = [
    {
      href: '/students',
      title: 'Students',
      icon: FaUser,
    },
    {
      href: '#',
      title: 'Students Edit',
    },
  ]

  const MonthoptionLabelMap = Monthoption.reduce((acc, monthoption) => {
    acc[monthoption.value] = monthoption.label
    return acc
  }, {})

  const sexLabelMap = sex.reduce((acc, sex) => {
    acc[sex.value] = sex.label
    return acc
  }, {})

  const GenderLabelMap = Gender.reduce((acc, gender) => {
    acc[gender.value] = gender.label
    return acc
  }, {})

  const CivilstatusLabelMap = Civilstatus.reduce((acc, civilstatus) => {
    acc[civilstatus.value] = civilstatus.label
    return acc
  }, {})

  const districtLabelMap = SDistrict.reduce((acc, district) => {
    acc[district.value] = district.label
    return acc
  }, {})

  const FamBackgroundLabelMap = famBackground.reduce((acc, familyB) => {
    acc[familyB.value] = familyB.label
    return acc
  }, {})

  const IndigentPLabelMap = IndigentP.reduce((acc, indigentP) => {
    acc[indigentP.value] = indigentP.label
    return acc
  }, {})

  const ScategoryLabelMap = Scategory.reduce((acc, StudentCat) => {
    acc[StudentCat.value] = StudentCat.label
    return acc
  }, {})

  const StudenttypeLabelMap = Studenttype.reduce((acc, studenttype) => {
    acc[studenttype.value] = studenttype.label
    return acc
  }, {})

  const courseMap = courses.reduce((map, course) => {
    map[course.id] = course.label
    return map
  }, {})

  const Content = () => (
    <section className='p-8 flex flex-col space-x-4 space-y-6'>
      <div className='flex space-x-8'>
        <RowItem
          label='Date'
          value={dayjs(registration.created_at).format('MMM DD, YYYY')}
        />
      </div>
      <Card>
        <RowItem label='First Name' value={registration.fname} />
        <RowItem label='Last Name' value={registration.lname} />
        <RowItem label='Middle Name' value={registration.mname} />
        <RowItem label='Suffix' value={registration.pref} />
        <RowItem label='Age' value={registration.age} />
        <RowItem
          label='Birthdate'
          value={`${MonthoptionLabelMap[registration.monthoption]} ${registration.date}, ${registration.year}`}
        />
        <RowItem label='Sex' value={sexLabelMap[registration.sex]} />
        <RowItem label='Gender' value={GenderLabelMap[registration.gender]} />
        <RowItem
          label='Civil Status'
          value={CivilstatusLabelMap[registration.civilstatus]}
        />
        <RowItem label='Contact Number' value={registration.contactnumber} />
        <RowItem label='Email' value={registration.email} />
        <RowItem label='Place of Birth' value={registration.pbirth} />
        <RowItem
          label='Indigent'
          value={IndigentPLabelMap[registration.indigentP]}
        />
        {registration.indigentPy && (
          <RowItem label='Indigenous Group' value={registration.indigentPy} />
        )}
        <RowItem label='Purok/Block/Sitio' value={registration.pbs} />
        <RowItem
          label='District'
          value={districtLabelMap[registration.district]}
        />
        <RowItem label='Barangay' value={registration.barangay} />
        <RowItem label='City/Municipality' value={registration.cityM} />
        <RowItem label='Province' value={registration.province} />
        <RowItem label='Zip Code' value={registration.Zcode} />
        <RowItem
          label='Family Background'
          value={FamBackgroundLabelMap[registration.familyB]}
        />
        {registration.sincewhen && (
          <RowItem label='Since When' value={registration.sincewhen} />
        )}
        <RowItem label='Number of Siblings' value={registration.Nsibling} />
        <RowItem label='Support for Study' value={registration.supstudy} />
        <RowItem label='OFW' value={registration.ofw} />
        {registration.ofwProfession && (
          <RowItem label='OFW Profession' value={registration.ofwProfession} />
        )}
        <RowItem
          label='Student Category'
          value={ScategoryLabelMap[registration.StudentCat]}
        />
        {registration.Nwork && (
          <RowItem label='Nature of Work' value={registration.Nwork} />
        )}
        <RowItem
          label='Student Type'
          value={StudenttypeLabelMap[registration.studenttype]}
        />
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
      </Card>
    </section>
  )

  return (
    <>
      {user?.role === 'admin' ?
        <Template>
          <PageHeader
            breadcrumbs={breadcrumbs}
            right={
              <div className='flex pb-4 space-x-4'>
                <Link href={`/registration/${registrationId}/edit`}>
                  <Button size='lg' color='warning' className='m-w-20'>
                    Edit
                  </Button>
                </Link>
              </div>
            }
          />
          {isLoading || !registration ?
            <Loading />
          : <Content />}
        </Template>
      : <StaffTemplate>
          <PageHeader
            breadcrumbs={breadcrumbs}
            right={
              <div className='flex pb-4 space-x-4'>
                <Link href={`/registration/${registrationId}/edit`}>
                  <Button size='lg' color='warning' className='m-w-20'>
                    Edit
                  </Button>
                </Link>
              </div>
            }
          />
          {isLoading || !registration ?
            <Loading />
          : <Content />}
        </StaffTemplate>
      }
    </>
  )
}

export default Registration

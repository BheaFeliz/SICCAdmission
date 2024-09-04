import dayjs from 'dayjs'
import { Button} from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUser } from 'react-icons/fa'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import Table from '@/components/organisms/Table'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { useUser } from '@/hooks/redux/auth'
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

  const courseMap = courses.reduce((map, course) => {
    map[course.id] = course.label
    return map
  }, {})

  const columns = [
    { key: 'label', header: 'Label', render: item => item.label },
    { key: 'value', header: 'Value', render: item => item.value }
  ]

  const data = [
    { label: 'Date', value: dayjs(registration.created_at).format('MMM DD, YYYY') },
    { label: 'First Name', value: registration.fname },
    { label: 'Last Name', value: registration.lname },
    { label: 'Middle Name', value: registration.mname },
    { label: 'Suffix', value: registration.pref },
    { label: 'Age', value: registration.age },
    { label: 'Birthdate', value: `${registration.monthoption} ${registration.date}, ${registration.year}` },
    { label: 'Sex', value: registration.sex },
    { label: 'Gender', value: registration.gender },
    { label: 'Civil Status', value: registration.civilstatus },
    { label: 'Contact Number', value: registration.contactnumber },
    { label: 'Email', value: registration.email },
    { label: 'Place of Birth', value: registration.pbirth },
    { label: 'Indigent', value: registration.indigentP },
    { label: 'Indigenous Group', value: registration.indigentPy || '-' },
    { label: 'Purok/Block/Sitio', value: registration.pbs },
    { label: 'District', value: registration.district },
    { label: 'Barangay', value: registration.barangay },
    { label: 'City/Municipality', value: registration.cityM },
    { label: 'Province', value: registration.province },
    { label: 'Zip Code', value: registration.Zcode },
    { label: 'Family Background', value: registration.familyB },
    { label: 'Since When', value: registration.sincewhen || '-' },
    { label: 'Number of Siblings', value: registration.Nsibling },
    { label: 'Support for Study', value: registration.supstudy },
    { label: 'OFW', value: registration.ofw },
    { label: 'OFW Profession', value: registration.ofwProfession || '-' },
    { label: 'Transferee', value: registration.T_nameSchool || '-' },
    { label: 'Course', value: registration.T_Atrack || '-' },
    { label: 'Address', value: registration.T_AMprovince || '-' },
    { label: 'Year Attended', value: registration.T_Ygrad || '-' },
    { label: 'Course', value: courseMap[registration.courseId] }
  ];

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
          : <Table rows={columns} data={data} />}
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
          : <Table rows={columns} data={data} />}
        </StaffTemplate>
      }
    </>
  )
}

export default Registration

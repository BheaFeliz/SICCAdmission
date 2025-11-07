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

  const studentTypeLabels = {
    college1: 'New Student',
    trans: 'Transferee',
    returnee: 'Returnee',
    crossenrolle: 'Cross-Enrollee',
  }

  const renderDocumentLink = (url, label) =>
    url ? (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-600 underline'
      >
        Download {label}
      </a>
    ) : (
      'Not submitted'
    )

  const columns = [
    { key: 'label', header: 'Label', render: item => item.label },
    { key: 'value', header: 'Value', render: item => item.value }
  ]

  const data = [
    { label: 'Date', value: dayjs(registration.created_at).format('MMM DD, YYYY') },
    {
      label: 'Date of Application',
      value: registration.application_date
        ? dayjs(registration.application_date).format('MMM DD, YYYY')
        : '-',
    },
    { label: 'Semester', value: registration.semester || '-' },
    {
      label: 'Academic Year',
      value: [registration.academic_year_start, registration.academic_year_end]
        .filter(Boolean)
        .join(' - ') || '-',
    },
    { label: 'First Name', value: registration.fname },
    { label: 'Last Name', value: registration.lname },
    { label: 'Middle Name', value: registration.mname },
    { label: 'Suffix', value: registration.pref },
    { label: 'Age', value: registration.age },
    {
      label: 'Birthdate',
      value: registration.birthdate
        ? dayjs(registration.birthdate).format('MMM DD, YYYY')
        : `${registration.monthoption} ${registration.date}, ${registration.year}`,
    },
    { label: 'Sex', value: registration.sex },
    { label: 'Gender', value: registration.gender },
    { label: 'Civil Status', value: registration.civilstatus },
    { label: 'Contact Number', value: registration.contactnumber },
    { label: 'Email', value: registration.email },
    { label: 'Place of Birth', value: registration.pbirth },
    { label: 'Home Address', value: registration.home_address },
    { label: 'Present Address', value: registration.present_address },
    { label: 'PWD', value: registration.pwd === null ? '-' : registration.pwd ? 'Yes' : 'No' },
    { label: 'Indigent', value: registration.indigentP },
    { label: 'Indigenous Group', value: registration.indigentPy || '-' },
    { label: 'Purok/Block/Sitio', value: registration.pbs },
    { label: 'District', value: registration.district },
    { label: 'Barangay', value: registration.barangay },
    { label: 'City/Municipality', value: registration.cityM },
    { label: 'Province', value: registration.province },
    { label: 'Zip Code', value: registration.Zcode },
    { label: 'Year Graduated', value: registration.year_graduated || '-' },
    { label: 'Senior High Track', value: registration.senior_high_track || '-' },
    { label: 'Strand', value: registration.strand || '-' },
    { label: 'LRN', value: registration.lrn || '-' },
    { label: 'GPA', value: registration.gpa || '-' },
    { label: 'Father\'s Name', value: registration.father_name || '-' },
    { label: 'Mother\'s Maiden Name', value: registration.mother_maiden_name || '-' },
    { label: 'Family Background', value: registration.familyB },
    { label: 'Since When', value: registration.sincewhen || '-' },
    { label: 'Number of Siblings', value: registration.Nsibling },
    { label: 'Support for Study', value: registration.supstudy },
    { label: 'OFW', value: registration.ofw },
    { label: 'OFW Profession', value: registration.ofwProfession || '-' },
    {
      label: 'Family Household Members',
      value:
        registration.family_members?.length > 0
          ? registration.family_members
              .map(
                (member, index) =>
                  `${index + 1}. ${member.name || 'N/A'} (${member.relationship || '-'})`,
              )
              .join(' | ')
          : '-',
    },
    {
      label: 'DSWD Member',
      value: registration.dswd_member === null ? '-' : registration.dswd_member ? 'Yes' : 'No',
    },
    { label: 'DSWD Details', value: registration.dswd_member_details || '-' },
    {
      label: 'Gov Assistance Beneficiary',
      value:
        registration.social_assistance_beneficiary === null
          ? '-'
          : registration.social_assistance_beneficiary
          ? 'Yes'
          : 'No',
    },
    {
      label: 'Program Details',
      value: registration.social_assistance_details || '-',
    },
    {
      label: 'Total Monthly Income',
      value: registration.total_monthly_income || '-',
    },
    {
      label: 'PSA / Birth Certificate',
      value: renderDocumentLink(registration.psa_certificate_url, 'PSA / Birth Certificate'),
    },
    {
      label: 'Marriage Certificate',
      value: renderDocumentLink(registration.marriage_certificate_url, 'Marriage Certificate'),
    },
    { label: 'Transferee', value: registration.T_nameSchool || '-' },
    { label: 'Course', value: registration.T_Atrack || '-' },
    { label: 'Address', value: registration.T_AMprovince || '-' },
    { label: 'Year Attended', value: registration.T_Ygrad || '-' },
    { label: 'Course', value: courseMap[registration.courseId] },
    {
      label: 'Student Application',
      value: studentTypeLabels[registration.studenttype] || registration.studenttype || '-',
    },
    { label: 'Student Category', value: registration.StudentCat || '-' },
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

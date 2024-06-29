import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import RowItem from '@/components/organisms/RowItem'
import Template from '@/components/templates/Template'

import useHooks from './hooks'

const Registration = () => {
  const router = useRouter()
  const { registrationId } = router.query

  const { registration, isLoading } = useHooks(registrationId)

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

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      {isLoading || !registration ?
        <Loading />
      : <section className='p-8 flex flex-col space-x-4 space-y-6'>
          <div className='flex space-x-8'>
            <RowItem
              label='Date'
              value={dayjs(registration.created_at).format('MMM DD, YYYY')}
              icon={<FaCalendarAlt />}
            />
            <RowItem
              label='Branch'
              value={registration.branch}
              icon={<FaMapMarkerAlt />}
            />
          </div>
          <RowItem label='First Name' value={registration.fname} />
          <RowItem label='Last Name' value={registration.lname} />
          <RowItem label='Middle Name' value={registration.mname || 'N/A'} />
          <RowItem label='Suffix' value={registration.pref || 'N/A'} />
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
          {registration.ofwprofession && (
            <RowItem
              label='OFW Profession'
              value={registration.ofwprofession}
            />
          )}
          <RowItem label='Student Category' value={registration.StudentCat} />
          {registration.Nwork && (
            <RowItem label='Nature of Work' value={registration.Nwork} />
          )}
          <RowItem label='Student Type' value={registration.studenttype} />

          <RowItem label='FRESHMEN' />
          <RowItem
            label='Last School Attended'
            value={registration.F_nameSchool || 'N/A'}
          />
          <RowItem
            label='Academic Track'
            value={registration.F_Atrack || 'N/A'}
          />
          <RowItem label='Address' value={registration.F_AMprovince || 'N/A'} />
          <RowItem
            label='Year Graduated'
            value={registration.F_Ygrad || 'N/A'}
          />
          <RowItem label='TRANSFEREE' />

          <RowItem
            label='Last School Attended'
            value={registration.T_nameSchool || 'N/A'}
          />
          <RowItem label='Course' value={registration.T_Atrack || 'N/A'} />
          <RowItem label='Address' value={registration.T_AMprovince || 'N/A'} />
          <RowItem
            label='Year Attended'
            value={registration.T_Ygrad || 'N/A'}
          />
        </section>
      }
    </Template>
  )
}

export default Registration

import React from 'react'

// import { FaRegChartBar } from 'react-icons/fa'
import CardItem from '@/components/organisms/Card'
import PageHeader from '@/components/organisms/PageHeader'
import StudentTemplate from '@/components/templates/StudentTemplate'

const studentStatusDashboard = () => {
  const breadcrumbs = [
    {
      href: '#',
      title: 'SICC Online Admission Application Portal',
    //   icon: FaRegChartBar,
    },
  ]

  const cardData = [
    { title: 'Online Application Form', description: 'Visit this site to reserve your admission test here.', link: '/Registration' } ,
    { title: 'Check Your Enrollment Status', description: 'Visit this site to check your admission slot here.', link: '/referenceInput' },
    // { title: '1000', description: 'BS Agri-Business' },
  ]

  return (
    <StudentTemplate>
      <PageHeader breadcrumbs={breadcrumbs} />

      <div className='m-5 grid gap-5 mb-6 md:grid-cols-3'>
        {cardData.map((card, index) => (
          <CardItem
            key={index}
            title={card.title}
            description={card.description}
            link={card.link}
          />
        ))}
      </div>
    </StudentTemplate>
  )
}

export default studentStatusDashboard

import React from 'react'
import { FaArrowRight, FaRegChartBar } from 'react-icons/fa'

import CardItem from '@/components/organisms/Card'
import DatePicker from '@/components/organisms/DatePicker'
import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'

const Dashboard = () => {
  const breadcrumbs = [
    {
      href: '#',
      title: 'Dashboard',
      icon: FaRegChartBar,
    },
  ]

  const cardData = [
    { title: '1000', description: 'Delivered' },
    { title: '12500', description: 'Open' },
    { title: '1000', description: 'In Transit' },
    { title: '200', description: 'Cancelled' },
    { title: '3000', description: 'On Hold' },
    { title: ' ₱ 1,000,000.00', description: 'Total Amount Order' },
  ]

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />

      <div className='flex flex-row items-center justify-center mb-4'>
        <DatePicker />

        <FaArrowRight
          className='mx-3 text-gray-500'
          style={{ marginTop: '1px' }}
        />

        <DatePicker />
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {cardData.map((card, index) => (
          <CardItem
            key={index}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </Template>
  )
}

export default Dashboard

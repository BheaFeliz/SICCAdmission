import { FaRegChartBar } from 'react-icons/fa'

import CardItem from '@/components/organisms/Card'
import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'
import { dashboardApi } from '@/hooks/api/dashboardApi'

const Dashboard = () => {
  const { data, isLoading } = dashboardApi.useGetDashboardQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const breadcrumbs = [
    {
      href: '#',
      title: 'Dashboard',
      icon: FaRegChartBar,
    },
  ]

  const cardData = Object.entries(data?.course_counts ?? {}).map(([course, count]) => ({
    title: count,
    description: course,
  }))
  

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />

      <div className='mx-auto max-w-screen-lg mt-12'>
        <div className='grid grid-cols-3 gap-2'>
          {cardData.map((card, index) => (
            <CardItem
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        </div>
    </Template>
  )
}

export default Dashboard
import { TbLayoutDashboard } from "react-icons/tb";

import Loading from '@/components/atoms/Loading';
import CardItem from '@/components/organisms/Card';
import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/Template';
import { dashboardApi } from '@/hooks/api/dashboardApi';
import { Scourse } from '@/hooks/redux/const';

const Dashboard = () => {
  const { data, isLoading } = dashboardApi.useGetDashboardQuery();

  const breadcrumbs = [
    {
      href: '#',
      title: 'Dashboard',
      icon: TbLayoutDashboard,
    },
  ];

  const courseLabelMap = Scourse.reduce((acc, course) => {
    acc[course.value] = course.label;
    return acc;
  }, {});

  const cardData = Object.entries(data?.course_counts ?? {}).map(([course, count]) => ({
    title: count,
    description: courseLabelMap[course] || course,
    link: `/dashboard/filteredcourse?course=${course}`, // Add link to each course card
  }));

  const totalCourses = Object.values(data?.course_counts ?? {}).reduce((acc, count) => acc + count, 0);

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div className='mx-auto max-w-screen-lg mt-12'>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-2'>
            {cardData.map((card, index) => (
              <CardItem 
                key={index}
                title={card.title}
                description={card.description}
                link={card.link} // Pass link to CardItem
              />
            ))}
            <CardItem 
              title={totalCourses}
              description="Total Admission Course"
            />
          </div>
        )}
      </div>
    </Template>
  );
};

export default Dashboard;

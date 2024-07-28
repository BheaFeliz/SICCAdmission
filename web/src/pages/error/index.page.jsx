import { Button, Card } from 'flowbite-react'
import Link from 'next/link'

import StudentTemplate from '@/components/templates/StudentTemplate'

const Dashboard = () => {
  return (
    <StudentTemplate>
      <div className='flex justify-center items-right'>
        <Card>
          <div className='mb-6'>
            <h6 style={{ fontSize: '48px', fontWeight: 'bold' }}>
              Admission Reference not found.
            </h6>
          </div>
          <div className='mb-12'>
            <Link href={`/studentdashboard`} passHref>
              <Button size='lg' color='blue'>
                Back To Dashboard
              </Button>
            </Link>
          </div>
          <p>
            Note: For inquiries please go to Admission Office Monday-Friday
            8:00AM - 5:00PM (PST)
          </p>
        </Card>
      </div>
    </StudentTemplate>
  )
}

export default Dashboard

import Link from 'next/link'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { HiOutlineCalendar, HiOutlineUsers, HiTemplate } from 'react-icons/hi'
import { RxActivityLog } from 'react-icons/rx'

const links = [
  {
    label: 'Dashboard',
    icon: <HiTemplate />,
    link: '/dashboard',
  },
  {
    label: 'Scheduling',
    icon: <HiOutlineCalendar />,
    link: '/schedule',
  },
  {
    label: 'Students',
    icon: <HiOutlineUsers />,
    link: '/students',
  },
  {
    label: 'Create Users',
    icon: <AiOutlineUserAdd />,
    link: '/users',
  },
  {
    label: 'Course Management',
    icon: <RxActivityLog />,
    link: '/courses',
  },
  {
    label: 'Activity Management',
    icon: <RxActivityLog />,
    link: '/activitylogs',
  },
]

const Sidebar = () => {
  return (
    <aside className='pt-2 w-64 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
      <ul className='space-y-2'>
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.link}
              passHref
              className='pl-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              {item.icon}
              <span className='ml-3'>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar

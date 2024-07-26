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
    label: 'User Management',
    icon: <AiOutlineUserAdd />,
    link: '/users',
  },
  {
    label: 'Activity Logs',
    icon: <RxActivityLog />,
    link: '/activitylogs',
  },
  {
    label: 'Course',
    icon: <RxActivityLog />,
    link: '/courses',
  },
]

const Sidebar = () => {
  return (
    <aside className='pt-2 w-64 overflow-y-auto bg-gray-50'>
      <ul className='space-y-2'>
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.link}
              passHref
              className='pl-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              {item.icon}
              <span className='ms-3'>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar

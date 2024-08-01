import Link from 'next/link'
import { HiOutlineCalendar, HiOutlineUsers, HiTemplate } from 'react-icons/hi'

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
]

const StaffSidebar = () => {
  return (
    <aside className='pt-2 w-64 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
      <ul className='space-y-2'>
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.link}
              passHref
              className='pl-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
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

export default StaffSidebar

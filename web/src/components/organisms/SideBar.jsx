import Link from 'next/link'
import {
  HiOutlineChatAlt2,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiTemplate,
} from 'react-icons/hi'

const links = [
  {
    label: 'Dashboard',
    icon: <HiTemplate />,
    link: '/dashboard',
  },
  {
    label: 'Orders',
    icon: <HiOutlineShoppingBag />,
    link: '/orders',
  },
  {
    label: 'Staffs',
    icon: <HiOutlineUsers />,
    link: '/staffs',
  },
  {
    label: 'Messages',
    icon: <HiOutlineChatAlt2 />,
    link: '/messages',
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

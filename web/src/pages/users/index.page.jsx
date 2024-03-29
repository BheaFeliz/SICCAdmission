import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
import { FaUserFriends } from 'react-icons/fa'

import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'
import { useGetUsersQuery } from '@/hooks/api/userApi'

const Dashboard = () => {
  const { data: users } = useGetUsersQuery()

  const breadcrumbs = [
    {
      href: '#',
      title: 'Users',
      icon: FaUserFriends,
    },
  ]

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div className='p-2'>
        <Table>
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Position</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.position}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Template>
  )
}

export default Dashboard

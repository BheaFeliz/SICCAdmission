import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
import Link from 'next/link'

import Template from '@/components/templates/Template'

import useHooks from './hooks'

const UserDashboard = () => {
  const { users } = useHooks()
  return (
    <Template>
      <Link href='/users/new'>
        <Button size='xs' color='success'>
          Create User
        </Button>
      </Link>
      <Table>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Username</TableHeadCell>

          <TableHeadCell>Position</TableHeadCell>
          <TableHeadCell>Role</TableHeadCell>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Template>
  )
}
export default UserDashboard

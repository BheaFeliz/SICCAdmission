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
  const { users, deleteUser } = useHooks()

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap()
      alert('User deleted successfully')
    } catch (error) {
      console.error('Failed to delete user:', error)
      alert('Failed to delete user')
    }
  }
  

  return (
    <Template>
      <div className='flex justify-end mb-2'>
      <Link href='/users/new'>
          <Button size='md' color='blue'>
            Create User
          </Button>
      </Link>
      </div>
      <Table>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Username</TableHeadCell>
          <TableHeadCell>Email Address</TableHeadCell>
          <TableHeadCell>Position</TableHeadCell>
          <TableHeadCell>Role</TableHeadCell>
          <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button color='failure' onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Template>
  )
}

export default UserDashboard

import {
  // Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
// import Link from 'next/link'
import React from 'react'

import Loading from '@/components/atoms/Loading'
//import Card from '@/components/organisms/Card'
// import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/StudentTemplate'

//import useHooks from './hooks'

const Dashboard = () => {
  const {
    users,
    isLoading,
    // breadcrumbs,
  } = useHooks()

  return (
    <Template>
      {/* <PageHeader
        breadcrumbs={breadcrumbs}
        right={
          <Link href='/students/new'>
            <Button size='xs' color='warning'>
              Create Student
            </Button>
          </Link>
        }
      /> */}
      {isLoading ?
        <Loading />
        
      : <Table>
          <TableHead>
          <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>First Name</TableHeadCell>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.course}</TableCell>
                  <TableCell>{user.district}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      }
    </Template>
  )
}

export default Dashboard

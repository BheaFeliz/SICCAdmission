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
import React from 'react'

import Loading from '@/components/atoms/Loading'
import Paginations from '@/components/atoms/Pagination'
import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'

import useHooks from './hooks'

const Dashboard = () => {
  const {
    users,
    isLoading,
    breadcrumbs,
    totalPages,
    currentPage,
    onPageChange,
  } = useHooks()

  return (
    <Template>
      <PageHeader
        breadcrumbs={breadcrumbs}
        right={
          <Link href='/staffs/new'>
            <Button size='xs' color='warning'>
              Create Staff
            </Button>
          </Link>
        }
      />
      {isLoading ?
        <Loading />
      : <Table>
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
      }

      <Paginations
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </Template>
  )
}

export default Dashboard

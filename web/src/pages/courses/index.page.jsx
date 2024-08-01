// index.page.jsx
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

import AdminGuard from '@/components/templates/AdminGuard'
import Template from '@/components/templates/Template'

import useHooks from './hooks'

const CourseList = () => {
  const { courses, handleDelete } = useHooks()

  return (
    <AdminGuard>
      <Template>
        <div className='flex justify-end mb-2'>
          <Link href='/courses/new'>
            <Button size='md' color='blue'>
              Create Course
            </Button>
          </Link>
        </div>
        <Table>
          <TableHead>
            <TableHeadCell>Label</TableHeadCell>
            <TableHeadCell>Value</TableHeadCell>
            <TableHeadCell> </TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableHead>
          <TableBody>
            {courses &&
              courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.label}</TableCell>
                  <TableCell>{course.value}</TableCell>
                  <TableCell>
                    <Button
                      color='failure'
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Template>
    </AdminGuard>
  )
}

export default CourseList

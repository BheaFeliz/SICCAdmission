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

const CourseList = () => {
  const { courses } = useHooks()
  return (
    <Template>
      <Link href='/courses/new'>
        <div className='flex justify-end mb-2 '>
          <Button size='md' color='blue'>
            Create Course
          </Button>
        </div>
      </Link>
      <Table>
        <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Label</TableHeadCell>
          <TableHeadCell>Value</TableHeadCell>
          <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody>
          {courses &&
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.label}</TableCell>
                <TableCell>{course.value}</TableCell>
                <TableCell>
                  <Button color='failure'>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Template>
  )
}
export default CourseList

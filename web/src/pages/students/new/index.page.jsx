import { Button } from 'flowbite-react'
import React from 'react'
import { FaUserFriends } from 'react-icons/fa'

import PageHeader from '@/components/organisms/PageHeader'
import TextInput from '@/components/organisms/TextInput'
import Template from '@/components/templates/Template'

const AddStudent = () => {
  const breadcrumbs = [
    {
      href: '/students',
      title: 'Students',
      icon: FaUserFriends,
    },
    {
      href: '#',
      title: 'Student Create',
    },
  ]

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />

      <form className='flex center w-80 flex-col gap-2'>
        <TextInput label='Name' name='createStudent' />
        <TextInput label='Age' name='createStudent' />
        <TextInput label='Gender' name='createStudent' />
        <TextInput label='Course' name='createStudent' />
        <TextInput label='District' name='createStudent' />

        <Button color='warning' type='submit' style={{ width: 140 }}>
          Submit
        </Button>
      </form>
    </Template>
  )
}

export default AddStudent

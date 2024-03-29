import { Button } from 'flowbite-react'
import React from 'react'
import { FaUserFriends } from 'react-icons/fa'

import PageHeader from '@/components/organisms/PageHeader'
import TextInput from '@/components/organisms/TextInput'
import Template from '@/components/templates/Template'

const AddStaff = () => {
  const breadcrumbs = [
    {
      href: '/staffs',
      title: 'Staffs',
      icon: FaUserFriends,
    },
    {
      href: '#',
      title: 'Staff Create',
    },
  ]

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />

      <form className='flex center w-80 flex-col gap-2'>
        <TextInput label='Name' name='createStaff' />
        <TextInput label='Position' name='createStaff' />
        <TextInput label='Contact Number' name='createStaff' />
        <TextInput label='Account Type' name='createStaff' />

        <Button color='warning' type='submit' style={{ width: 140 }}>
          Submit
        </Button>
      </form>
    </Template>
  )
}

export default AddStaff

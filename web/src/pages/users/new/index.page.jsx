import { Button } from 'flowbite-react'

import BreadCrumbs from '@/components/atoms/BreadCrumbs'
import PageHeader from '@/components/organisms/PageHeader'
import SelectInput from '@/components/organisms/SelectInput'
import TextInput from '@/components/organisms/TextInput'
import AdminGuard from '@/components/templates/AdminGuard'
import Template from '@/components/templates/Template'
import { roles } from '@/hooks/redux/const'

import { useHooks } from './hooks'

function CreateUserPage() {
  const { formState, handleSubmit } = useHooks()
  return (
    <AdminGuard>
      <Template>
        <PageHeader>
          <BreadCrumbs />
        </PageHeader>
        <div className='container mx-auto p-2'>
          <div className='text-2xl font-bold mb-2'>Create User</div>
          <form onSubmit={handleSubmit}>
            <TextInput
              label='Name'
              type='text'
              name='name'
              className='form-input'
              {...formState}
            />
            <TextInput
              name='username'
              label='Username'
              className='form-input'
              {...formState}
            />
            <TextInput
              name='email'
              label='Email'
              className='form-input'
              {...formState}
            />
            <TextInput
              name='password'
              label='Create Password'
              type='password'
              className='form-input'
              {...formState}
            />
            <TextInput
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              className='form-input'
              {...formState}
            />
            <SelectInput
              name='role'
              options={[
                { label: 'Role', value: '' },
                ...roles.map((option) => ({
                  value: option.value,
                  label: option.label,
                })),
              ]}
              className='mt-4 mb-4'
              {...formState}
            />
            <TextInput
              name='phone'
              label='Phone'
              className='form-input'
              {...formState}
            />
            <TextInput
              name='position'
              label='Position'
              className='form-input'
              {...formState}
            />
            <Button type='submit'>Create User</Button>
          </form>
        </div>
      </Template>
    </AdminGuard>
  )
}

export default CreateUserPage

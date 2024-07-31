import { Button, Label } from 'flowbite-react'

import PageHeader from '@/components/organisms/PageHeader'
import TextInput from '@/components/organisms/TextInput'
import Template from '@/components/templates/Template'

import { useHooks } from './hooks'

const ChangePasswordPage = () => {
  const { breadcrumbs, formState, handleSubmit } = useHooks()

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <form
        className='flex flex-col gap-4 max-w-xl p-4'
        onSubmit={handleSubmit}
      >
        <div>
          <div className='mb-2 block'>
            <Label value='Old Password' />
          </div>
          <TextInput name='old_password' type='password' {...formState} />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label value='New Password' />
          </div>
          <TextInput name='password' type='password' {...formState} />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label value='Confirm Password' />
          </div>
          <TextInput
            name='password_confirmation'
            type='password'
            {...formState}
          />
        </div>
        <Button color='blue' type='submit'>
          Confirm Password
        </Button>
      </form>
    </Template>
  )
}

export default ChangePasswordPage

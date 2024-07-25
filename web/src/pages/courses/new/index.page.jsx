// src/pages/course/index.page.jsx
import { Button } from 'flowbite-react'

import BreadCrumbs from '@/components/atoms/BreadCrumbs'
import PageHeader from '@/components/organisms/PageHeader'
import TextInput from '@/components/organisms/TextInput'
import Template from '@/components/templates/Template'

import useHooks from './hooks' // Corrected import statement

function CreateCoursePage() {
  const { formState, handleSubmit, isLoading, isError, error } = useHooks()

  return (
    <Template>
      <PageHeader>
        <BreadCrumbs />
      </PageHeader>
      <div className='container mx-auto p-2'>
        <div className='text-2xl font-bold mb-2'>Create Course</div>
        <form onSubmit={handleSubmit}>
          <TextInput
            label='Course Name'
            type='text'
            name='label'
            className='form-input'
            {...formState}
          />
          <TextInput
            name='value'
            label='Course Initials'
            className='form-input'
            {...formState}
          />
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Course'}
          </Button>
          {isError && <p className='text-red-500'>Error: {error.message}</p>}
        </form>
      </div>
    </Template>
  )
}

export default CreateCoursePage

import { Button } from 'flowbite-react'

import RegistrationManualForm from '@/components/organisms/RegistrationManualForm'
import AdminGuard from '@/components/templates/AdminGuard'
import Template from '@/components/templates/Template'
import { useCourses } from '@/hooks/redux/useCourses'

import { useHooks } from './hooks'

const EditRegistration = ({ registrationId }) => {
  const {
    formState,
    handleSubmit,
    familyMembers,
    addFamilyMember,
    removeFamilyMember,
    watch,
    setValue,
  } = useHooks(registrationId)
  const { courses } = useCourses()

  return (
    <AdminGuard>
      <Template>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-6 p-6'>
          <RegistrationManualForm
            formState={formState}
            courses={courses}
            familyMembers={familyMembers}
            onAddFamilyMember={addFamilyMember}
            onRemoveFamilyMember={removeFamilyMember}
            watch={watch}
            setValue={setValue}
          />
          <div className='flex justify-end'>
            <Button type='submit'>Save Changes</Button>
          </div>
        </form>
      </Template>
    </AdminGuard>
  )
}

export default EditRegistration

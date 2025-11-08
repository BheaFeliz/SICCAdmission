import { Button, Card } from 'flowbite-react'
import React from 'react'
import { SiGoogleforms } from 'react-icons/si'

import FilePickerInput from '@/components/organisms/FilePickerInput '
import PageHeader from '@/components/organisms/PageHeader'
import RegistrationManualForm from '@/components/organisms/RegistrationManualForm'
import Template from '@/components/templates/StudentTemplate'
import { useCourses } from '@/hooks/redux/useCourses'

import { useHooks } from './hooks'

const Registration = () => {
  const breadcrumbs = [
    {
      href: '#',
      title: 'Application Form',
      icon: SiGoogleforms,
    },
  ]

  const {
    formState,
    handleSubmit,
    familyMembers,
    addFamilyMember,
    removeFamilyMember,
    watch,
    setValue,
  } = useHooks()
  const { courses } = useCourses()

  return (
    <Template>
      <div className='bg-slate-50 py-6'>
        <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8'>
          <PageHeader breadcrumbs={breadcrumbs} />
          <form onSubmit={handleSubmit} className='space-y-6'>
            <Card className='border-none bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-sm'>
              <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <div>
                  <p className='text-base font-medium text-slate-800'>
                    Carefully review every field before submitting.
                  </p>
                  <p className='text-sm text-slate-600'>
                    Incomplete entries, missing signatures, or unreadable uploads delay admission
                    processing. Prepare your household details and valid 2x2 photo ahead of time.
                  </p>
                </div>
                <div className='rounded-lg border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow'>
                  <p className='font-semibold text-slate-800'>Need help?</p>
                  <p>Reach Admissions via registrar@sicc.edu.ph or (082) 123-4567.</p>
                </div>
              </div>
            </Card>

            <RegistrationManualForm
              formState={formState}
              courses={courses}
              familyMembers={familyMembers}
              onAddFamilyMember={addFamilyMember}
              onRemoveFamilyMember={removeFamilyMember}
              watch={watch}
              setValue={setValue}
            />

            <div className='grid gap-6 lg:grid-cols-[2fr,1fr]'>
              <Card className='h-full border border-slate-200 shadow-sm'>
                <div className='space-y-4 text-sm leading-relaxed text-slate-600'>
                  <p className='font-semibold text-slate-900'>Conforme & Data Privacy</p>
                  <p>
                    I certify that the information provided is complete and accurate. I agree to
                    notify the Office of Admissions/Registrar for any changes.
                  </p>
                  <p>
                    I understand that Samal Island City College (SICC) may collect, store, and
                    process my personal data for admission, historical, statistical, research, or
                    evaluation purposes pursuant to RA 10173 (Data Privacy Act of 2012) and its IRR.
                  </p>
                  <ul className='list-inside list-disc space-y-1 text-slate-500'>
                    <li>Provide only truthful and updated information.</li>
                    <li>Uploads must be clear, recent, and follow the stated format.</li>
                    <li>Applications with missing requirements will not be processed.</li>
                  </ul>
                </div>
              </Card>

              <div className='space-y-6'>
                <Card className='space-y-4 border border-slate-200 shadow-sm'>
                  <div>
                    <p className='text-base font-semibold text-slate-900'>2x2 ID Photo</p>
                    <p className='text-sm text-slate-500'>
                      Formal attire, white background, no filters, maximum of 2MB per image. You may
                      upload multiple angles if needed.
                    </p>
                  </div>
                  <FilePickerInput
                    name='fileinput'
                    label='Upload Picture'
                    multiple
                    {...formState}
                  />
                </Card>

                <Card className='space-y-4 border border-slate-200 shadow-sm'>
                  <div>
                    <p className='text-base font-semibold text-slate-900'>Supporting Documents</p>
                    <p className='text-sm text-slate-500'>
                      Optional uploads. Accepts PDF or clear image scans up to 4MB each.
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm font-medium text-slate-700'>PSA / Birth Certificate</p>
                    <FilePickerInput
                      name='psa_certificate'
                      label='Upload PSA or Birth Certificate'
                      accept='application/pdf,image/jpeg,image/png'
                      {...formState}
                    />
                  </div>
                  <div className='space-y-2'>
                    <p className='text-sm font-medium text-slate-700'>
                      Marriage Certificate (if married)
                    </p>
                    <FilePickerInput
                      name='marriage_certificate'
                      label='Upload Marriage Certificate'
                      accept='application/pdf,image/jpeg,image/png'
                      {...formState}
                    />
                  </div>
                </Card>
              </div>
            </div>

            <div className='flex flex-col gap-3 pb-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between'>
              <p>
                Submitting this form serves as your digital acknowledgment of the Conforme and Data
                Privacy statements above.
              </p>
              <Button type='submit' size='lg' className='w-full sm:w-auto'>
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  )
}

export default Registration

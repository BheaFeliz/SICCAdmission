import { Button, Card, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import { SiGoogleforms } from 'react-icons/si'

import PageHeader from '@/components/organisms/PageHeader'
import SelectInput from '@/components/organisms/SelectInput'
import TextInput from '@/components/organisms/TextInput'
import Template from '@/components/templates/StudentTemplate'
import {
  Civilstatus,
  famBackground,
  Gender,
  IndigentP,
  Monthoption,
  Ofw,
  Scategory,
  Scourse,
  sex,
  Studenttype,
  suffixoption,
} from '@/hooks/redux/const'

import { useHooks } from './hooks'

const Registration = () => {
  const breadcrumbs = [
    {
      href: '#',
      title: 'Application Form',
      icon: SiGoogleforms,
    },
  ]

  const { formState, handleSubmit } = useHooks()
  const [openModal, setOpenModal] = useState(false)

  const [showTextInput, setShowTextInput] = useState(false)
  const [showFamilyBackgroundInput, setShowFamilyBackgroundInput] =
    useState(false)
  const [showOFWInput, setShowOFWInput] = useState(false)
  const [showWorkingStudentInput, setShowWorkingStudentInput] = useState(false)
  const [showFreshmenInput, setShowFreshmenInput] = useState(false)
  const [showTransfereeInput, setShowTransfereeInput] = useState(false)

  const handleStudentTypeChange = (e) => {
    const value = e.target.value
    setShowFreshmenInput(value === 'college1')
    setShowTransfereeInput(value === 'trans')
  }

  const handleIndigentChange = (e) => {
    const value = e.target.value
    const selectedOption = IndigentP.find((option) => option.value === value)
    setShowTextInput(selectedOption && selectedOption.showTextInput)
  }

  const handleFamilyBackgroundChange = (e) => {
    const value = e.target.value
    const selectedOption = famBackground.find(
      (option) => option.value === value,
    )
    setShowFamilyBackgroundInput(selectedOption && selectedOption.showTextInput)
  }

  const handleOFWChange = (e) => {
    const value = e.target.value
    const selectedOption = Ofw.find((option) => option.value === value)

    if (selectedOption && selectedOption.showTextInput) {
      setShowOFWInput(true)
    } else {
      setShowOFWInput(false)
    }
  }

  const handleStudentCategoryChange = (e) => {
    const value = e.target.value
    setShowWorkingStudentInput(value === 'Wstudent')
  }

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Card>
        <form onSubmit={handleSubmit}>
          <div className=' style=min-height: 140px;'>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-4'>
              <TextInput label='First Name' {...formState.register('fname')} />
              <TextInput label='Last Name' {...formState.register('lname')} />
              <TextInput label='Middle Name' {...formState.register('mname')} />
              <SelectInput options={suffixoption} {...formState.register('pref')} />
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-4'>
              <TextInput label='Age' {...formState.register('age')} />
              <div className='grid grid-cols-3 gap-1'>
                <SelectInput
                  options={Monthoption}
                  {...formState.register('monthoption')}
                />
                <TextInput label='Day' {...formState.register('date')} />
                <TextInput label='Year' {...formState.register('year')} />
              </div>
              <SelectInput options={sex} {...formState.register('sex')} />
              <SelectInput options={Gender} {...formState.register('gender')} />
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-4'>
              <SelectInput
                options={Civilstatus}
                {...formState.register('civilstatus')}
              />
              <TextInput
                label='Mobile Number'
                {...formState.register('contactnumber')}
              />
              <TextInput label='Email Address' {...formState.register('email')} />
              <TextInput
                label='Place of Birth (City/Municipality)'
                {...formState.register('pbirth')}
              />
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-2'>
              <SelectInput
                options={IndigentP}
                onChange={handleIndigentChange}
                {...formState.register('indigentP')}
              />
              {showTextInput && (
                <TextInput
                  label='If yes, specify the Indigenous group you belong to.'
                  type='text'
                  className='form-input'
                  {...formState.register('indigentPy')}
                />
              )}
            </div>

            <div className='p-4'>
              <p>Demographic Data:</p>
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-3'>
              <TextInput label='Purok/Block/Sitio' name='pbs' />
              <SelectInput
                options={[
                  { value: 'd1', label: 'District I' },
                  { value: 'd2', label: 'District II' },
                  { value: 'd3', label: 'District III' },
                ]}
                label='District'
                {...formState.register('district')}
                />
              <TextInput label='Barangay' {...formState.register('barangay')} />                 
              <TextInput
                label='City/Municipality'
                {...formState.register('cityM')}
              />
              <TextInput label='Province' {...formState.register('province')} />
              <TextInput label='Zip Code' {...formState.register('Zcode')} />
            </div>
            <div className='p-4'>
              <p>Family Background:</p>
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-3 '>
              <SelectInput
                options={famBackground}
                onChange={handleFamilyBackgroundChange}
                className='w-full md:w-auto'
                {...formState.register('familyB')}
              />
              {showFamilyBackgroundInput && (
                <TextInput
                  label='Specify since when?(Year Only)'
                  type='text'
                  className='form-input'
                  {...formState.register('sincewhen')}
                />
              )}
              <TextInput
                label='Number of siblings in the family'
                {...formState.register('Nsibling')}
              />

              <TextInput label='Who Will support your study?' name='supstudy' />
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-2'>
              <SelectInput
                options={Ofw}
                onChange={handleOFWChange}
                className='w-full md:w-auto'
                {...formState.register('ofw')}
              />
              {showOFWInput && (
                <TextInput
                  label='Specify the job/profession of a family member abroad.'
                  type='text'
                  className='form-input'
                  {...formState.register('ofwprofession')}
                />
              )}

              <SelectInput
                options={Scategory}
                label='Student Category'
                onChange={handleStudentCategoryChange}
                {...formState.register('StudentCat')}
              />
              {showWorkingStudentInput && (
                <TextInput
                  label='Nature of work'
                  type='text'
                  className='form-input'
                  {...formState.register('Nwork')}
                />
              )}
            </div>

            <div className='m-5 grid gap-5 mb-6 md:grid-cols-1'>
              <SelectInput
                options={Studenttype}
                onChange={handleStudentTypeChange}
                {...formState.register('studenttype')}
              />
            </div>

            {showFreshmenInput && (
              <div name='Freshmen'>
                <p>Freshmen:</p>
                <div className='m-5 grid gap-5 mb-6 md:grid-cols-4'>
                  <TextInput
                    label='Last School Attended'
                    type='text'
                    className='form-input'
                    {...formState.register('F_nameSchool')}
                  />
                  <TextInput
                    label='Academic track'
                    type='text'
                    className='form-input'
                    {...formState.register('F_Atrack')}
                  />
                  <TextInput
                    label='Address City/Municipality/Province'
                    type='text'
                    className='form-input'
                    {...formState.register('F_AMprovince')}
                  />
                  <TextInput
                    label='Year Graduate'
                    type='text'
                    className='form-input'
                    {...formState.register('F_Vgrad')}
                  />
                </div>
              </div>
            )}

            {showTransfereeInput && (
              <div>
                <p>Transferee:</p>
                <div className='m-5 grid gap-5 mb-6 md:grid-cols-4'>
                  <TextInput
                    label='Last School Attended'
                    type='text'
                    className='form-input'
                    {...formState.register('T_nameSchool')}
                  />
                  <TextInput
                    label='Course'
                    type='text'
                    className='form-input'
                    {...formState.register('T_Atrack')}
                  />
                  <TextInput
                    label='Address City/Municipality/Province'
                    type='text'
                    className='form-input'
                    {...formState.register('T_AMprovince')}
                  />
                  <TextInput
                    label='Year Attended'
                    type='text'
                    className='form-input'
                    {...formState.register('T_Vgrad')}
                  />
                </div>
              </div>
            )}

            <div className='m-5 grid gap-5 mb-6 md:grid-cols-1'>
              <SelectInput
                options={Scourse}
                {...formState.register('selectcourse')}
              />
            </div>
            <div name='modal'>
              <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>CONFORME:</Modal.Header>
                <Modal.Body>
                  <div className='space-y-6'>
                    <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                      By signing below, I hereby certify that all the
                      information written in this application are complete and
                      accurate. I agree to update the Office of Admissions and
                      the Registrar Office for any changes. I acknowledge that I
                      have read and understood the Samal Island City College
                      (SICC) Admissions Privacy Notice posted in the office
                      premises. I understand that by applying for
                      admission/registering as a student of this institutuion, I
                      allow SICC through the Office of Admissions to collect,
                      record, organize, update or modify, retrieve, consult,
                      utilize, consolidate, block, erase or delete any
                      information which are a part of my personal data for
                      historical, statistical, research and evaluation purposes
                      pursuant to the provisions of the Republic Act No. 10173
                      of the Philippines, Data Privacy Act of 2012 and its
                      corresponding Implementing Rules and Regulations. I also
                      agree, if accepted as a student, that my odmission,
                      matriculation, legibility for any assistance/grant, and
                      graduation are subject to the rules and regulations of
                      this institution.
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => setOpenModal(false)}
                    href='/registration/subfile'
                  >
                    I accept
                  </Button>
                  <Button color='gray' onClick={() => setOpenModal(false)}>
                    Decline
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div>
            <Button type='submit' onClick={() => setOpenModal(true)}>
              Proceed
            </Button>
          </div>
        </form>
      </Card>
    </Template>
  )
}

export default Registration

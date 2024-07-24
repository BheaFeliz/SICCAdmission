import { Button, Card } from 'flowbite-react'
import React, { useState } from 'react'
import { SiGoogleforms } from 'react-icons/si'

import FilePickerInput from '@/components/organisms/FilePickerInput '
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
  SDistrict,
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
          <div className='m-2'>
            <Card>
              <p>
                Fill out this form carefully and TYPE all the information
                requested. Select the appropriate choices. If the item is not
                applicable indicate select or type N/A. INCOMPLETE FORMS WILL
                NOT BE PROCESSED.
              </p>
            </Card>
          </div>
          <div className='style=min-height: 140px;'>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-4'>
              <TextInput label='Last Name' name='lname' {...formState} />
              <TextInput label='First Name' name='fname' {...formState} />
              <TextInput label='Middle Name' name='mname' {...formState} />
              <SelectInput options={suffixoption} name='pref' {...formState} />
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-4'>
              <TextInput label='Age' name='age' {...formState} />
              <div className='grid grid-cols-3 gap-1'>
                <SelectInput
                  options={Monthoption}
                  name='monthoption'
                  {...formState}
                />
                <TextInput label='Day' name='date' {...formState} />
                <TextInput label='Year' name='year' {...formState} />
              </div>
              <SelectInput options={sex} name='sex' {...formState} />
              <SelectInput options={Gender} name='gender' {...formState} />
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-4'>
              <SelectInput
                options={Civilstatus}
                name='civilstatus'
                {...formState}
              />
              <TextInput
                label='Mobile Number'
                name='contactnumber'
                {...formState}
              />
              <TextInput label='Email Address' name='email' {...formState} />
              <TextInput
                label='Place of Birth (City/Municipality)'
                name='pbirth'
                {...formState}
              />
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-2'>
              <SelectInput
                options={IndigentP}
                name='indigentP'
                onChange={handleIndigentChange}
                {...formState}
              />
              {showTextInput && (
                <TextInput
                  label='If yes, specify the Indigenous group you belong to.'
                  type='text'
                  name='indigentPy'
                  className='form-input'
                  {...formState}
                />
              )}
            </div>
            <div className='p-4'>
              <p>Demographic Data:</p>
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-3'>
              <TextInput label='Purok/Block/Sitio' name='pbs' {...formState} />
              <SelectInput
                options={SDistrict}
                label='District'
                name='district'
                {...formState}
              />
              <TextInput label='Barangay' name='barangay' {...formState} />
              <TextInput
                label='City/Municipality'
                name='cityM'
                {...formState}
              />
              <TextInput label='Province' name='province' {...formState} />
              <TextInput label='Zip Code' name='Zcode' {...formState} />
            </div>
            <div className='p-4'>
              <p>Family Background:</p>
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-3'>
              <SelectInput
                options={famBackground}
                name='familyB'
                onChange={handleFamilyBackgroundChange}
                {...formState}
              />
              {showFamilyBackgroundInput && (
                <TextInput
                  label='Specify since when? (Year Only)'
                  type='text'
                  name='sincewhen'
                  className='form-input'
                  {...formState}
                />
              )}
              <TextInput
                label='Number of siblings in the family'
                name='Nsibling'
                {...formState}
              />
              <TextInput
                label='Who will support your study?'
                name='supstudy'
                {...formState}
              />
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-2'>
              <SelectInput
                options={Ofw}
                onChange={handleOFWChange}
                name='ofw'
                {...formState}
              />
              {showOFWInput && (
                <TextInput
                  label='Specify the job/profession of a family member abroad.'
                  type='text'
                  name='ofwprofession'
                  className='form-input'
                  {...formState}
                />
              )}
              <SelectInput
                options={Scategory}
                label='Student Category'
                name='StudentCat'
                onChange={handleStudentCategoryChange}
                {...formState}
              />
              {showWorkingStudentInput && (
                <TextInput
                  label='Nature of work'
                  type='text'
                  name='Nwork'
                  className='form-input'
                  {...formState}
                />
              )}
            </div>
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-1'>
              <SelectInput
                options={Studenttype}
                name='studenttype'
                onChange={handleStudentTypeChange}
                {...formState}
              />
            </div>
            {showFreshmenInput && (
              <div name='Freshmen'>
                <p>Freshmen:</p>
                <div className='m-5 grid gap-5 mb-6 md:grid-cols-4'>
                  <TextInput
                    label='Last School Attended'
                    type='text'
                    name='F_nameSchool'
                    className='form-input'
                    {...formState}
                  />
                  <TextInput
                    label='Academic track'
                    type='text'
                    name='F_Atrack'
                    className='form-input'
                    {...formState}
                  />
                  <TextInput
                    label='Address City/Municipality/Province'
                    type='text'
                    name='F_AMprovince'
                    className='form-input'
                    {...formState}
                  />
                  <TextInput
                    label='Year Graduate'
                    type='text'
                    name='F_Ygrad'
                    className='form-input'
                    {...formState}
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
                    name='T_nameSchool'
                    className='form-input'
                    {...formState}
                  />
                  <TextInput
                    label='Course'
                    type='text'
                    name='T_Atrack'
                    className='form-input'
                    {...formState}
                  />
                  <TextInput
                    label='Address City/Municipality/Province'
                    type='text'
                    name='T_AMprovince'
                    className='form-input'
                    {...formState}
                  />
                  <TextInput
                    label='Year Attended'
                    type='text'
                    name='T_Ygrad'
                    className='form-input'
                    {...formState}
                  />
                </div>
              </div>
            )}
            <div className='m-5 grid gap-5 mb-6 md:grid-cols-1'>
              <SelectInput
                options={Scourse}
                name='selectcourse'
                {...formState}
              />
            </div>

            <div className='m-2'>
              <Card>
                <p>
                  CONFORME: I hereby certify that all the information written in
                  this application are complete and accurate. I agree to update
                  the Office of Admissions and the Registrars Office for any
                  changes. I acknowledge that I have read and understood the
                  Samal Island City College (SICC) Admissions Privacy Notice
                  posted in the office premises understand that by applying for
                  admission/registering as a student of this institutuion, I
                  allow SICC through the Office of Admissions to collect,
                  record, organize, update or modif retrieve, consult, utilize,
                  consolidate, block, erase or delete any information which are
                  a part of my personal data for historical, statistical,
                  research and evaluation purposes pursuant to the provisions of
                  the Republic Act No. 10173 of the Philippines, Data Privacy
                  Act of 2012 and its corresponding Implementing Rules and
                  Regulations.
                </p>
              </Card>
            </div>

            <div className='m-5'>
              <Card>
                <FilePickerInput
                  name='fileinput'
                  label='Upload Picture'
                  multiple
                  {...formState}
                />
              </Card>
            </div>
            <div className='flex justify-end'>
              <Button type='submit'>Finish</Button>
            </div>
          </div>
        </form>
      </Card>
    </Template>
  )
}

export default Registration

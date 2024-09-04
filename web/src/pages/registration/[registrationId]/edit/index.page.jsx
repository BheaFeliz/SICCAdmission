import { Button } from 'flowbite-react'
import { useState } from 'react'

import SelectInput from '@/components/organisms/SelectInput'
import TextInput from '@/components/organisms/TextInput'
import AdminGuard from '@/components/templates/AdminGuard'
import Template from '@/components/templates/Template'
import {
  Civilstatus,
  famBackground,
  Gender,
  IndigentP,
  Monthoption,
  Ofw,
  Scategory,
  SDistrict,
  sex,
  Studenttype,
  suffixoption,
} from '@/hooks/redux/const'
import { useCourses } from '@/hooks/redux/useCourses'

import { useHooks } from './hooks'

const EditRegistration = ({ registrationId }) => {
  const { formState, handleSubmit } = useHooks(registrationId)
  const { courses } = useCourses()

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
    setShowOFWInput(selectedOption && selectedOption.showTextInput)
  }

  const handleStudentCategoryChange = (e) => {
    const value = e.target.value
    setShowWorkingStudentInput(value === 'Wstudent')
  }

  return (
    <AdminGuard>
      <Template>
        <form onSubmit={handleSubmit} className='p-8 flex flex-col space-y-6'>
          <div style={{ minHeight: '140px' }}>
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
                name='courseId'
                options={[
                  { value: '', label: 'Select a course', isDisabled: true },
                  ...courses.map((course) => ({
                    value: course.id,
                    label: course.label,
                  })),
                ]}
                {...formState}
              />
            </div>
            <div className='flex justify-end'>
            <Button type='submit'>Save</Button>
            </div>
          </div>
        </form>
      </Template>
    </AdminGuard>
  )
}

export default EditRegistration

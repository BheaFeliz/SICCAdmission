import dayjs from 'dayjs'
import { Label } from 'flowbite-react'
import { useEffect, useMemo } from 'react'

import SelectInput from '@/components/organisms/SelectInput'
import TextInput from '@/components/organisms/TextInput'
import {
  Civilstatus,
  Gender,
  IndigentP,
  Scategory,
  sex,
  Studenttype,
  suffixoption,
  YesNoOptions,
} from '@/hooks/redux/const'

const tableHeaders = [
  'Family Household Members (Complete Name)',
  'Relationship',
  'Age',
  'Mobile Number',
  'Highest Educational Attainment',
  'Occupation/Livelihood',
  'Monthly Income',
]

const RegistrationManualForm = ({
  formState,
  courses,
  familyMembers,
  onAddFamilyMember,
  onRemoveFamilyMember,
  watch,
  setValue,
}) => {
  const { register, errors } = formState

  const birthdateValue = watch('birthdate')
  const ageValue = watch('age')
  const studentCategoryValue = watch('StudentCat')
  const indigentValue = watch('indigentP')
  const dswdValue = watch('dswd_member')
  const assistanceValue = watch('social_assistance_beneficiary')

  useEffect(() => {
    if (!birthdateValue) return
    const parsed = dayjs(birthdateValue)
    if (!parsed.isValid()) return
    setValue('age', String(dayjs().diff(parsed, 'year')), { shouldValidate: false })
    setValue('monthoption', parsed.format('MMMM').toLowerCase(), {
      shouldValidate: false,
    })
    setValue('date', parsed.format('DD'), { shouldValidate: false })
    setValue('year', parsed.format('YYYY'), { shouldValidate: false })
  }, [birthdateValue, setValue])

  const normalizeValue = (value) =>
    value === undefined || value === null ? '' : String(value)

  const showIndigentSpecify = useMemo(() => {
    const current = normalizeValue(indigentValue)
    return IndigentP.find((option) => String(option.value) === current)?.showTextInput
  }, [indigentValue])

  const showWorkingField = studentCategoryValue === 'Wstudent'
  const showDswdDetails = dswdValue === 'yes'
  const showAssistanceDetails = assistanceValue === 'yes'

  return (
    <div className='space-y-8'>
      <input type='hidden' {...register('monthoption')} />
      <input type='hidden' {...register('date')} />
      <input type='hidden' {...register('year')} />

      <SectionCard
        title='Application Details'
        subtitle='Select the applicable student type and course you are applying for.'
      >
        <div className='grid gap-4 lg:grid-cols-3'>
          <LabeledSelect
            label='Student Application'
            name='studenttype'
            options={Studenttype}
            register={register}
            errors={errors}
          />
          <LabeledSelect
            label='Student Category'
            name='StudentCat'
            options={Scategory}
            register={register}
            errors={errors}
          />
          <TextInput
            label='Nature of Work (if working student)'
            name='Nwork'
            placeholder='Describe work or employer'
            disabled={!showWorkingField}
            className={!showWorkingField ? 'bg-gray-100' : undefined}
            {...formState}
          />
        </div>
        <div className='grid gap-4 md:grid-cols-2'>
          <LabeledSelect
            label='Course Applied For'
            name='courseId'
            options={[
              { value: '', label: 'Select a course', disabled: true, hidden: true },
              ...courses.map((course) => ({
                value: course.id,
                label: course.label,
              })),
            ]}
            register={register}
            errors={errors}
          />
        </div>
      </SectionCard>

      <SectionCard
        title='Personal & Guardian Information'
        subtitle='Use the exact information that appears on your birth certificate, IDs, and school records.'
      >
        <div className='grid gap-4 lg:grid-cols-4'>
          <TextInput label='Last Name' name='lname' {...formState} />
          <TextInput label='First Name' name='fname' {...formState} />
          <TextInput label='Middle Name' name='mname' {...formState} />
          <LabeledSelect
            label='Suffix'
            name='pref'
            options={suffixoption}
            register={register}
            errors={errors}
          />
        </div>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
          <TextInput label='Birthdate' type='date' name='birthdate' {...formState} />
          <TextInput label='Age' name='age' value={ageValue || ''} readOnly {...formState} />
          <LabeledSelect
            label='Sex'
            name='sex'
            options={sex}
            register={register}
            errors={errors}
          />
          <LabeledSelect
            label='Gender Identity'
            name='gender'
            options={Gender}
            register={register}
            errors={errors}
          />
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          <LabeledSelect
            label='Civil Status'
            name='civilstatus'
            options={Civilstatus}
            register={register}
            errors={errors}
          />
          <TextInput label='Mobile Number' name='contactnumber' type='tel' {...formState} />
          <TextInput label='Email Address' name='email' type='email' {...formState} />
        </div>
        <div className='grid gap-4 md:grid-cols-2'>
          <TextInput label='Home Address' name='home_address' {...formState} />
          <TextInput label='Present Address' name='present_address' {...formState} />
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          <TextInput label='Place of Birth (City / Municipality)' name='pbirth' {...formState} />
          <LabeledSelect
            label='PWD'
            name='pwd'
            options={YesNoOptions}
            register={register}
            errors={errors}
          />
          <LabeledSelect
            label='Member of Cultural Minor Group?'
            name='indigentP'
            options={IndigentP}
            register={register}
            errors={errors}
          />
        </div>
        {showIndigentSpecify && (
          <TextInput
            label='If yes, please specify the community'
            name='indigentPy'
            {...formState}
          />
        )}
        <div className='mt-6 border-t border-gray-100 pt-4'>
          <p className='mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500'>
            Academic Background & Guardians
          </p>
          <div className='grid gap-4 md:grid-cols-4'>
          <TextInput label='Senior High Track' name='senior_high_track' {...formState} />
          <TextInput label='Strand' name='strand' {...formState} />
          <TextInput label='LRN' name='lrn' {...formState} />
          <TextInput label='GPA' name='gpa' {...formState} />
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          <TextInput label='Year Graduated' name='year_graduated' {...formState} />
          <TextInput label='Father&apos;s Complete Name' name='father_name' {...formState} />
          <TextInput label='Mother&apos;s Maiden Name' name='mother_maiden_name' {...formState} />
        </div>
        </div>
      </SectionCard>

      <SectionCard
        title='Socio-Economic Data'
        subtitle='List household members currently living under the same roof, along with their livelihood and income.'
      >
        <div className='w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm'>
          <table className='min-w-max divide-y divide-gray-200 text-sm'>
            <thead className='bg-gray-50'>
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    scope='col'
                    className='px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500'
                  >
                    {header}
                  </th>
                ))}
                <th className='px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 bg-white'>
              {familyMembers.map((member, index) => (
                <tr key={member.id}>
                  {['name', 'relationship', 'age', 'mobile', 'education', 'occupation', 'income'].map(
                    (field) => (
                      <td key={field} className='px-3 py-2 align-top'>
                        <input
                          type='text'
                          className='w-full rounded-md border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none'
                          {...register(`family_members.${index}.${field}`)}
                        />
                      </td>
                    ),
                  )}
                  <td className='px-3 py-2'>
                    {familyMembers.length > 1 && (
                      <button
                        type='button'
                        className='text-xs font-semibold text-red-600 hover:text-red-700'
                        onClick={() => onRemoveFamilyMember(index)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type='button'
          className='text-sm font-semibold text-blue-600 hover:text-blue-700'
          onClick={onAddFamilyMember}
        >
          + Add Household Member
        </button>
        <div className='grid gap-4 md:grid-cols-3'>
          <LabeledSelect
            label='Do you have a family member who is a DSWD?'
            name='dswd_member'
            options={YesNoOptions}
            register={register}
            errors={errors}
          />
          {showDswdDetails && (
            <TextInput label='If yes, please specify' name='dswd_member_details' {...formState} />
          )}
          <LabeledSelect
            label='Beneficiary of Gov&apos;t Social Assistance Program?'
            name='social_assistance_beneficiary'
            options={YesNoOptions}
            register={register}
            errors={errors}
          />
          {showAssistanceDetails && (
            <TextInput
              label='If yes, specify the program'
              name='social_assistance_details'
              {...formState}
            />
          )}
          <TextInput label='Total Monthly Income' name='total_monthly_income' {...formState} />
        </div>
      </SectionCard>
    </div>
  )
}

const LabeledSelect = ({ label, ...props }) => (
  <div className='flex flex-col gap-2'>
    <Label className='text-sm font-medium text-gray-700'>{label}</Label>
    <SelectInput {...props} />
  </div>
)

const SectionCard = ({ title, subtitle, children }) => (
  <section className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
    <header className='mb-5 space-y-1'>
      <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
      {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
    </header>
    <div className='space-y-5'>{children}</div>
  </section>
)

export default RegistrationManualForm

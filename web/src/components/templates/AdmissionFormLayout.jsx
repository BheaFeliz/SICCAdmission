import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'

const defaultPlaceholder = '______________________________'

const normalizeText = (value) => {
  if (value === null || value === undefined) return ''
  return String(value)
}

const formatDate = (value) => {
  if (!value) return ''
  const parsed = dayjs(value)
  if (!parsed.isValid()) return value
  return parsed.format('MM/DD/YYYY')
}

const DividerLabel = ({ children }) => (
  <div className='border-y border-black bg-[#cfe2c3] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide'>
    {children}
  </div>
)

const LabeledLine = ({ label, value, className = '', grow = true }) => (
  <div className={`flex items-center text-[10px] ${className}`}>
    <span className='font-semibold'>{label}</span>
    <span className={`ml-1 border-b border-black px-2 leading-tight ${grow ? 'flex-1' : ''}`}>
      {value || '\u00A0'}
    </span>
  </div>
)

const NameSegment = ({ caption, value }) => (
  <div className='flex flex-col text-[9px] leading-tight'>
    <span className='min-h-[20px] border-b border-black px-2 pb-1 text-[10px] tracking-wide'>
      {value || '\u00A0'}
    </span>
    <span className='pt-0.5 text-center italic text-[9px]'>{caption}</span>
  </div>
)

const Checkbox = ({ label, checked }) => (
  <div className='flex items-center space-x-1 text-[10px]'>
    <span className='flex h-3 w-3 items-center justify-center border border-black text-[9px] font-bold text-black'>
      {checked ? 'X' : ''}
    </span>
    <span>{label}</span>
  </div>
)

const normalizeImagePath = (value = '') => {
  if (!value) return null
  if (/^(https?:)?\/\//i.test(value)) return value
  if (value.startsWith('/storage')) return value
  return `${process.env.NEXT_PUBLIC_API_URL || ''}/storage/${value.replace(/^\/+/, '')}`
}

const AdmissionFormLayout = React.forwardRef(
  (
    {
      data = {},
      className = '',
      logoSrc = '/logo.png',
    },
    ref,
  ) => {
    const bool = (value, expected) => normalizeText(value).toLowerCase() === expected
    const pickValue = (...keys) => {
      for (const key of keys) {
        const val = data?.[key]
        if (val !== undefined && val !== null && val !== '') return val
      }
      return ''
    }
    const fallback = (value, placeholder = defaultPlaceholder) =>
      normalizeText(value) || placeholder

    const memberRows = Array.from({ length: 5 }).map((_, index) => data.family_members?.[index] || {})
    const photoSrc = normalizeImagePath(data?.images?.[0]?.url || data?.images?.[0]?.path || data?.photo_url)

    return (
      <div
        ref={ref}
        className={`mx-auto w-full max-w-[820px] border border-black bg-[#eef5ea] p-3 text-[11px] text-black shadow ${className}`}
        style={{ fontFamily: '"Times New Roman", serif', lineHeight: 1.25 }}
      >
        <div className='bg-white'>
          <div className='flex border-b border-black'>
            <div className='flex w-[140px] items-center justify-center border-r border-black p-3'>
              <Image src={logoSrc} alt='SICC Logo' width={90} height={90} priority />
            </div>
            <div className='flex-1 px-3 py-2 text-center text-[11px] leading-tight'>
              <p className='text-sm font-extrabold tracking-wide'>SAMAL ISLAND CITY COLLEGE</p>
            <p>Datu Taganiog Street, Brgy. Penaplata</p>
            <p>Samal District Island Garden City of Samal, Davao del Norte</p>
            <p>Email: samalislandcitycollege@gmail.com</p>
            <p>Website: https://sicc.samalcity.gov.ph</p>
            <p className='mt-1 text-[13px] font-extrabold tracking-wide'>ADMISSION APPLICATION FORM</p>
          </div>
          <div className='w-[170px] border-l border-black text-[10px]'>
            <div className='grid border-b border-black grid-cols-[70px,1fr]'>
              <span className='border-r border-black px-2 py-1 font-semibold'>Form No.</span>
              <span className='px-2 py-1'>F-D2A11-107</span>
            </div>
            <div className='grid border-b border-black grid-cols-[70px,1fr]'>
              <span className='border-r border-black px-2 py-1 font-semibold'>Revision No.</span>
              <span className='px-2 py-1'>01</span>
            </div>
            <div className='grid grid-cols-[70px,1fr]'>
              <div className='border-r border-black px-2 py-1 font-semibold'>Date<br />Effective</div>
              <span className='px-2 py-1'>{formatDate(data.application_date)}</span>
            </div>
          </div>
        </div>

        <div className='border-b border-black text-[10px]'>
          <div className='grid grid-cols-6 border-t border-black'>
            <div className='col-span-2 flex border-r border-black'>
              <div className='border-r border-black bg-[#dfeee0] px-2 py-1 font-semibold uppercase'>Semester:</div>
              <div className='flex flex-1 items-center justify-around px-2'>
                <Checkbox label='1st' checked={bool(data.semester, '1st')} />
                <Checkbox label='2nd' checked={bool(data.semester, '2nd')} />
              </div>
            </div>
            <div className='col-span-2 flex border-r border-black'>
              <div className='border-r border-black bg-[#dfeee0] px-2 py-1 font-semibold uppercase'>A.Y.</div>
              <div className='flex flex-1 items-center justify-around px-2'>
                <span className='border-b border-black px-2'>{data.academic_year_start || '____'}</span>
                <span className='px-1'>-</span>
                <span className='border-b border-black px-2'>{data.academic_year_end || '____'}</span>
              </div>
            </div>
            <div className='col-span-2 flex'>
              <div className='border-r border-black bg-[#dfeee0] px-2 py-1 font-semibold uppercase'>SY</div>
              <div className='flex flex-1 items-center px-2'>{fallback(data.sy || '')}</div>
            </div>
          </div>

          <div className='grid grid-cols-2 border-t border-black text-[10px]'>
            <div className='flex border-r border-black'>
              <div className='border-r border-black bg-[#dfeee0] px-2 py-1 font-semibold uppercase'>Student Application</div>
              <div className='flex flex-1 items-center px-2'>{fallback(data.application_number || data.reference_number)}</div>
            </div>
            <div className='flex'>
              <div className='border-r border-black bg-[#dfeee0] px-2 py-1 font-semibold uppercase'>Date of Application</div>
              <div className='flex flex-1 items-center px-2'>{formatDate(data.application_date) || defaultPlaceholder}</div>
            </div>
          </div>

          <div className='grid grid-cols-[2fr,1fr] border-t border-black text-[10px]'>
            <div className='flex border-r border-black'>
              <div className='border-r border-black bg-[#dfeee0] px-2 py-1 font-semibold uppercase'>Type / Category</div>
              <div className='flex flex-1 flex-col px-2 py-2'>
                <div className='flex flex-wrap gap-4'>
                  {[
                    { label: 'New Student', value: 'college1' },
                    { label: 'Transferee', value: 'trans' },
                    { label: 'Returnee', value: 'returnee' },
                    { label: 'Cross-Enrollee', value: 'crossenrolle' },
                  ].map((itemType) => (
                    <Checkbox key={itemType.value} label={itemType.label} checked={bool(data.studenttype, itemType.value)} />
                  ))}
                </div>
                <div className='mt-2 flex flex-wrap gap-4 border-t border-dashed border-black pt-2'>
                  <Checkbox label='Full-time' checked={bool(data.StudentCat, 'ftime')} />
                  <Checkbox label='Working student' checked={bool(data.StudentCat, 'wstudent')} />
                  <div className='flex items-center text-[10px]'>
                    <span>Nature of work:</span>
                    <span className='ml-2 border-b border-black px-2 min-w-[120px]'>{fallback(data.Nwork, '')}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col border-l border-black items-center justify-center px-2 py-2'>
              <div className='mb-1 text-center text-[9px] font-semibold uppercase leading-tight'>
                ID Photo<br />(Passport Size)
              </div>
              {photoSrc ? (
                <Image src={photoSrc} alt='ID Photo' width={80} height={80} className='h-20 w-20 object-cover' />
              ) : (
                <div className='flex h-24 w-24 items-center justify-center border-2 border-dashed border-black text-center text-[9px] leading-tight'>
                  Passport<br />Photo
                </div>
              )}
            </div>
          </div>

          <div className='border-t border-black text-[10px]'>
            <div className='flex bg-[#dfeee0] px-2 py-1 font-semibold uppercase'>Course Applied for</div>
            <div className='grid grid-cols-2 gap-1 px-4 py-2 text-[10px]'>
              {[
                { label: 'BS in Agribusiness', value: '1' },
                { label: 'BS in Entrepreneurship', value: '2' },
                { label: 'BS in Tourism Management', value: '4' },
                { label: 'BS in Criminology', value: '5' },
                { label: 'Bachelor of Public Administration', value: '3' },
              ].map((course) => (
                <div key={course.value} className='flex items-center space-x-2'>
                  <span className='flex h-3 w-3 items-center justify-center border border-black text-[9px] font-semibold'>
                    {(String(pickValue('courseId', 'selectcourse', 'course_code')).toUpperCase() === course.value.toUpperCase()) ? 'X' : ''}
                  </span>
                  <span>{course.label}</span>
                </div>
              ))}
            </div>
            <p className='px-3 pb-2 text-[9px] leading-snug italic'>
              I certify that I have thoroughly read the admission requirements. <span className='font-semibold not-italic'>Note:</span> All information requested must be supplied.
              If an item is not applicable, kindly indicate &quot;N/A&quot;. Only accomplished forms with complete requirements will be accepted.
            </p>
          </div>
        </div>

        <DividerLabel>A. Personal Information</DividerLabel>

        <div className='space-y-2 px-3 py-3'>
          <div className='flex items-start gap-2'>
            <span className='mt-2 text-[10px] font-semibold'>Name:</span>
            <div className='grid flex-1 grid-cols-4 gap-2'>
              <NameSegment caption='(Last Name)' value={fallback(data.lname, '')} />
              <NameSegment caption='(Given Name)' value={fallback(data.fname, '')} />
              <NameSegment caption='(Middle Name)' value={fallback(data.mname, '')} />
              <NameSegment caption='(Ext. Name Jr., Sr.)' value={fallback(data.pref, '')} />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 text-[10px]'>
            <div className='flex items-center gap-3'>
              <span className='font-semibold min-w-[55px]'>Sex:</span>
              <Checkbox label='Male' checked={bool(data.sex, 'male')} />
              <Checkbox label='Female' checked={bool(data.sex, 'female')} />
            </div>
            <div className='flex items-center gap-3'>
              <span className='font-semibold min-w-[75px]'>Gender:</span>
              <Checkbox label='Man' checked={bool(data.gender, 'man')} />
              <Checkbox label='Woman' checked={bool(data.gender, 'woman')} />
              <Checkbox label='LGBTQ' checked={bool(data.gender, 'lgbtqa+') || bool(data.gender, 'lgbtq')} />
            </div>
          </div>

          <div className='grid grid-cols-[1fr,1fr,2fr] gap-2 text-[10px]'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold'>Age:</span>
              <span className='flex-1 border-b border-black px-2'>{fallback(data.age, '')}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-semibold'>Birthdate:</span>
              <span className='flex-1 border-b border-black px-2'>
                {formatDate(data.birthdate) || `${data.monthoption || ''} ${data.date || ''}, ${data.year || ''}`}
              </span>
              <span className='italic text-[9px]'>(mm/dd/yyyy)</span>
            </div>
            <div className='grid grid-cols-[auto,1fr] gap-2'>
              <span className='font-semibold'>Civil Status:</span>
              <div className='flex flex-wrap items-center gap-3'>
                {['single', 'married', 'widowed', 'solo parent'].map((status) => (
                  <Checkbox key={status} label={status.replace(/\b\w/g, (c) => c.toUpperCase())} checked={bool(data.civilstatus, status)} />
                ))}
                <div className='flex items-center gap-2'>
                  <span>Other:</span>
                  <span className='border-b border-black px-2 leading-tight min-w-[80px]'>{fallback(data.civilstatus_other, '')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <LabeledLine label='Home Address' value={data.home_address || data.pbs} />
            <LabeledLine label='Mobile Number' value={data.contactnumber} />
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <LabeledLine label='Present Address' value={data.present_address} />
            <LabeledLine label='Email Address' value={data.email} />
          </div>

          <div className='grid grid-cols-3 gap-2'>
            <LabeledLine label='Place of Birth' value={data.pbirth} />
            <div className='flex items-center gap-3'>
              <span className='font-semibold'>PWD:</span>
              <Checkbox label='Yes' checked={bool(data.pwd, 'yes')} />
              <Checkbox label='No' checked={bool(data.pwd, 'no')} />
            </div>
            <LabeledLine label='Year Graduated' value={data.year_graduated} />
          </div>

          <div className='grid grid-cols-4 gap-2'>
            <LabeledLine label='Senior High Track' value={data.senior_high_track} />
            <LabeledLine label='Strand' value={data.strand} />
            <LabeledLine label='LRN' value={data.lrn} />
            <LabeledLine label='GPA' value={data.gpa} />
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <span className='font-semibold'>Member of Cultural Minor Group?</span>
            <Checkbox label='No' checked={bool(data.indigentP, 'no')} />
            <Checkbox label='Yes (Specify)' checked={bool(data.indigentP, 'yes')} />
            <span className='border-b border-black px-2'>{fallback(data.indigentPy, '')}</span>
            <span className='text-[9px] italic'>(Ex. Sama, Mandaya, Bagobo, etc.)</span>
          </div>

          <LabeledLine label='Father&apos;s Complete Name' value={data.father_name} />
          <LabeledLine label='Mother&apos;s Maiden Name' value={data.mother_maiden_name} />
        </div>

        <DividerLabel>B. Socio-Economic Data</DividerLabel>

        <div className='px-3 py-3'>
          <div className='overflow-hidden border border-black text-[9px]'>
            <table className='w-full table-fixed border-collapse'>
              <colgroup>
                <col style={{ width: '22%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '8%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr className='bg-[#daf1da] text-center font-semibold'>
                  <th className='border border-black px-2 py-1'>Family/ Household Members (COMPLETE NAME)</th>
                  <th className='border border-black px-2 py-1'>Relationship to Applicant</th>
                  <th className='border border-black px-2 py-1'>Age</th>
                  <th className='border border-black px-2 py-1'>Mobile Number</th>
                  <th className='border border-black px-2 py-1'>Highest Educational Attainment</th>
                  <th className='border border-black px-2 py-1'>Occupation/Livelihood</th>
                  <th className='border border-black px-2 py-1'>Monthly Income</th>
                </tr>
              </thead>
              <tbody>
                {memberRows.map((member, index) => (
                  <tr key={`member-${index}`} className='text-center'>
                    <td className='border border-black px-2 py-1 text-left break-words'>{member.name || ' '}</td>
                    <td className='border border-black px-2 py-1 break-words'>{member.relationship || ' '}</td>
                    <td className='border border-black px-2 py-1'>{member.age || ' '}</td>
                    <td className='border border-black px-2 py-1 break-words'>{member.mobile || ' '}</td>
                    <td className='border border-black px-2 py-1 break-words'>{member.education || ' '}</td>
                    <td className='border border-black px-2 py-1 break-words'>{member.occupation || ' '}</td>
                    <td className='border border-black px-2 py-1 break-words'>{member.income || ' '}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='mt-3 flex items-center justify-between text-[10px]'>
            <span className='italic'>Note: Please include only members living in the same house.</span>
            <div className='flex items-center'>
              <span className='font-semibold'>Total Monthly Income:</span>
              <span className='ml-2 border-b border-black px-2'>{fallback(data.total_monthly_income, '')}</span>
            </div>
          </div>

          <div className='mt-2 flex flex-wrap items-center gap-3 text-[10px]'>
            <span>Do you have family member who is an OFW?</span>
            <Checkbox label='No' checked={bool(pickValue('ofw', 'is_ofw'), 'no')} />
            <Checkbox label='Yes, specify:' checked={bool(pickValue('ofw', 'is_ofw'), 'yes')} />
            <span className='border-b border-black px-2'>{fallback(pickValue('ofwprofession', 'ofwProfession'), '')}</span>
          </div>

          <div className='mt-2 flex flex-wrap items-center gap-3 text-[10px]'>
            <span>Is your family a beneficiary of any government social assistance program (ex. 4Ps)?</span>
            <Checkbox label='Yes' checked={bool(pickValue('social_assistance_beneficiary', 'socialAssistanceBeneficiary'), 'yes')} />
            <Checkbox label='No' checked={bool(pickValue('social_assistance_beneficiary', 'socialAssistanceBeneficiary'), 'no')} />
          </div>
          <div className='mt-1 flex items-center gap-2 text-[10px]'>
            <span>If Yes, please specify the program:</span>
            <span className='flex-1 border-b border-black px-2'>{fallback(pickValue('social_assistance_details', 'socialAssistanceDetails'), '')}</span>
          </div>
          <div className='mt-1 flex items-center gap-2 text-[10px]'>
            <span>Total amount received per month:</span>
            <span className='flex-1 border-b border-black px-2'>{fallback(pickValue('social_assistance_amount', 'socialAssistanceAmount'), '')}</span>
          </div>
        </div>

        <div className='border-t border-black px-3 py-4 text-[9px] leading-tight'>
          <p className='text-justify'>
            <span className='font-semibold'>CONFORME:</span> By signing below, I hereby certify that all the information written in this application are complete and accurate. I agree to update the Office of Admissions and the Registrar&apos;s Office for any changes. I acknowledge that I have read and understood the Samal Island City College (SICC) Admissions Privacy Notice posted in the office premises. I understand that by applying for admission/registering as a student of this institution, I allow SICC through the Office of Admissions to collect, record, organize, update or modify, retrieve, consult, utilize, consolidate, block, erase or delete any information which are a part of my personal data for historical, statistical, research and evaluation purposes pursuant to the provisions of the Republic Act No. 10173 of the Philippines, Data Privacy Act of 2012 and its corresponding Implementing Rules and Regulations.
          </p>
        </div>

        <div className='grid grid-cols-3 border-t border-black text-center text-[10px]'>
          <div className='border-r border-black px-2 py-4'>
            <div className='border-b border-black pb-1'>{fallback(data.student_signature || '')}</div>
            <span>Student&apos;s signature over printed name</span>
          </div>
          <div className='border-r border-black px-2 py-4'>
            <div className='border-b border-black pb-1'>{fallback(data.siccat || '')}</div>
            <span>SICCAT</span>
          </div>
          <div className='px-2 py-4'>
            <div className='border-b border-black pb-1'>JAMAICAH D. MAHINAY, LPT</div>
            <span>Admission In-Charge</span>
          </div>
        </div>

        <div className='flex border-t border-black text-[10px]'>
          <div className='flex-1 border-r border-black px-2 py-2'>Remarks:</div>
          <div className='flex-1 border-r border-black px-2 py-2'>Remarks:</div>
          <div className='flex-1 px-2 py-2'>Remarks:</div>
        </div>

        <div
          className='border-t border-black'
          style={{
            height: '18px',
            backgroundImage:
              'repeating-linear-gradient(135deg,#b9312b 0px,#b9312b 10px,#f3d87c 10px,#f3d87c 20px,#1c5f2e 20px,#1c5f2e 30px)',
          }}
        />
      </div>
    </div>
  )
  },
)

AdmissionFormLayout.displayName = 'AdmissionFormLayout'

export default AdmissionFormLayout

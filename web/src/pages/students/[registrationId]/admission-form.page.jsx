import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { useUser } from '@/hooks/redux/auth'
import { useStudent, useStudents } from '@/hooks/redux/useStudents'

const TEXT_POSITIONS = {
  //applicationNumber: { x: 182, y: 128, maxWidth: 130 },
  academicYearStart: { x: 248, y: 109, maxWidth: 32 },
  academicYearEnd: { x: 304, y: 109, maxWidth: 34 },
  lastName: { x: 104, y: 258, maxWidth: 78 },
  firstName: { x: 188, y: 258, maxWidth: 78 },
  middleName: { x: 275, y: 258, maxWidth: 70 },
  suffix: { x: 360, y: 258, maxWidth: 60 },
  age: { x: 86, y: 301, maxWidth: 40 },
  birthdate: { x: 168, y: 301, maxWidth: 118 },
  civilStatusOther: { x: 492, y: 315, maxWidth: 90 },
  homeAddress: { x: 122, y: 336, maxWidth: 230 },
  mobileNumber: { x: 452, y: 336, maxWidth: 135 },
  presentAddress: { x: 122, y: 357, maxWidth: 230 },
  email: { x: 452, y: 357, maxWidth: 135 },
  placeOfBirth: { x: 128, y: 377, maxWidth: 230 },
  lastSchool: { x: 188, y: 398, maxWidth: 260 },
  yearGraduated: { x: 467, y: 398, maxWidth: 80 },
  seniorTrack: { x: 148, y: 418, maxWidth: 95 },
  strand: { x: 272, y: 418, maxWidth: 70 },
  lrn: { x: 367, y: 418, maxWidth: 90 },
  gpa: { x: 468, y: 418, maxWidth: 60 },
  culturalGroup: { x: 307, y: 446, maxWidth: 170 },
  fatherName: { x: 172, y: 500, maxWidth: 380 },
  motherName: { x: 172, y: 532, maxWidth: 380 },
  totalIncome: { x: 460, y: 700, maxWidth: 165 }, //okay
  ofwProfession: { x: 326, y: 714, maxWidth: 170 },
  assistanceDetails: { x: 198, y: 748, maxWidth: 270 },
  assistanceAmount: { x: 218, y: 775, maxWidth: 170 },
  studentSignature: { x: 68, y: 838, maxWidth: 150 },
  siccat: { x: 248, y: 838, maxWidth: 150 },
  remarksLeft: { x: 60, y: 870, maxWidth: 150 },
  remarksMid: { x: 248, y: 870, maxWidth: 150 },
  remarksRight: { x: 436, y: 870, maxWidth: 150 },
}

const CHECKBOX_POSITIONS = {
  semesterFirst: { x: 167, y: 111 },
  semesterSecond: { x: 215, y: 111 },
  studentNew: { x: 174, y: 138 },
  studentTransferee: { x: 245, y: 138 },
  studentReturnee: { x: 322, y: 138 },
  studentCross: { x: 391, y: 138 },
  categoryFull: { x: 174, y: 152 },
  categoryWorking: { x: 244, y: 152 },
  courseAgribusiness: { x: 174, y: 165 },
  courseEntrepreneurship: { x: 344, y: 165 },
  courseTourism: { x: 174, y: 178 },
  courseCriminology: { x: 344, y: 178 },
  coursePublicAdmin: { x: 174, y: 191 },
  sexMale: { x: 74, y: 276 },
  sexFemale: { x: 126, y: 276 },
  genderMan: { x: 365, y: 276 },
  genderWoman: { x: 423, y: 276 },
  genderLgbtq: { x: 500, y: 276 },
  civilSingle: { x: 306, y: 303 },
  civilMarried: { x: 354, y: 303 },
  civilWidowed: { x: 411, y: 303 },
  civilSoloParent: { x: 470, y: 303 },
  pwdYes: { x: 402, y: 378 },
  pwdNo: { x: 443, y: 378 },
  culturalNo: { x: 219, y: 444 },
  culturalYes: { x: 265, y: 444 },
  ofwNo: { x: 247, y: 713 },
  ofwYes: { x: 291, y: 713 },
  assistanceYes: { x: 54, y: 748 },
  assistanceNo: { x: 54, y: 774 },
}

const AdmissionFormPage = () => {
  const router = useRouter()
  const { registrationId } = router.query
  const { user } = useUser()
  const { registration, isLoading } = useStudent(registrationId)
  const { registrations: cachedRegistrations } = useStudents()
  const [isGenerating, setIsGenerating] = useState(false)
  const [pdfBytes, setPdfBytes] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const breadcrumbs = useMemo(
    () => [
      { href: '/students', title: 'Students' },
      { href: '#', title: 'Admission Form' },
    ],
    [],
  )

  const handleBack = () => {
    router.back()
  }

  const Wrapper = user?.role === 'admin' ? Template : StaffTemplate

  const boolMatch = (value, expected) =>
    (value ?? '').toString().toLowerCase() === (expected ?? '').toString().toLowerCase()

  const fallback = (value, placeholder = '') => {
    if (value === null || value === undefined) return placeholder
    if (typeof value === 'number') return String(value)
    if (typeof value === 'string' && value.trim()) return value
    return placeholder
  }

  const formatDate = (value) => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`
  }

  const buildPdfBytes = useCallback(async (record) => {
    const templateResponse = await fetch('/ADMISSION-FORM.pdf')
    if (!templateResponse.ok) {
      throw new Error('Failed to load PDF template.')
    }
    const templateBytes = await templateResponse.arrayBuffer()
    const pdfDoc = await PDFDocument.load(templateBytes)
    const page = pdfDoc.getPage(0)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pageHeight = page.getHeight()

    const toY = (y, adjust = 2) => pageHeight - y - adjust
    const drawText = (text, x, y, options = {}) => {
      const value = fallback(text, '').trim()
      if (!value) return
      page.drawText(value, {
        x,
        y: toY(y, options.baselineAdjust ?? 2),
        size: options.size ?? 9,
        maxWidth: options.maxWidth,
        font,
      })
    }
    const markCheckbox = (condition, x, y) => {
      if (!condition) return
      page.drawText('/', {
        x: x + 2,
        y: toY(y, -1),
        size: 12,
        font,
      })
    }

    const drawField = (key, value, extra = {}) => {
      const config = TEXT_POSITIONS[key]
      if (!config) return
      drawText(value, config.x, config.y, { ...config, ...extra })
    }

    const markField = (key, condition) => {
      const config = CHECKBOX_POSITIONS[key]
      if (!config) return
      markCheckbox(condition, config.x, config.y)
    }

    const selectedCourse =
      fallback(record.courseId) || fallback(record.selectcourse) || fallback(record.course_code)

    const applicationNumber = record.application_number || record.reference_number || record.id

    const checkboxConditions = [
      { key: 'semesterFirst', match: boolMatch(record.semester, '1st') },
      { key: 'semesterSecond', match: boolMatch(record.semester, '2nd') },
      { key: 'studentNew', match: boolMatch(record.studenttype, 'college1') },
      { key: 'studentTransferee', match: boolMatch(record.studenttype, 'trans') },
      { key: 'studentReturnee', match: boolMatch(record.studenttype, 'returnee') },
      { key: 'studentCross', match: boolMatch(record.studenttype, 'crossenrolle') },
      { key: 'categoryFull', match: boolMatch(record.StudentCat, 'ftime') },
      { key: 'categoryWorking', match: boolMatch(record.StudentCat, 'wstudent') },
      { key: 'courseAgribusiness', match: selectedCourse === '1' },
      { key: 'courseEntrepreneurship', match: selectedCourse === '2' },
      { key: 'courseTourism', match: selectedCourse === '4' },
      { key: 'courseCriminology', match: selectedCourse === '5' },
      { key: 'coursePublicAdmin', match: selectedCourse === '3' },
      { key: 'sexMale', match: boolMatch(record.sex, 'male') },
      { key: 'sexFemale', match: boolMatch(record.sex, 'female') },
      { key: 'genderMan', match: boolMatch(record.gender, 'man') },
      { key: 'genderWoman', match: boolMatch(record.gender, 'woman') },
      { key: 'genderLgbtq', match: boolMatch(record.gender, 'lgbtqa+') || boolMatch(record.gender, 'lgbtq') },
      { key: 'civilSingle', match: boolMatch(record.civilstatus, 'single') },
      { key: 'civilMarried', match: boolMatch(record.civilstatus, 'married') },
      { key: 'civilWidowed', match: boolMatch(record.civilstatus, 'widowed') },
      { key: 'civilSoloParent', match: boolMatch(record.civilstatus, 'solo parent') },
      { key: 'pwdYes', match: boolMatch(record.pwd, 'yes') },
      { key: 'pwdNo', match: boolMatch(record.pwd, 'no') },
      { key: 'culturalNo', match: boolMatch(record.indigentP, 'no') },
      { key: 'culturalYes', match: boolMatch(record.indigentP, 'yes') },
      { key: 'ofwNo', match: boolMatch(record.ofw, 'no') || boolMatch(record.is_ofw, 'no') },
      { key: 'ofwYes', match: boolMatch(record.ofw, 'yes') || boolMatch(record.is_ofw, 'yes') },
      { key: 'assistanceYes', match: boolMatch(record.social_assistance_beneficiary, 'yes') || boolMatch(record.socialAssistanceBeneficiary, 'yes') },
      { key: 'assistanceNo', match: boolMatch(record.social_assistance_beneficiary, 'no') || boolMatch(record.socialAssistanceBeneficiary, 'no') },
    ]
    checkboxConditions.forEach(({ key, match }) => markField(key, match))

    drawField('applicationNumber', applicationNumber)
    drawField('academicYearStart', record.academic_year_start)
    drawField('academicYearEnd', record.academic_year_end)
    drawField('lastName', record.lname)
    drawField('firstName', record.fname)
    drawField('middleName', record.mname)
    drawField('suffix', record.pref)
    drawField('age', record.age)
    drawField(
      'birthdate',
      record.birthdate ? formatDate(record.birthdate) : `${record.monthoption || ''} ${record.date || ''}, ${record.year || ''}`,
    )
    drawField('civilStatusOther', record.civilstatus_other)
    drawField('homeAddress', record.home_address || record.pbs)
    drawField('mobileNumber', record.contactnumber)
    drawField('presentAddress', record.present_address)
    drawField('email', record.email)
    drawField('placeOfBirth', record.pbirth)
    drawField('lastSchool', record.senior_high_school || record.school_last_attended)
    drawField('yearGraduated', record.year_graduated)
    drawField('seniorTrack', record.senior_high_track)
    drawField('strand', record.strand)
    drawField('lrn', record.lrn)
    drawField('gpa', record.gpa)
    drawField('culturalGroup', record.indigentPy)
    drawField('fatherName', record.father_name)
    drawField('motherName', record.mother_maiden_name)

    const familyRows = record.family_members || []
    const familyStartY = 585
    const rowGap = 20
    familyRows.slice(0, 5).forEach((member, index) => {
      const y = familyStartY + index * rowGap
      drawText(member.name, 55, y, { maxWidth: 120 })
      drawText(member.relationship || member.relationship_to_applicant, 195, y, { maxWidth: 80 })
      drawText(member.age, 275, y, { maxWidth: 30 })
      drawText(member.mobile || member.mobile_number, 310, y, { maxWidth: 90 })
      drawText(member.education || member.educational_attainment, 405, y, { maxWidth: 90 })
      drawText(member.occupation || member.livelihood, 500, y, { maxWidth: 80 })
      drawText(member.income, 570, y, { maxWidth: 50 })
    })

    drawField('totalIncome', record.total_monthly_income)
    drawField('ofwProfession', record.ofwprofession || record.ofwProfession)
    drawField('assistanceDetails', record.social_assistance_details || record.socialAssistanceDetails)
    drawField('assistanceAmount', record.social_assistance_amount || record.socialAssistanceAmount)
    drawField('studentSignature', record.student_signature)
    drawField('siccat', record.siccat)
    drawField('remarksLeft', record.remarks_left)
    drawField('remarksMid', record.remarks_mid)
    drawField('remarksRight', record.remarks_right)

    return pdfDoc.save()
  }, [])

  const resolvedRegistration = useMemo(() => {
    if (registration && Object.keys(registration).length > 0) {
      return registration
    }
    if (!registrationId) return null
    const fallback = cachedRegistrations?.find(
      (entry) => String(entry.id) === String(registrationId),
    )
    return fallback ? { ...fallback } : null
  }, [registration, cachedRegistrations, registrationId])

  useEffect(() => {
    let cancelled = false
    if (!resolvedRegistration) {
      setPdfBytes(null)
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
      return
    }
    const preparePreview = async () => {
      try {
        const bytes = await buildPdfBytes(resolvedRegistration)
        if (cancelled) return
        setPdfBytes(bytes)
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to build preview PDF', error)
        if (!cancelled) {
          setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev)
            return null
          })
        }
      }
    }
    preparePreview()
    return () => {
      cancelled = true
      setPdfBytes(null)
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
    }
  }, [resolvedRegistration, buildPdfBytes])

  useEffect(() => {
    if (registration) {
      // eslint-disable-next-line no-console
      console.debug('Admission form data', registration)
    }
  }, [registration])

  const handleDownloadPdf = async () => {
    if (!resolvedRegistration) return
    setIsGenerating(true)
    try {
      const bytes = pdfBytes || (await buildPdfBytes(resolvedRegistration))
      if (!pdfBytes) setPdfBytes(bytes)
      const blob = new Blob([bytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Admission-${registration.reference_number || registration.id}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to generate PDF', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Wrapper>
      <div className='bg-slate-50 py-6'>
        <div className='mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between gap-4 print:hidden'>
            <PageHeader breadcrumbs={breadcrumbs} />
            <div className='flex flex-wrap gap-2'>
              <Button color='light' onClick={handleBack}>
                Back
              </Button>
              <Button color='blue' onClick={() => window.print()}>
                Print
              </Button>
              <Button color='dark' onClick={handleDownloadPdf} isProcessing={isGenerating} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>

          {(isLoading && !resolvedRegistration) || (!resolvedRegistration && !previewUrl) ? (
            <div className='flex h-[600px] items-center justify-center bg-white shadow'>
              <Loading />
            </div>
          ) : previewUrl ? (
            <div className='bg-white p-4 shadow print:p-0'>
              <iframe
                title='Admission Form Preview'
                src={previewUrl}
                className='h-[1100px] w-full border border-slate-200'
              />
            </div>
          ) : (
            <div className='flex h-[600px] flex-col items-center justify-center bg-white shadow'>
              <p className='text-sm text-slate-500 mb-3'>
                Unable to load PDF preview. Please ensure the student record exists.
              </p>
              <Button color='dark' onClick={handleDownloadPdf} isProcessing={isGenerating}>
                {isGenerating ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default AdmissionFormPage

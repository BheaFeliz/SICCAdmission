import { Button } from 'flowbite-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRouter } from 'next/router'
import React, { useMemo, useRef, useState } from 'react'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import AdmissionFormLayout from '@/components/templates/AdmissionFormLayout'
import StaffTemplate from '@/components/templates/StaffTemplate'
import Template from '@/components/templates/Template'
import { useUser } from '@/hooks/redux/auth'
import { useStudent } from '@/hooks/redux/useStudents'

const AdmissionFormPage = () => {
  const router = useRouter()
  const { registrationId } = router.query
  const { user } = useUser()
  const { registration, isLoading } = useStudent(registrationId)
  const layoutRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const breadcrumbs = useMemo(() => (
    [
      { href: '/students', title: 'Students' },
      { href: '#', title: 'Admission Form' },
    ]
  ), [])

  const handleBack = () => {
    router.back()
  }

  const Wrapper = user?.role === 'admin' ? Template : StaffTemplate

  const handleDownloadPdf = async () => {
    if (!layoutRef.current || !registration) return
    setIsGenerating(true)
    try {
      const canvas = await html2canvas(layoutRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 936], // 8.5\" x 13\" sheet
      })
      pdf.addImage(imgData, 'PNG', 0, 0, 612, 936)
      const filename = `Admission-${registration.reference_number || registration.id}.pdf`
      pdf.save(filename)
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

          {isLoading || !registration ? (
            <div className='flex h-[600px] items-center justify-center bg-white shadow'>
              <Loading />
            </div>
          ) : (
            <div className='bg-white p-4 shadow print:p-0'>
              <AdmissionFormLayout ref={layoutRef} data={registration} />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default AdmissionFormPage

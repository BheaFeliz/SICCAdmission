import BreadCrumbs from '@/components/atoms/BreadCrumbs'

const PageHeader = ({ breadcrumbs, right }) => {
  return (
    <div className='px-4 py-6 flex justify-between'>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      {right}
    </div>
  )
}

export default PageHeader

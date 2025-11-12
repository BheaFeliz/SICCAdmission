import { Breadcrumb, BreadcrumbItem } from 'flowbite-react'

const BreadCrumbs = ({ breadcrumbs }) => {
  if (!breadcrumbs || !breadcrumbs.length) return null

  return (
    <Breadcrumb aria-label='Default breadcrumb example'>
      {breadcrumbs?.map((breadcrumb) => (
        <BreadcrumbItem
          key={breadcrumb.href}
          href={breadcrumb.href}
          icon={breadcrumb.icon}
        >
          {breadcrumb.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default BreadCrumbs

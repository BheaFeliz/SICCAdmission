import { Breadcrumb } from 'flowbite-react'

const BreadCrumbs = ({ breadcrumbs }) => {
  if (!breadcrumbs || !breadcrumbs.length) return null

  return (
    <Breadcrumb aria-label='Default breadcrumb example'>
      {breadcrumbs?.map((breadcrumb) => {
        return (
          <Breadcrumb.Item
            key={breadcrumb.href}
            href={breadcrumb.href}
            icon={breadcrumb.icon}
          >
            {breadcrumb.title}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default BreadCrumbs

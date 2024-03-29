import { useRouter } from 'next/router'
import { FaCalendarAlt, FaMapMarkerAlt, FaTasks } from 'react-icons/fa'

import Loading from '@/components/atoms/Loading'
import Gallery from '@/components/organisms/Gallery'
import PageHeader from '@/components/organisms/PageHeader'
import RowItem from '@/components/organisms/RowItem'
import Template from '@/components/templates/Template'
import { capitalizeFirstLetter, formatDate } from '@/hooks/lib/util'

import useHooks from './hooks'

const Order = () => {
  const router = useRouter()
  const { orderId } = router.query

  const { order, isloading } = useHooks(orderId)

  const breadcrumbs = [
    {
      href: '/orders',
      title: 'Orders',
      icon: FaTasks,
    },
    {
      href: '#',
      title: 'Order Detail',
    },
  ]

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      {isloading ?
        <Loading />
      : <section className='bg-white dark:bg-gray-900'>
          <div className='container mx-auto px-8 py-8'>
            <div className='grid lg:grid-cols-2 gap-4'>
              <div className='grid grid-cols-1 gap-4'>
                {order && (
                  <>
                    <RowItem
                      label='Date'
                      value={formatDate(order.created_at)}
                      order
                      icon={<FaCalendarAlt />}
                    />
                    <RowItem label='Job Order No.' value={order.job_order} />
                    <RowItem
                      label='Status'
                      value={capitalizeFirstLetter(order.status)}
                    />
                    <RowItem label='Category' value={order.category.label} />
                    <RowItem label='Brand' value={order.brand} />
                    <RowItem label='Parts Model' value={order.part_model} />
                    <RowItem label='Link Ref' value={order.link} />
                    <RowItem label='Down Payment' value={order.downpayment} />
                  </>
                )}
              </div>
              <div className='grid grid-cols-1 gap-5'>
                {order && (
                  <>
                    <RowItem
                      label='Branch'
                      value={order.store.label}
                      icon={<FaMapMarkerAlt />}
                    />
                    <RowItem label='Unit Model' value={order.model} />
                    <div className='grid grid-cols-2 gap-2'>
                      <Gallery images={order.image_paths || []} />
                    </div>
                  </>
                )}
              </div>
              {order && (
                <>
                  <div className='col-span-full'>
                    <RowItem label='Comment' value={order.notes} />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      }
    </Template>
  )
}

export default Order

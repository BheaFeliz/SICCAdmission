import { Button } from 'flowbite-react'
import { FaTasks } from 'react-icons/fa'

import DatePicker from '@/components/organisms/DatePicker'
import FilePickerInput from '@/components/organisms/FilePickerInput '
import PageHeader from '@/components/organisms/PageHeader'
import SelectInput from '@/components/organisms/SelectInput'
import TextAreaInput from '@/components/organisms/TextAreaInput'
import TextInput from '@/components/organisms/TextInput'
import Template from '@/components/templates/Template'

import { useHooks } from './hooks'

const Order = () => {
  const { formState, handleSubmit, categories } = useHooks()

  const breadcrumbs = [
    {
      href: '/orders',
      title: 'Orders',
      icon: FaTasks,
    },
    {
      href: '#',
      title: 'Order Create',
    },
  ]
  const branchOptions = [
    {
      value: 0,
      label: 'Branch',
      disabled: true,
      selected: true,
      hidden: true,
    },
    {
      value: 1,
      label: 'Cebu',
    },
    {
      value: 2,
      label: 'Davao',
    },
    {
      value: 3,
      label: 'Tagum',
    },
  ]
  const statusOptions = [
    {
      value: 0,
      label: 'Status',
      disabled: true,
      selected: true,
      hidden: true,
    },
    {
      value: 'open',
      label: 'Open',
    },
    {
      value: 'in-transit',
      label: 'In-Transit',
    },
    {
      value: 'delivered',
      label: 'Delivered',
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
    },
    {
      value: 'onhold',
      label: 'Onhold',
    },
  ]
  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />

      <section className='bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-8 py-8'>
          <form onSubmit={handleSubmit} className='grid lg:grid-cols-2 gap-4'>
            <div className='grid grid-cols-1 gap-4'>
              <DatePicker label='Date' name='created_at' {...formState} />
              <TextInput
                label='Job Order No.'
                name='job_order'
                {...formState}
              />
              <SelectInput
                label='Status'
                name='status'
                options={statusOptions}
                {...formState}
              />
              <SelectInput
                label='Category'
                name='category_label'
                options={[
                  { value: '', label: 'Category', isDisabled: true },
                  ...(categories?.map((category) => ({
                    value: category.label,
                    label: category.label,
                  })) || []),
                ]}
                {...formState}
              />
              <TextInput label='Brand' name='brand' {...formState} />
              <TextInput label='Parts Model' name='part_model' {...formState} />
              <TextInput label='Quantity' name='quantity' {...formState} />
              <TextInput label='Link Ref' name='link' {...formState} />
              <TextInput
                label='Down Payment'
                name='downpayment'
                {...formState}
              />
              <FilePickerInput
                label='Upload File'
                name='images_paths'
                multiple
                {...formState}
              />
            </div>
            <div className='grid grid-cols-1 gap-2'>
              <SelectInput
                label='Branch'
                name='store_id'
                options={branchOptions}
                {...formState}
              />
              <TextInput
                label='Unit Model'
                name='model'
                className='mb-40'
                {...formState}
              />
            </div>
            <div className='col-span-full'>
              <TextAreaInput
                label='Comments'
                name='notes'
                placeHolder='Comments'
                {...formState}
              />
            </div>
            <div className='col-span-full'>
              <Button color='warning' type='submit'>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Template>
  )
}

export default Order

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { orderApi } from '@/hooks/api/orderApi'
import { statuses } from '@/hooks/lib/statuses'
import { useCategories } from '@/hooks/redux/useCategories'
import { useHandleError } from '@/hooks/useHandleError'

const schema = yup.object({
  store_id: yup.number().oneOf([1, 2, 3]).required(),
  category_label: yup.string().required(),
  job_order: yup.number(),
  brand: yup.string().required(),
  part_model: yup.string(),
  model: yup.string(),
  downpayment: yup.number().default(0),
  quantity: yup.number().required(),
  status: yup.string().oneOf(statuses),
  link: yup.string(),
  notes: yup.string(),
  image_paths: yup.array().of(yup.string()),
})

export function useHooks() {
  const router = useRouter()
  const { handleError } = useHandleError()
  const [createOrderMutation] = orderApi.useCreateOrderMutation()
  const { categories } = useCategories()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      const { order } = await createOrderMutation(data).unwrap()
      router.push(`/orders`, order)
    } catch (error) {
      handleError(error)
    }
  }
  return {
    categories,
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      register,
    },
  }
}

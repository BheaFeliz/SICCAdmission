import { baseApi } from './baseApi'

export const orderApi = baseApi.injectEndpoints({
  tagTypes: ['orders'],
  endpoints: (build) => ({
    getOrders: build.query({
      providesTags: ['orders'],
      query: (page = 1) => ({ url: `/orders?page=${page}` }),
    }),

    createOrder: build.mutation({
      invalidatesTags: ['orders'],
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),
    getOrderById: build.query({
      providesTags: (orderId) => [{ type: 'orders', id: orderId }],
      query: (orderId) => ({ url: `/orders/${orderId}` }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi

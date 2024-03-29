import { baseApi } from './baseApi'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tagTypes: ['categories'],
    getCategories: build.query({
      query: () => ({ url: '/categories' }),
      providesTags: ['categories'],
    }),
    // Add other order-related endpoints as needed...
  }),
  overrideExisting: false,
})

export const { useCreateOrderMutation } = categoryApi

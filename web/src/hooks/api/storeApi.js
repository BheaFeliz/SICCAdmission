import { baseApi } from './baseApi'

export const storeApi = baseApi.injectEndpoints({
  tagTypes: ['stores'],
  endpoints: (build) => ({
    getStores: build.query({
      providesTags: ['stores'],
      query: () => ({ url: '/stores' }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetStoresQuery } = storeApi

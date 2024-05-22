import { baseApi } from './baseApi'

export const studentApi = baseApi.injectEndpoints({
  tagTypes: ['admissionform'],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => '/admissionform',
      providesTags: ['admissionform'],
    }),
  }),
})

export const { useGetStudentsQuery } = studentApi

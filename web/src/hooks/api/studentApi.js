import { baseApi } from './baseApi'

export const studentApi = baseApi.injectEndpoints({
  tagTypes: ['admissionform'],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => '/admissionform',
      providesTags: ['admissionform'],
    }),
    createStudent: builder.mutation({
      invalidatesTags: ['admissionform'],
      query: (body) => ({
        url: 'admissionform',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetStudentsQuery, useCreateStudentMutation } = studentApi

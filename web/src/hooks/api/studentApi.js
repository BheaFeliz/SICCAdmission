import { baseApi } from './baseApi'

export const studentApi = baseApi.injectEndpoints({
  tagTypes: ['admissionform'],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => '/admissionform',
      providesTags: ['admission_forms'],
    }),

    createStudent: builder.mutation({
      invalidatesTags: ['admission_forms'],
      query: (body) => ({
        url: '/admissionform',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetStudentsQuery, useCreateStudentMutation } = studentApi

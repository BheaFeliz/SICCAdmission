import { baseApi } from './baseApi'

export const studentApi = baseApi.injectEndpoints({
  tagTypes: ['admission_form'],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => '/registration',
      providesTags: ['registration'],
    }),
    
    createStudent: builder.mutation({
      invalidatesTags: ['registration'],
      query: (body) => ({
        url: '/registration',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetStudentsQuery, useCreateStudentMutation } = studentApi

import { baseApi } from './baseApi';

export const studentApi = baseApi.injectEndpoints({
  tagTypes: ['admission_form', 'registration'],
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
    getRegistrationById: builder.query({
      query: (id) => `/registrations/${id}`,
      providesTags: ['registration'],
    }),
    deleteRegistration: builder.mutation({
      invalidatesTags: ['registration'],
      query: (id) => ({
        url: `/registrations/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useGetRegistrationByIdQuery,
  useDeleteRegistrationMutation,
} = studentApi;

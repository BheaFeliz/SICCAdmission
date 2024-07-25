import { baseApi } from './baseApi'

export const studentApi = baseApi.injectEndpoints({
  tagTypes: ['registrations'],
  endpoints: (build) => ({
    getRegistrations: build.query({
      query: () => 'registration?include=images',
      providesTags: ['registrations'],
    }),
    createRegistration: build.mutation({
      invalidatesTags: ['registrations'],
      query: (body) => ({
        url: 'registration',
        method: 'POST',
        body,
      }),
    }),
    getRegistrationById: build.query({
      query: (id) => `/registration/${id}`,
      providesTags: ['registrations'],
    }),
    updateRegistration: build.mutation({
      invalidatesTags: ['registrations'],
      query: ({ registrationId, ...body }) => ({
        url: `registration/${registrationId}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteRegistration: build.mutation({
      invalidatesTags: ['registrations'],
      query: (id) => ({
        url: `/registration/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetRegistrationsQuery,
  useCreateRegistrationMutation,
  useUpdateRegistrationMutation,
  useGetRegistrationByIdQuery,
  useDeleteRegistrationMutation,
} = studentApi

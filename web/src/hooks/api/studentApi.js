import { baseApi } from './baseApi';

export const studentApi = baseApi.injectEndpoints({
  tagTypes: ['registration'],
  endpoints: (builder) => ({
    getRegistrations: builder.query({
      query: () => '/registrations',
      providesTags: ['registration'],
    }),
    createRegistration: builder.mutation({
      invalidatesTags: ['registration'],
      query: (body) => ({
        url: '/registrations',
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
  useGetRegistrationsQuery,
  useCreateRegistrationMutation,
  useGetRegistrationByIdQuery,
  useDeleteRegistrationMutation,
} = studentApi;

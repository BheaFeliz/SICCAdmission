import { baseApi } from './baseApi';

export const studentApi = baseApi.injectEndpoints({
  tagTypes: ['registrations'],
  endpoints: (builder) => ({
    getRegistrations: builder.query({
      query: () => '/registration/new',
      providesTags: ['registration'],
    }),
    createRegistration: builder.mutation({
      invalidatesTags: ['registration'],
      query: (body) => ({
        url: '/registration/new',
        method: 'POST',
        body,
      }),
    }),
    getRegistrationById: builder.query({
      query: (id) => `/registration/${id}`,
      providesTags: ['registrations'],
    }),
    deleteRegistration: builder.mutation({
      invalidatesTags: ['registration'],
      query: (id) => ({
        url: `/registration/${id}`,
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

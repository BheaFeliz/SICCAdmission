import { baseApi } from './baseApi';

export const studentApi = baseApi.injectEndpoints({
  tagTypes: ['registrations'],
  endpoints: (build) => ({
    getRegistrations: build.query({
      query: () => 'registration',
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
    deleteRegistration: build.mutation({
      invalidatesTags: ['registrations'],
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

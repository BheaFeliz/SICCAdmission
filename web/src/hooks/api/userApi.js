import { baseApi } from './baseApi'

export const userApi = baseApi.injectEndpoints({
  tagTypes: ['users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['users'],
    }),
    register: builder.mutation({
      query: (newUser) => ({
        url: '/admin/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['users'],
    }),
  }),
})

export const { useGetUsersQuery, useRegisterMutation } = userApi

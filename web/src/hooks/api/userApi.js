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
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
  }),
})

export const { useGetUsersQuery, useRegisterMutation, useDeleteUserMutation } = userApi

import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tagTypes: ['Auth'],
    getUser: build.query({
      query: () => ({ url: '/auth' }),
      providesTags: ['Auth'],
    }),
    login: build.mutation({
      query(user) {
        return {
          url: '/login',
          method: 'POST',
          body: user,
        }
      },
      invalidatesTags: ['Auth'],
    }),
    logout: build.mutation({
      query() {
        return {
          url: '/auth/logout',
          method: 'POST',
        }
      },
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserQuery, useLoginMutation, useLogoutMutation } = authApi

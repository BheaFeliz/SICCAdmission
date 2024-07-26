// src/hooks/api/scheduleApi.js
import { baseApi } from './baseApi'

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSchedules: build.query({
      query: (page = 1) => `/scheduling?page=${page}`,
      providesTags: ['scheduling'],
    }),
    createSchedule: build.mutation({
      query: (body) => ({
        url: 'scheduling',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['scheduling'],
    }),
    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `scheduling/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['scheduling'],
    }),
    updateAllSchedules: build.mutation({
      query: ({ max_registrations }) => ({
        url: `/schedules`,
        method: 'PATCH',
        body: { max_registrations },
      }),
    }),

    getScheduleById: build.query({
      query: (scheduleId) => `/scheduling/${scheduleId}`,
      providesTags: (result, error, scheduleId) => [
        { type: 'scheduling', id: scheduleId },
      ],
    }),
    getDeletedSchedules: build.query({
      query: () => '/deleted-schedules',
      providesTags: ['scheduling'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateScheduleMutation,
  useGetSchedulesQuery,
  useDeleteScheduleMutation,
  useGetScheduleByIdQuery,
  useGetDeletedSchedulesQuery,
  useUpdateAllSchedulesMutation,
} = scheduleApi

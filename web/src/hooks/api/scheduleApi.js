import { baseApi } from './baseApi' // Ensure correct path if it's different

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
    getScheduleById: build.query({
      query: (scheduleId) => `/scheduling/${scheduleId}`,
      providesTags: (result, error, scheduleId) => [
        { type: 'scheduling', id: scheduleId },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateScheduleMutation,
  useGetSchedulesQuery,
  useDeleteScheduleMutation,
  useGetScheduleByIdQuery,
} = scheduleApi

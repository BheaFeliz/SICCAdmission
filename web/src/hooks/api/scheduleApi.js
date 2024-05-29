import { baseApi } from './baseApi'

export const scheduleApi = baseApi.injectEndpoints({
  tagTypes: ['schedules'],
  endpoints: (build) => ({
    getSchedules: build.query({
      providesTags: ['scheduling'],
      query: (page = 1) => ({ url: `/scheduling?page=${page}` }),
    }),

    createSchedule: build.mutation({
      invalidatesTags: ['scheduling'],
      query: (body) => ({
        url: 'scheduling',
        method: 'POST',
        body,
      }),
    }),
    getScheduleById: build.query({
      providesTags: (cardId) => [{ type: 'schedules', id: cardId }],
      query: (cardId) => ({ url: `/scheduling/${cardId}` }),
    }),
  }),
  overrideExisting: false,
})




export const {
  useCreateScheduleMutation,
  useGetSchedulesQuery,
  useGetScheduleByIdQuery,
} = scheduleApi

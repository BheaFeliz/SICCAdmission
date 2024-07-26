import { baseApi } from './baseApi'

export const activityLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActivityLogs: build.query({
      query: () => 'activitylogs',
    }),
    getActivityLogById: build.query({
      query: (id) => `activitylogs/${id}`,
    }),
  }),
  overrideExisting: false,
})

export const { useGetActivityLogsQuery, useGetActivityLogByIdQuery } =
  activityLogApi

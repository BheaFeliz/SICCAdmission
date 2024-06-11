import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        tagTypes: ['dashboard'],
        getDashboard: build.query({
            query: (params) => ({url: '/dashboard', params}),
            providesTags: ['dashboard'],
        }),
    }),
    overrideExisting: false,
})

export const { useGetDashboardQuery} = dashboardApi
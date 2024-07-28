import { baseApi } from './baseApi'

export const courseApi = baseApi.injectEndpoints({
  tagTypes: ['courses'],
  endpoints: (build) => ({
    getCourses: build.query({
      providesTags: ['courses'],
      query: (params) => ({ url: '/courses', params }),
    }),
    addCourse: build.mutation({
      invalidatesTags: ['courses'], // Invalidate cache to refetch course list
      query: (newCourse) => ({
        url: '/courses',
        method: 'POST',
        body: newCourse,
      }),
    }),
    getCourseById: build.query({
      providesTags: (courseId) => [{ type: 'Course', id: courseId }],
      query: (courseId) => ({ url: `/courses/${courseId}` }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetCoursesQuery,
  useAddCourseMutation,
  useGetCourseByIdQuery,
} = courseApi

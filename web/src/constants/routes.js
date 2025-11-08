// Centralized route visibility configuration
// Public routes are accessible without authentication
export const PUBLIC_ROUTES = [
  '/login',
  '/registration',
  '/registration/referenceView',
  '/referenceInput',
  '/referenceRev',
  '/studentdashboard',
]

// Private routes typically require authentication
// This list is informational; RouteGuard treats all non-public as private
export const PRIVATE_ROUTES = [
  '/',
  '/dashboard',
  '/students',
  '/users',
  '/courses',
  '/schedule',
  '/scheduling',
  '/activitylogs',
  '/profile',
]

const routes = {
  PUBLIC_ROUTES,
  PRIVATE_ROUTES,
}

export default routes

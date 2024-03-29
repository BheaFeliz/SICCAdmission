export const useInitials = (name, limit = 2) => {
  const str = name.split(' ')
  const initials = str
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, limit)
  return initials
}

export const tokenKey = 'token' as const

/**
 * get token from local storage.
 */
export function getToken(): string | null {
  return window.localStorage.getItem(tokenKey)
}

/**
 * save token to local storage.
 */
export function setToken(token: string): void {
  window.localStorage.setItem(tokenKey, token)
}

/**
 * remove token from local storage.
 */
export function removeToken(): void {
  window.localStorage.removeItem(tokenKey)
}
